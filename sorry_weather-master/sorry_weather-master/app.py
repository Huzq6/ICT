import asyncio
import re

from flask import Flask, render_template, request
from spider import spider
from settings import *
app = Flask(__name__, static_folder='static')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_weather', methods=["POST", "GET"])
def get_weather():
    city = request.form.get('city')
    if '省' in city:
        return ''
    if '区' in city:
        city = city.replace('区', '')
    if '市' in city:
        city = city.replace('市', '')
    if '族自治' in city:
        city=re.findall('(.*?).族',city)[0]
        if not mydbsession.query(tb_city).filter_by(city=city).first():
            city=city.replace(list(city).pop()[0],"")
    s = spider()
    try:
        result = asyncio.run(s.run(city))
    except AttributeError:
        result={"code":'999',"data":[],"msg":"error"}
    return result


if __name__ == '__main__':
    app.run()
