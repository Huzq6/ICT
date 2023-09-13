import configparser
import os
from sqlalchemy import *
from sqlalchemy.orm import declarative_base, sessionmaker
from loguru import logger

config = configparser.ConfigParser()
config.read(os.path.dirname(__file__) + '/settings.ini', encoding='utf-8')
sqlsetting = config.items('SQLALCHEMY')
SQLALCHEMY_DATABASE_URI = "{}+{}://{}:{}@{}:{}/{}?charset=utf8".format(
    sqlsetting[0][1], sqlsetting[1][1], sqlsetting[2][1], sqlsetting[3][1],
    sqlsetting[4][1], sqlsetting[5][1], sqlsetting[6][1])

engine = create_engine(SQLALCHEMY_DATABASE_URI)
Base = declarative_base()
DBSession=sessionmaker(bind=engine)
mydbsession=DBSession()


class tb_province(Base):
    __tablename__="tb_province"
    p_id=Column(Integer,primary_key=True)
    code=Column(String)
    province=Column(String)

class tb_city(Base):
    __tablename__="tb_city"
    c_id=Column(Integer,primary_key=True)
    code=Column(Integer)
    province=Column(String)
    city=Column(String)
    url=Column(String)

class tb_weather(Base):
    __tablename__="tb_weather"
    w_id=Column(Integer,primary_key=True)
    city=Column(String)
    weather=Column(String)
    windDirection=Column(String)
    windForce=Column(String)
    maxTemperature=Column(Integer)
    minTemperature=Column(Integer)
    time=Column(Integer)
    date=Column(String)