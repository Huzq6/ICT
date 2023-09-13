import asyncio
import time
import json
from httpx import AsyncClient
from lxml import html

from settings import *


class spider():
    def __init__(self):
        self.fp = open('datas.json','w',encoding='utf-8')
        self.fp.write('[\n')
        self.num=0
        self.AsyncSession = AsyncClient()  # 本地
        DBSession = sessionmaker(bind=engine)
        self.session = DBSession()
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.54'}

    async def my_request(self, method='GET', url=None, headers=None, params=None, json=None, files=None, data=None,
                         allow_redirects=True, timeout=10):
        for _ in range(5):
            try:
                resp = await self.AsyncSession.request(method=method, url=url, headers=self.headers, params=params,
                                                       data=data, allow_redirects=allow_redirects, json=json,
                                                       files=files,
                                                       timeout=timeout)
                return resp
            except Exception as e:
                print(e)

    async def get_province(self, url):
        resp = await self.my_request(url=url)
        for i in resp.json():
            if not mydbsession.query(tb_province).filter_by(code=i['code']).first():
                line = tb_province(code=i['code'], province=i['name'])
                mydbsession.add(line)
            mydbsession.commit()

    async def get_cities(self):
        base_url = 'http://www.nmc.cn/rest/province/{}?_={}'
        province = mydbsession.query(tb_province).all()
        for i in province:
            resp = await self.my_request(url=base_url.format(i.code, int(time.time() * 1000)))
            for j in resp.json():
                if not mydbsession.query(tb_city).filter_by(code=j['code']).first():
                    line = tb_city(code=j['code'], province=j['province'], city=j['city'], url='www.nmc.cn' + j['url'])
                    mydbsession.add(line)
                mydbsession.commit()

    async def parse_html(self, resp,province,city):

        html_ = html.etree.HTML(resp)
        week_data = html_.xpath('//div[@class="weatherWrap"]')
        details_div = html_.xpath("//div[@class='values']/div/div")
        item={}
        index=0
        for i in week_data:
            s = [x.strip() for x in i.xpath(".//text()")]
            item['province']=province
            item['city']=city
            for k in details_div[index].xpath('./div'):
                a=k.xpath(".//text()")
                if '日' in a[0]:break
                item['time'] = a[0]
                item['date'] = s[0]
                item['day'] = s[1]
                item['weather'] = s[2]
                item['maxTemp'] = s[5]
                item['minTemp'] = s[6]
                item['precipitation'] = a[1]
                item['temperature'] = a[2]
                item['windSpeed'] = a[3]
                item['windForce']=s[4]
                item['windDirection'] = a[4]
                item['airPressure'] = a[5]
                item['humidity'] = a[6]
                self.num+=1
                print(self.num)
                self.fp.write("\t"+str(item)+",\n")
            index=index+1

    async def get_more_data(self, code, data):
        url = 'http://www.nmc.cn/rest/weather?stationid={}&_={}'.format(code, int(time.time() * 1000))
        resp = await self.my_request(url=url)
        resp_json = resp.json()
        try:
            month_data = resp_json['data']['climate']['month']
            twoweek = resp_json['data']['tempchart']
        except TypeError:
            print(code)
            month_data=[]
            twoweek=[]
        data['data']['twoWeek_weather'] = twoweek
        data['data']['month_weather'] = month_data
        return data

    async def get_data(self, city):
        city_data = mydbsession.query(tb_city).filter_by(city=city).first()
        city_url = 'http://' + city_data.url
        resp = await self.my_request(url=city_url)
        await self.parse_html(resp.text,city_data.province,city_data.city)
        await self.AsyncSession.aclose()
        # result = await self.get_more_data(city_data.code, data)
        # return result

    async def run(self):
        #
        # url='http://www.nmc.cn/rest/province/all?_={}'.format(int(time.time()*1000))
        # await self.get_province(url)
        # await self.get_cities()
        #
        cities=self.session.query(tb_city).all()
        for i in cities:
            await self.get_data(i.city)
        self.fp.seek(-2, os.SEEK_END)
        self.fp.truncate()
        self.fp.write('\n]')
        self.fp.close()


if __name__ == '__main__':
    s=spider()
    asyncio.run(s.run())