import os
from selenium import webdriver
from bs4 import BeautifulSoup
import time
import re
from pymongo import MongoClient
import datetime, time


##########################################서울##############################################
kr_driver = webdriver.Firefox()
kr_driver.get("http://www.seoul.go.kr/coronaV/coronaStatus.do")
time.sleep(15)
kr_html = kr_driver.page_source
time.sleep(15)
kr_driver.quit() 

kr_soup = BeautifulSoup(kr_html, 'lxml')#html5lib
kr_pkg_list=kr_soup.find('div',{'class':'status-seoul'}) 

서울= []
강원= []
경기= []
인천= []
충남= []
충북= []
세종= []
대전= []
경북= []
대구= []
전북= []
전남= []
광주= []
경남= []
울산= []
부산= []
제주= []
합계= []
upup = []
ct = 0;
kr_pkg_list2=kr_pkg_list.findAll('p',{'class':'counter'}) 
print ("수집된 국내 지역별 수 (검역/합계 포함) : ")


for j in kr_pkg_list2:
    ct = ct+1
for i in range(ct):
    upup.append(kr_pkg_list2[i]) 

for i in range(len(upup)):
    서울.append(str(upup[i])[str(upup[i]).find('counter">')+9:str(upup[i]).find('</p>')].replace(",",""))
# print(서울)


##########################################몽고 DB 작성##############################################

client = MongoClient('192.168.219.189:25555')
db = client['corona']
collect = db['area_korea']

#---------------config--------------------------
ct = datetime.datetime.now()
korea = ct + datetime.timedelta(hours=9)
#-----------------------------------------------
# print(서울[1]) 격리중
# print(서울[3]) 격리해제
# print(서울[5]) 사망
# print(서울[7]) 합계
# print(서울[9]) 검사중
# print(서울[11]) 결과음성

#지역별 격리중
korea_area_inf = {"서울":서울[0]}
#지역별 격리해제
korea_area_rec = {"서울":서울[1]}
#지역별 사망
korea_area_dt = {"서울":서울[2]}

#지역별 검사
korea_area_ing = {"서울":서울[4]}

#지역별 음성
korea_area_no = {"서울":서울[5]}

#지역별 의심합계
korea_area_rea = {"서울":서울[3]}

#지역별 자가격리자
korea_area_self_inf = {"서울":서울[6]}

#지역별 감시중
korea_area_self_ing = {"서울":서울[7]}

#지역별 감시해제
korea_area_self_no = {"서울":서울[8]}


global_data = {
        'update_time' : korea,
        'date' : korea.strftime('%Y-%m-%d'),
        'korea_area_inf' : korea_area_inf,
        'korea_area_dt' : korea_area_dt,
        'korea_area_rec' : korea_area_rec,
        'korea_area_rea' : korea_area_rea,
        'korea_area_ing' : korea_area_ing,
        'korea_area_no' : korea_area_no,
        'korea_area_self_inf' : korea_area_self_inf,
        'korea_area_self_ing' : korea_area_self_ing,
        'korea_area_self_no' : korea_area_self_no
        }

result = collect.update_one(
    {'date':korea.strftime('%Y-%m-%d')},   #수정할 데이터 찾을 조건
    {
        '$set':{
                'update_time' : korea,
                'date' : korea.strftime('%Y-%m-%d'),
                'korea_area_inf' : korea_area_inf,
                'korea_area_dt' : korea_area_dt,
                'korea_area_rec' : korea_area_rec,
                'korea_area_rea' : korea_area_rea,
                'korea_area_ing' : korea_area_ing,
                'korea_area_no' : korea_area_no,
                'korea_area_self_inf' : korea_area_self_inf,
                'korea_area_self_ing' : korea_area_self_ing,
                'korea_area_self_no' : korea_area_self_no
                },
               #수정값
    })

if result.matched_count == 0 :
        collect.insert(global_data)

