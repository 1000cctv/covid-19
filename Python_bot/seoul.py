import os
from selenium import webdriver
from bs4 import BeautifulSoup
import time
import re
from pymongo import MongoClient
import datetime, time
import sys

kr_driver = webdriver.Firefox()
kr_driver.get("http://news.seoul.go.kr/welfare/archives/513105")
time.sleep(2)
kr_html = kr_driver.page_source
time.sleep(1)
kr_driver.quit() 

kr_soup = BeautifulSoup(kr_html, 'lxml')#html5lib
kr_pkg_list=kr_soup.findAll('div', {'id':'patients'}) 

kr_ctt = 0
for iiiii in kr_pkg_list:
    kr_ctt=kr_ctt+1
# print(kr_pkg_list)
# print(kr_ctt)

for j in range(kr_ctt):
    title = kr_pkg_list[j].findAll('tbody')

idpat = []
show = []

print(len(title))
# 서울특별시 페이지 나누는 현상 발생 하여 그 전의 'tbody'는 한개라서 find만 썼지만 2개이상이므로 findAll로 찾는걸로 바꾸고
# for ll in 'tbody' 개수 대로 작업 할 수 있도록 for문 추가
for ll in range(len(title)):
	title2=title[ll].findAll('tr') 
	for jj in range(len(title2)):
		if (str(title2[jj]).find('id="patient')>1):
			idpat.append(str(title2[jj]))
		if (str(title2[jj]).find('show')>1):
			show.append(str(title2[jj]))

	#*******************************************************
	idpat4 = []
	dict_ = {}
	korea_array = []
	show_rev_split_list = []

	for jjj in range(len(idpat)):
		idpat2 = BeautifulSoup(idpat[jjj], 'lxml')
		idpat3 = idpat2.findAll('td')
		for jjjj in range(len(idpat3)):
			idpat4.append(idpat3[jjjj])

		# 확진자 정보
		id_one = str(idpat4[1])[str(idpat4[1]).find('">')+2:str(idpat4[1]).find('</')]	
		# print(id_one)
		id_two = str(idpat4[2])[str(idpat4[2]).find('">')+0:str(idpat4[2]).find('</td')]
		id_two = str(id_two)[str(id_two).find('">')+2:str(id_two).find('</a')]
		if (int(id_two.find(">"))>1):
			id_two = id_two[int(id_two.find(">"))+1:]
		elif (int(id_two.find(">"))<1):
			id_two = str(idpat4[2])[str(idpat4[2]).find('">')+2:str(idpat4[2]).find('</')]
		# print(id_two)
		id_thr = str(idpat4[3])[str(idpat4[3]).find('">')+2:str(idpat4[3]).find('</')]	
		# print(id_thr)
		id_for = str(idpat4[4])[str(idpat4[4]).find('">')+2:str(idpat4[4]).find('</')]
		# print(id_for)
		id_fiv = str(idpat4[5])[str(idpat4[5]).find('">')+2:str(idpat4[5]).find('</')]
		if (int(id_fiv.find(">"))>1):
			id_fiv_1 = id_fiv[:int(id_fiv.find("<"))]
			id_fiv_2 = id_fiv[int(id_fiv.find('">'))+2:]
			id_fiv = id_fiv_1+id_fiv_2
		# 동선 파싱
		aa = re.sub('[-=.#/?$<>};]', '', str(show[jjj]))
		aa = re.sub('"[0-9]"', '', str(aa))
		aa = re.sub('"', '', str(aa))
		show_rev = re.sub('[a-z]', '', str(aa))

		# 동선 문자열 정리/짜르기
		regex = re.compile(r"\d월")
		spl = [[m.start()]for m in regex.finditer(show_rev)]
		# 동선 위 정규식으로 해당하는 문자열 발견했는지 확인
		if (len(spl)>=1):
			
			for i in range(len(spl)):
				if (i == len(spl)-1):# 문자열 짜를때 뒤에 문자열 없을 경우 에러 방지
					show_rev_split = str(show_rev)[spl[i][0]:]
					# 동선 문자열 짜른걸 삽입하기 위하여 배열안에 담기
					show_rev_split_list.append(show_rev_split)

				else:
					show_rev_split = str(show_rev)[spl[i][0]:spl[i+1][0]]
					# 동선 문자열 짜른걸 삽입하기 위하여 배열안에 담기
					show_rev_split_list.append(show_rev_split)
		else:
			show_rev_split_list.append("확인중")

		cut = len(idpat)-jjj
		korea_array.append(dict_)
		korea_array[jjj]={"연번":cut,
						 "인적사항":id_one,
						 "감염경로":id_two,
						 "확진일":id_thr,
						 "거주지":id_for,
						 "격리시설":id_fiv,
						 "동선":show_rev_split_list}
		show_rev_split_list=[]
		idpat4 = []


#************************************************************************************************

client = MongoClient('192.168.219.189:25555')
db = client['corona']
collect = db['area_korea']

#---------------config--------------------------
ct = datetime.datetime.now()
korea = ct + datetime.timedelta(hours=9)

global_data = {
        'update_time' : korea,
        'date' : korea.strftime('%Y-%m-%d'),
        'seoul' : korea_array
        }

result = collect.update_one(
    {'date':korea.strftime('%Y-%m-%d')},   #수정할 데이터 찾을 조건
    {
        '$set':{
                'update_time' : korea,
                'date' : korea.strftime('%Y-%m-%d'),
                'seoul' : korea_array
                },
               #수정값
    })

if result.matched_count == 0 :
        collect.insert(global_data)

