import os
from selenium import webdriver
from bs4 import BeautifulSoup
import time
import re
from pymongo import MongoClient
import datetime, time
import sys

#***********************************유튜브 정보**********************************
kr_driver = webdriver.Firefox()
kr_driver.get("https://www.youtube.com/results?search_query=%EC%BD%94%EB%A1%9C%EB%82%98+%EA%B4%80%EB%A0%A8&sp=CAMSAggC")
time.sleep(2)
kr_html = kr_driver.page_source
time.sleep(1)
kr_driver.quit() 

kr_soup = BeautifulSoup(kr_html, 'html.parser')#html5lib
kr_pkg_list_info=kr_soup.findAll('div',{'class':'text-wrapper style-scope ytd-video-renderer'})

info_id = []
info_url = []
info_url_video = []
info_url_title = []
img_url = []
news_cc = []
view_ct = []
view_ct2 = []
news_main_t = []

y_dict_ = {}
youtube_array = []


for i in kr_pkg_list_info:
	info_url.append(i)

for i in range(len(info_url)):
	info = str(info_url[i].find('a',{'id':'video-title'},{'class':'yt-simple-endpoint style-scope ytd-video-renderer'}))
	#====================뉴스 출처========================
	news_c = str(info_url[i].find('a',{'class':'yt-simple-endpoint style-scope yt-formatted-string'}))
	news_c = (str(news_c)[str(news_c).find('">')+2:str(news_c).find('</a>')])
	#====================뉴스 조회수+시간========================
	view_count = str(info_url[i].find('div',{'id':'metadata-line'},{'class':'style-scope ytd-video-meta-block'}))
	view_count = BeautifulSoup(view_count, 'html.parser')
	view_ct.append(view_count.findAll('span',{'class':'style-scope ytd-video-meta-block'}))
	#====================뉴스 내용========================
	news_main = str(info_url[i].find('yt-formatted-string',{'id':'description-text'},{'class':'style-scope ytd-video-renderer'}))
	news_main = (str(news_main)[str(news_main).find('description-text">')+18:str(news_main).find('</style-scope ytd-video-renderer>')-21])
	news_main = str(news_main).replace('</span>',"")
	news_main = str(news_main).replace('<span class="style-scope yt-formatted-string" dir="auto">',"")
	news_main = str(news_main).replace('<span class="bold style-scope yt-formatted-string" dir="auto">',"")
	news_main = str(news_main).replace("&amp;","")
	news_main = str(news_main).replace("&quot;","")

	if (str(info).find('aria-label="')>= 1):
		info_id.append(str(info)[str(info).find('?')+3:str(info).find('" id')])
		img_url.append("https://i.ytimg.com/vi/"+str(info)[str(info).find('?')+3:str(info).find('" id')]+"/hqdefault.jpg")
		info_url_video.append("https://youtube.com/"+str(info)[str(info).find('href="')+6:str(info).find('" id')])
		
		#====================영상 제목================
		title_repl = str(info)[str(info).find('title="')+7:str(info).find('">')].replace("&amp;","")
		title_repl = str(title_repl).replace("&quot;","")
		info_url_title.append(title_repl)

		news_cc.append(news_c)
		view_ct[i][0] = str(view_ct[i][0])[str(view_ct[i][0]).find('">')+2:str(view_ct[i][0]).find('</')]
		view_ct[i][1] = str(view_ct[i][1])[str(view_ct[i][1]).find('">')+2:str(view_ct[i][1]).find('</')]
		aa = str(view_ct[i][0].replace("views","조회수"))
		bb = str(view_ct[i][1].replace("hours ago","시간 전"))
		bb = str(bb.replace("day ago","일 전"))
		bb = str(bb.replace("minutes ago","분 전"))
		view_ct2.append(aa +" "+ bb)

		news_main_t.append(news_main)



for i in range(len(img_url)):
	youtube_array.append(y_dict_)
	youtube_array[i]={"이미지링크":img_url[i],
					 "영상링크":info_url_video[i],
					 "영상제목":info_url_title[i],
					 "출처":news_cc[i],
					 "조회수시간":view_ct2[i],
					 "영상내용":news_main_t[i]}


#***********************************뉴스 정보**********************************

kr_driver = webdriver.Firefox()
kr_driver.get("https://search.naver.com/search.naver?where=news&query=%5B%EC%86%8D%EB%B3%B4%5D%20%EC%BD%94%EB%A1%9C%EB%82%98&sm=tab_srt&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so%3Ar%2Cp%3Aall%2Ca%3Aall&mynews=0&refresh_start=0&related=0")
time.sleep(2)
kr_html = kr_driver.page_source
time.sleep(1)
kr_driver.quit() 

