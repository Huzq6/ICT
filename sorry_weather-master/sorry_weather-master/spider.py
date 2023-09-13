import asyncio
import time

from httpx import AsyncClient
from lxml import html

from settings import *


class spider():
    def __init__(self):
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

    async def parse_html(self, resp):
        # print(resp)
        result = {'code': 0, 'data': {'province': '', 'city': '',
                                      'week_weather': [], 'twoWeek_weather': []}, 'msg': 'success'}
        html_ = html.etree.HTML(resp)
        week_data = html_.xpath('//div[@class="weatherWrap"]')
        for i in week_data:
            s = [x.strip() for x in i.xpath(".//text()")]
            result['data']['week_weather'].append({
                'date': s[0], 'day': s[1], 'weather': s[2], 'windDirection': s[3], 'windForce': s[4],
                'maxTemp': s[5], 'minTemp': s[6], 'details': []})
        index = 0
        details_div = html_.xpath("//div[@class='values']/div/div")
        for i in details_div:
            for j in i.xpath('./div'):
                time_data = {}
                a = j.xpath(".//text()")
                time_data['time'] = a[0]
                time_data['precipitation'] = a[1]
                time_data['temperature'] = a[2]
                time_data['windSpeed'] = a[3]
                time_data['windDirection'] = a[4]
                time_data['airPressure'] = a[5]
                time_data['humidity'] = a[6]
                result['data']['week_weather'][index]['details'].append(time_data)
            index = index + 1
        return result

    async def get_more_data(self, code, data):
        url = 'http://www.nmc.cn/rest/weather?stationid={}&_={}'.format(code, int(time.time() * 1000))
        resp = await self.my_request(url=url)
        resp_json = resp.json()
        month_data = resp_json['data']['climate']['month']
        twoweek = resp_json['data']['tempchart']
        passed = resp_json['data']['passedchart']
        air = resp_json['data']['air']
        current= resp_json['data']['real']
        data['data']['twoWeek_weather'] = twoweek
        data['data']['month_weather'] = month_data
        data['data']['passed'] = passed
        data['data']['air'] = air
        data['data']['current'] = current
        return data

    async def get_data(self, city):
        city_data = mydbsession.query(tb_city).filter_by(city=city).first()
        city_url = 'http://' + city_data.url
        resp = await self.my_request(url=city_url)
        data = await self.parse_html(resp.text)
        result = await self.get_more_data(city_data.code, data)
        result['data']['province'] = city_data.province
        result['data']['city'] = city_data.city
        return result

    async def run(self, city):
        #
        # url='http://www.nmc.cn/rest/province/all?_={}'.format(int(time.time()*1000))
        # await self.get_province(url)
        # await self.get_cities()
        #
        result = await self.get_data(city)
        await self.AsyncSession.aclose()
        return result


if __name__ == '__main__':
    s = spider()
    a = asyncio.run(s.run('安顺'))
    print(a)
