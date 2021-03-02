import os
from selenium import webdriver
from bs4 import BeautifulSoup
import time
import re
from pymongo import MongoClient
import datetime, time

##########################################데이터 가공##############################################

driver = webdriver.Firefox()
driver.get("https://gisanddate.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6")
time.sleep(2)
html = driver.page_source
time.sleep(1)
driver.quit() 

soup = BeautifulSoup(html, 'lxml')#html5lib
pkg_list=soup.findAll('g', 'responsive-text-label') 


t_total = []
count = 1
for i in pkg_list:
        title = i.findAll('text')
        #print('----------------------------------------------------------------')
        #print (title)
        total = str(title)[str(title).find('vector-effect="')+35:str(title).find('</')] 
        total = re.sub(',', '', total)
        #print(total)
        t_total.append(total)
        count=count+1

# t_total[1] total cofirmed
# t_total[5] total Deaths
# t_total[7] total Recovered

##########################################몽고 DB 작성##############################################


client = MongoClient('192.168.219.189:25555')
db = client['corona']
collect = db['total_earth']

#---------------config--------------------------
ct = datetime.datetime.now()
korea = ct + datetime.timedelta(hours=9)
#-----------------------------------------------




# for i in range(20):
#     country['ddd'+str(i)]=i

print(t_total)
print(t_total[1])
print(t_total[7])
print(t_total[9])

global_data = {
        'update_time' : korea,
        'date' : korea.strftime('%Y-%m-%d'),
        'global_total' : t_total[1],
        'global_deaths' : int(t_total[7]),
        'global_recov' : int(t_total[9])
        }

result = collect.update_one(
    {'date':korea.strftime('%Y-%m-%d')},   #수정할 데이터 찾을 조건
    {
        '$set':{
                'update_time' : korea,
                'date' : korea.strftime('%Y-%m-%d'),
                'global_total' : int(t_total[1])+0, #수동
                'global_deaths' : int(t_total[7])+0, #수동
                'global_recov' : int(t_total[9])+0 #수동
                },
               #수정값
    })

if result.matched_count == 0 :
        collect.insert(global_data)