kr_soup = BeautifulSoup(kr_html, 'lxml')#html5lib
kr_pkg_list=kr_soup.find('ul', {'class':'type01'}) 

kr_ctt = 0
# print(kr_pkg_list)



tt=kr_pkg_list.findAll('li') 
news_img = []
news_img_title = []
news_img_filter = []

news_url_title = []
news_url_title_filter = []
news_url_title_filter2 = []

news_dd = []
news_time = []
news_main = []

dict_ = {}
korea_array = []

for j in range(len(tt)):
	nonone = tt[j].find('div', {'class':'thumb'})
	if (nonone != None):
   		news_img.append(tt[j].find('div', {'class':'thumb'}))
   		news_url_title.append(tt[j].find('dt'))
   		news_dd.append(tt[j].find('dd'))
   		news_main.append(tt[j].findAll('dd'))


print(len(tt))#검색시 나오는 모든 기사 스크랩
print(len(news_img))#검색시 나오는 기사중 이미지만 들어있는거 확인

#스크랩이 이미지 들어있는 기사들로 파싱 틀이 맞춰져 있기에 길이 수정은 힘들다.
for jj in range(len(news_img)):
	#이미지 링크
	show_img = str(news_img[jj])[str(news_img[jj]).find('src="')+5:str(news_img[jj]).find('type=')-5]

	#뉴스 링크 해당 조건에 맞게 필터
	if (str(news_url_title[jj]).find('.html')>=1):
		show_link = str(news_url_title[jj])[str(news_url_title[jj]).find('href="')+6:str(news_url_title[jj]).find('.html')+5]
	elif (str(news_url_title[jj]).find('&amp;t=NN')>=1): 
		show_link = str(news_url_title[jj])[str(news_url_title[jj]).find('href="')+6:str(news_url_title[jj]).find('&amp;t=NN')]
	else:
		show_link = str(news_url_title[jj])[str(news_url_title[jj]).find('href="')+6:str(news_url_title[jj]).find('" on')]


	
	#뉴스 메인 제목 파싱
	show_title = str(news_url_title[jj])[str(news_url_title[jj]).find('title="')+7:str(news_url_title[jj]).find('">')]
	aab = re.sub('[0-9][-=#/?$<>};][0-9]', '', str(show_title))
	aab = re.sub('"[0-9]"', '', str(aab))
	aab = re.sub('"', '', str(aab))
	aab = re.sub('[a-z]', '', str(aab))
	aab = re.sub('[-=#/?$<>};_()+:*&.]','', str(aab))
	aab = re.sub('[A-Z,]','', str(aab))
	aab = re.sub(r'\'[0-9A-Z,]*\'','', str(aab))
	show_title = re.sub(r'[0-9]{6,50}','', str(aab))


	#뉴스 출처 파싱
	if (len(str(news_dd[jj])[str(news_dd[jj]).find('_sp_each_source">')+17:str(news_dd[jj]).find('<i')]) >= 15):
		cul = (str(news_dd[jj])[str(news_dd[jj]).find('_sp_each_source">')+17:str(news_dd[jj]).find('</span')])
	else:
		cul = (str(news_dd[jj])[str(news_dd[jj]).find('_sp_each_source">')+17:str(news_dd[jj]).find('<i')])

	#뉴스 올라온 시간 파싱
	ttime = (str(news_dd[jj])[str(news_dd[jj]).find('bar"></span>')+12:str(news_dd[jj]).find('bar"></span>')+18])
	show_time = str(cul)+""+str(ttime)
	
	#뉴스 내용
	aa = re.sub('[-=#/?$<>};]', '', str(news_main[jj][1]))
	aa = re.sub('"[0-9]"', '', str(aa))
	aa = re.sub('"', '', str(aa))
	show_main = re.sub('[a-z]', '', str(aa))


	korea_array.append(dict_)
	korea_array[jj]={"이미지링크":show_img,
					 "뉴스링크":show_link,
					 "메인제목":show_title,
					 "출처시간":show_time,
					 "내용":str(show_main)}




# #************************************************************************************************

client = MongoClient('192.168.219.189:25555')
db = client['corona']
collect = db['news']

#---------------config--------------------------
ct = datetime.datetime.now()
korea = ct + datetime.timedelta(hours=9)

global_data = {
        'update_time' : korea,
        'date' : korea.strftime('%Y-%m-%d'),
        'naver_news' : korea_array,
        'youtube_' : youtube_array
        }

result = collect.update_one(
    {'date':korea.strftime('%Y-%m-%d')},   #수정할 데이터 찾을 조건
    {
        '$set':{
                'update_time' : korea,
                'date' : korea.strftime('%Y-%m-%d'),
                'naver_news' : korea_array,
                'youtube_' : youtube_array
                },
               #수정값
    })

if result.matched_count == 0 :
        collect.insert(global_data)

