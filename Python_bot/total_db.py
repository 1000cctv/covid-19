# -*- coding: utf-8 -*- 
# /usr/lib/python3.6
import os
from selenium import webdriver
from bs4 import BeautifulSoup
import time
import re
from pymongo import MongoClient
import datetime, time

##########################################확진자 국가별 데이터##############################################
#executable_path='/usr/local/bin/geckodriver'

driver = webdriver.Firefox()
driver.get("https://gisanddate.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6")
time.sleep(10)
html = driver.page_source
time.sleep(10)
driver.quit() 

soup = BeautifulSoup(html, 'lxml')#html5lib
pkg_list=soup.findAll('div', 'external-html') 



# 첫번째 필터 각 감염된 나라별 리스트 출력
firest_count = [] 
org_count = [] 
countii = 0
for iiii in pkg_list:
    countii=countii+1
for j in range(countii):
    list1 = pkg_list[j]
    firest_count.append(list1)
    if re.search('<h5><span style="color:#e60000"',str(firest_count[j])) != None:
        org_count.append(firest_count[j])

#print(org_count) # 고장 체크1
country_total = [] 
infeted_total = [] 
j = 0

for j in range(len(org_count)):
    title = pkg_list[j].find('span',{'style':'color:#d6d6d6'})
    country = str(title)[str(title).find('<span')+28:str(title).find('</')]
    country_total.append(country)

    title2 = pkg_list[j].find('span',{'style':'color:#e60000'})
    infeted = str(title2)[str(title2).find('<strong>')+8:str(title2).find('</')]
    infeted_total.append(infeted)



###################################################################################################

#***************************************Death 국가 옵션 관리**********************************************

count = 0
deaths_filtering_conuntry = [] 
#각 나라별 deaths

countryKoreaName = {
  "Cruise Ship": "크루즈",
  "Others": "크루즈",
  "Bangladesh": "방글라데시(BD)",
  "Belgium": "벨기에(BE)",
  "Burkina Faso": "부르키나 파소(BF)",
  "Bulgaria": "불가리아(BG)",
  "Bosnia and Herzegovina": "보스니아 헤르체고비나(BA)",
  "Barbados": "바베이도스(BB)",
  "Wallis and Futuna": "왈리스 푸투나(WF)",
  "Saint Barthelemy": "생바르텔레미(BL)",
  "Bermuda": "버뮤다(BM)",
  "Brunei": "브루나이(BN)",
  "Bolivia": "볼리비아(BO)",
  "Bahrain": "바레인(BH)",
  "Burundi": "부룬디(BI)",
  "Benin": "베냉(BJ)",
  "Bhutan": "부탄(BT)",
  "Jamaica": "자메이카(JM)",
  "Bouvet Island": "부베 섬(BV)",
  "Botswana": "보츠와나(BW)",
  "Samoa": "사모아(WS)",
  "Bonaire, Saint Eustatius and Saba": "카리브 네덜란드(BQ)",
  "Brazil": "브라질(BR)",
  "Bahamas": "바하마(BS)",
  "The Bahamas": "바하마(BS)",
  "Jersey": "저지섬(JE)",
  "Belarus": "벨로루시(BY)",
  "Belize": "벨리즈(BZ)",
  "Russian Federation": "러시아(RU)",
  "Russia": "러시아(RU)",
  "Rwanda": "르완다(RW)",
  "Serbia": "세르비아(RS)",
  "East Timor": "동티모르(TL)",
  "Reunion": "레위니옹(RE)",
  "Turkmenistan": "투르크메니스탄(TM)",
  "Tajikistan": "타지키스탄(TJ)",
  "Romania": "루마니아(RO)",
  "Tokelau": "토켈라우(TK)",
  "Guinea-Bissau": "기니비사우(GW)",
  "Guam": "괌(GU)",
  "Guatemala": "과테말라(GT)",
  "South Georgia and the South Sandwich Islands": "(GS)",
  "Greece": "그리스(GR)",
  "Equatorial Guinea": "적도 기니(GQ)",
  "Guadeloupe": "과들루프(GP)",
  "Japan": "일본(JP)",
  "Guyana": "가이아나(GY)",
  "Guernsey": "건지(GG)",
  "French Guiana": "프랑스령 기아나(GF)",
  "Georgia": "조지아(GE)",
  "Grenada": "그레나다(GD)",
  "Channel Islands":"채널 제도",
  "UK": "영국(GB)",
  "United Kingdom": "영국(GB)",
  "Gabon": "가봉(GA)",
  "El Salvador": "엘살바도르(SV)",
  "Guinea": "기니(GN)",
  "Gambia": "감비아(GM)",
  "Greenland": "그린란드(GL)",
  "Gibraltar": "지브롤터(GI)",
  "Ghana": "가나(GH)",
  "Oman": "오만(OM)",
  "Tunisia": "튀니지(TN)",
  "Jordan": "요르단(JO)",
  "Croatia": "크로아티아(HR)",
  "Haiti": "아이티(HT)",
  "Hungary": "헝가리(HU)",
  "Hong Kong SAR":"홍콩(HK)",
  "Hong Kong": "홍콩(HK)",
  "Honduras": "온두라스(HN)",
  "Heard Island and McDonald Islands": "(HM)",
  "Venezuela": "베네수엘라(VE)",
  "Puerto Rico": "푸에르토리코(PR)",
  "occupied Palestinian territory": "팔레스타인(PS)",
  "Palestinian Territory": "팔레스타인(PS)",
  "Palestine": "팔레스타인(PS)",
  "Palau": "팔라우(PW)",
  "Portugal": "포르투갈(PT)",
  "Svalbard and Jan Mayen": "스발바르 얀마옌 제도(SJ)",
  "Paraguay": "파라과이(PY)",
  "Iraq": "이라크(IQ)",
  "Panama": "파나마(PA)",
  "French Polynesia": "프랑스령 폴리네시아(PF)",
  "Papua New Guinea": "파푸아뉴기니(PG)",
  "Peru": "페루(PE)",
  "Pakistan": "파키스탄(PK)",
  "Philippines": "필리핀(PH)",
  "Pitcairn": "핏케언 제도(PN)",
  "Poland": "폴란드(PL)",
  "Saint Pierre and Miquelon": "생피에르 미클롱(PM)",
  "Zambia": "잠비아(ZM)",
  "Western Sahara": "서사하라(EH)",
  "Estonia": "에스토니아(EE)",
  "Egypt": "이집트(EG)",
  "South Africa": "남아프리카 공화국(ZA)",
  "Ecuador": "에콰도르(EC)",
  "Italy": "이탈리아(IT)",
  "Viet Nam": "베트남(VN)",
  "Vietnam": "베트남(VN)",
  "Solomon Islands": "(SB)",
  "Ethiopia": "에티오피아(ET)",
  "Somalia": "소말리아(SO)",
  "Zimbabwe": "(ZW)",
  "Saudi Arabia": "사우디아라비아(SA)",
  "Spain": "스페인(ES)",
  "Eritrea": "(ER)",
  "Montenegro": "몬테네그로(ME)",
  "Republic of Moldova": "몰도바(MD)",
  "Moldova": "몰도바(MD)",
  "Madagascar": "(MG)",
  "Saint Martin": "세인트 마틴 섬(MF)",
  "St. Martin": "세인트 마틴 섬(MF)",
  "Morocco": "모로코(MA)",
  "Monaco": "모나코(MC)",
  "Uzbekistan": "우즈베키스탄(UZ)",
  "Myanmar": "(MM)",
  "Mali": "(ML)",
  "Macao SAR": "마카오(MO)",
  "Macao": "마카오(MO)",
  "Mongolia": "몽골(MN)",
  "Marshall Islands": "(MH)",
  "North Macedonia": "북마케도니아(MK)",
  "Mauritius": "(MU)",
  "Malta": "몰타(MT)",
  "Malawi": "(MW)",
  "Maldives": "몰디브(MV)",
  "Martinique": "마르티니크(MQ)",
  "Northern Mariana Islands": "(MP)",
  "Montserrat": "(MS)",
  "Mauritania": "모리타니(MR)",
  "Isle of Man": "(IM)",
  "Uganda": "(UG)",
  "Tanzania": "탄자니아(TZ)",
  "Malaysia": "말레이시아(MY)",
  "Mexico": "멕시코(MX)",
  "Israel": "이스라엘(IL)",
  "France": "프랑스(FR)",
  "British Indian Ocean Territory": "(IO)",
  "Saint Helena": "(SH)",
  "Finland": "핀란드(FI)",
  "Fiji": "피지(FJ)",
  "Falkland Islands": "(FK)",
  "Micronesia": "(FM)",
  "Faroe Islands": "페로 제도(FO)",
  "Nicaragua": "(NI)",
  "Netherlands": "나우루(NL)",
  "Norway": "노르웨이(NO)",
  "Namibia": "나미비아(NA)",
  "Vanuatu": "(VU)",
  "New Caledonia": "(NC)",
  "Niger": "(NE)",
  "Norfolk Island": "(NF)",
  "Nigeria": "나이지리아(NG)",
  "New Zealand": "뉴질랜드(NZ)",
  "Nepal": "네팔(NP)",
  "Nauru": "(NR)",
  "Niue": "(NU)",
  "Cook Islands": "(CK)",
  "Kosovo": "코소보(XK)",
  "Ivory Coast": "코트디부아르(CI)",
  "Cote d'Ivoire":"코트디부아르(CI)",
  "Switzerland": "스위스(CH)",
  "Colombia": "콜롬비아(CO)",
  "Mainland China": "중국(CN)",
  "China": "중국(CN)",
  "Cameroon": "카메룬(CM)",
  "Chile": "칠레(CL)",
  "Cocos Islands": "(CC)",
  "Canada": "캐나다(CA)",
  "Central African Republic": "중앙아프리카 공화국(CF)",
  "Republic of the Congo": "콩고 공화국(CG)",
  "Congo (Brazzaville)":"콩고 공화국(CG)",
  "Democratic Republic of the Congo": "콩고 민주 공화국(CD)",
  "Congo (Kinshasa)": "콩고 민주 공화국(CD)",
  "Czech Republic": "체코(CZ)",
  "Czechia": "체코(CZ)",
  "Cyprus": "키프로스(CY)",
  "Christmas Island": "(CX)",
  "Costa Rica": "코스타리카(CR)",
  "Curacao": "퀴라소(CW)",
  "Cape Verde": "(CV)",
  "Cuba": "쿠바(CU)",
  "Swaziland": "에스와티니(SZ)",
  "Eswatini": "에스와티니(SZ)",
  "Syria": "(SY)",
  "Sint Maarten": "(SX)",
  "Kyrgyzstan": "키르기스스탄(KG)",
  "Kenya": "케냐(KE)",
  "South Sudan": "(SS)",
  "Suriname": "수리남(SR)",
  "Kiribati": "(KI)",
  "Cambodia": "캄보디아(KH)",
  "Saint Kitts and Nevis": "(KN)",
  "Comoros": "(KM)",
  "Sao Tome and Principe": "(ST)",
  "Slovakia": "슬로바키아(SK)",
  "Republic of Korea": "대한민국(KR)",
  "Korea, South": "대한민국(KR)",
  "South Korea": "대한민국(KR)",
  "Slovenia": "슬로베니아(SI)",
  "North Korea": "(KP)",
  "Kuwait": "쿠웨이트시티(KW)",
  "Senegal": "세네갈(SN)",
  "San Marino": "산마리노(SM)",
  "Sierra Leone": "(SL)",
  "Seychelles": "세이셸(SC)",
  "Kazakhstan": "카자흐스탄(KZ)",
  "Cayman Islands": "케이맨 제도(KY)",
  "Singapore": "싱가포르(SG)",
  "Sweden": "스웨덴(SE)",
  "Sudan": "수단(SD)",
  "Dominican Republic": "도미니카 공화국(DO)",
  "Dominica": "(DM)",
  "Djibouti": "(DJ)",
  "Denmark": "덴마크(DK)",
  "British Virgin Islands": "(VG)",
  "Germany": "독일(DE)",
  "Yemen": "(YE)",
  "Algeria": "알제리(DZ)",
  "US":"미국(US)",
  "United States": "미국(US)",
  "Uruguay": "우루과이(UY)",
  "Mayotte": "마요트(YT)",
  "United States Minor Outlying Islands": "(UM)",
  "Lebanon": "레바논(LB)",
  "Saint Lucia": "세인트루시아(LC)",
  "Laos": "(LA)",
  "Tuvalu": "(TV)",
  "Taipei and environs":"대만(TW)",
  "Taiwan": "대만(TW)",
  "Taiwan*": "대만(TW)",
  "Trinidad and Tobago": "트리니다드 토바고(TT)",
  "Turkey": "터키(TR)",
  "Sri Lanka": "스리랑카(LK)",
  "Liechtenstein": "리히텐슈타인(LI)",
  "Latvia": "라트비아(LV)",
  "Tonga": "(TO)",
  "Lithuania": "리투아니아(LT)",
  "Luxembourg": "룩셈부르크(LU)",
  "Liberia": "라이베리아(LR)",
  "Lesotho": "(LS)",
  "Thailand": "태국(TH)",
  "French Southern Territories": "(TF)",
  "Togo": "토고(TG)",
  "Chad": "차드(TD)",
  "Turks and Caicos Islands": "(TC)",
  "Libya": "(LY)",
  "Holy See": "성좌(바티칸 시국)(VA)",
  "Vatican City": "바티칸 시국(VA)",
  "Saint Vincent and the Grenadines": "세인트빈센트 그레나딘(VC)",
  "United Arab Emirates": "아랍에미리트(AE)",
  "Andorra": "안도라(AD)",
  "Antigua and Barbuda": "앤티가 바부다(AG)",
  "Afghanistan": "아프가니스탄(AF)",
  "Anguilla": "(AI)",
  "U.S. Virgin Islands": "(VI)",
  "Iceland": "아이슬란드(IS)",
  "Iran (Islamic Republic of)": "이란(IR)",
  "Iran": "이란(IR)",
  "Armenia": "아르메니아(AM)",
  "Albania": "알바니아(AL)",
  "Angola": "(AO)",
  "Antarctica": "(AQ)",
  "American Samoa": "(AS)",
  "Argentina": "아르헨티나(AR)",
  "Australia": "오스트레일리아(AU)",
  "Austria": "오스트리아(AT)",
  "Aruba": "아루바(AW)",
  "India": "인도(IN)",
  "Aland Islands": "(AX)",
  "Azerbaijan": "아제르바이잔(AZ)",
  "Republic of Ireland": "아일랜드()",
  "Ireland": "아일랜드(IE)",
  "Indonesia": "인도네시아(ID)",
  "Ukraine": "우크라이나(UA)",
  "Qatar": "카타르(QA)",
  "Mozambique": "(MZ)"
}
country_dt_sum = []
country_dt_org_sum = 0


#각 나라별 recovered
deaths_filtering_conuntry = [] 
deaths_recov_conuntry = [] 
deaths_deaths_conuntry = [] 

#***************************************Death 필터링**********************************************
#FindAll 몇개 찾았는지 개수 구하기
for i in pkg_list:
    pkg_list2 = i
    count=count+1

# 첫번째 필터 deaths 문구를 이용하여 deaths 통계들만 추출
for j in range(count):
    pkg_list3 = pkg_list[j]
    deaths_filtering_conuntry.append(pkg_list3)

    if re.search('deaths',str(deaths_filtering_conuntry[j])) != None:
        deaths_deaths_conuntry.append(deaths_filtering_conuntry[j])

    if re.search('recovered',str(deaths_filtering_conuntry[j])) != None:
        deaths_recov_conuntry.append(deaths_filtering_conuntry[j])


for j in range(len(deaths_deaths_conuntry)):
    if re.search('Lancet',str(deaths_deaths_conuntry[j])) != None:
        no_cty_str = j


del deaths_deaths_conuntry[no_cty_str]
del deaths_recov_conuntry[no_cty_str]


#******************************KCDC 질병관리본부 파싱*********************************


kr_driver = webdriver.Firefox()
kr_driver.get("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=")
time.sleep(2)
kr_html = kr_driver.page_source
time.sleep(1)
kr_driver.quit() 

kr_soup = BeautifulSoup(kr_html, 'lxml')#html5lib
kr_pkg_list=kr_soup.find('tbody') 

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
kr_pkg_list2=kr_pkg_list.findAll('tr') 
for j in range(len(kr_pkg_list2)):
    kr_pkg_list2[j] = str(kr_pkg_list2[j]).replace(",","")
    if (str(kr_pkg_list2[j]).find('서울') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        서울 = re.findall(r"\d+",str(upup))
        del upup[0:6]
    if (str(kr_pkg_list2[j]).find('강원') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        강원 = re.findall(r"\d+",str(upup))
        del upup[0:6]
    if (str(kr_pkg_list2[j]).find('경기') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        경기 = re.findall(r"\d+",str(upup))   
        del upup[0:6]     
    if (str(kr_pkg_list2[j]).find('인천') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        인천 = re.findall(r"\d+",str(upup))    
        del upup[0:6]
    if (str(kr_pkg_list2[j]).find('충남') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        충남 = re.findall(r"\d+",str(upup))
        del upup[0:6]
    if (str(kr_pkg_list2[j]).find('충북') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        충북 = re.findall(r"\d+",str(upup))
        del upup[0:6]
    if (str(kr_pkg_list2[j]).find('세종') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        세종 = re.findall(r"\d+",str(upup))    
        del upup[0:6]    
    if (str(kr_pkg_list2[j]).find('대전') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        대전 = re.findall(r"\d+",str(upup))   
        del upup[0:6] 
    if (str(kr_pkg_list2[j]).find('경북') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        경북 = re.findall(r"\d+",str(upup))
        del upup[0:6]
    if (str(kr_pkg_list2[j]).find('대구') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        대구 = re.findall(r"\d+",str(upup))
        del upup[0:6]
    if (str(kr_pkg_list2[j]).find('전북') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        전북 = re.findall(r"\d+",str(upup))     
        del upup[0:6]   
    if (str(kr_pkg_list2[j]).find('전남') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        전남 = re.findall(r"\d+",str(upup))    
        del upup[0:6]
    if (str(kr_pkg_list2[j]).find('광주') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        광주 = re.findall(r"\d+",str(upup))
        del upup[0:6]
    if (str(kr_pkg_list2[j]).find('경남') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        경남 = re.findall(r"\d+",str(upup))
        del upup[0:6]
    if (str(kr_pkg_list2[j]).find('울산') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        울산 = re.findall(r"\d+",str(upup))      
        del upup[0:6]  
    if (str(kr_pkg_list2[j]).find('부산') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        부산 = re.findall(r"\d+",str(upup))    
        del upup[0:6]
    if (str(kr_pkg_list2[j]).find('제주') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        제주 = re.findall(r"\d+",str(upup))   
        del upup[0:6] 
    if (str(kr_pkg_list2[j]).find('합계') > 1):
        upup.append(str(kr_pkg_list2[j])[str(kr_pkg_list2[j]).find('s_type1')+6:str(kr_pkg_list2[j]).find('s_type2')+15])
        합계 = re.findall(r"\d+",str(upup))
        del upup[0:6]        

 
#***************************************************************


kr_driver3 = webdriver.Firefox()
kr_driver3.get("https://pf.kakao.com/_XrQxkM")
time.sleep(2)
kr_html3 = kr_driver3.page_source
time.sleep(1)
kr_driver3.quit() 

kr_soup3 = BeautifulSoup(kr_html3, 'lxml')#html5lib
kr_pkg_list3=kr_soup3.findAll('div', {'class':'post_txt'}) 



kr_ctt = 0
up = []
up_nb = []
for iiiii in kr_pkg_list3:
    kr_ctt=kr_ctt+1
for jjjjj in range(kr_ctt):
    if (str(kr_pkg_list3[jjjjj]).find('기준)') > 1):
        up_nb.append(kr_pkg_list3[jjjjj])


up_nb[0]=up_nb[0].findAll('p') 
up_nb[0] = str(up_nb[0]).replace(",","")
print (up_nb[0])

up.append(str(up_nb[0])[str(up_nb[0]).find('격리 중'):str(up_nb[0]).find('격리 중')+12])
up[0] = re.findall(r"\d+",str(up[0]))

up.append(str(up_nb[0])[str(up_nb[0]).find('격리 중'):str(up_nb[0]).find('격리 중')+36])
print(up[1])
up[1] = str(up[1])[str(up[1]).find('격리해제'):str(up[1]).find('격리해제')+14]
up[1] = re.findall(r"\d+",str(up[1]))
print(up[1])


up.append(str(up_nb[0])[str(up_nb[0]).find('사망'):str(up_nb[0]).find('사망')+12])
up[2] = re.findall(r"\d+",str(up[2]))
up.append(str(up_nb[0])[str(up_nb[0]).find(r'현황'):str(up_nb[0]).find('현황')+12])
up[3] = re.findall(r"\d+",str(up[3]))
up.append(str(up_nb[0])[str(up_nb[0]).find(r'검사 중'):str(up_nb[0]).find(r'검사 중')+12])
up[4] = re.findall(r"\d+",str(up[4]))
up.append(str(up_nb[0])[str(up_nb[0]).find('음성'):str(up_nb[0]).find('음성')+12])
up[5] = re.findall(r"\d+",str(up[5]))


print(up)



#************************************************************************************************

##########################################국가별 DB##############################################

client = MongoClient('192.168.219.189:25555')
db = client['corona']
collect = db['total_korea']

#---------------config--------------------------
ct = datetime.datetime.now()
korea = ct + datetime.timedelta(hours=9)
#-----------------------------------------------

country = {}
country_deaths = {}
country_recov = {}

deaths_cty = []
recov_cty = []
deaths_cty_sum = 0
recov_cty_sum = 0

print(country_total)
# 사망자/완치자 구하는곳 , 확진자는 이미 위에서 구함
for i in range(len(country_total)):
	# 국가 이름 변경으로 인한 사망자/완치율 구해지지 않을때 원래 이름으로 변경
    if str(country_total[i]) == "Iran (Islamic Republic of)":
        country_total[i] = "Iran"
    #------------------------------사망자 구하는 곳 ---------------------------
    for jj in range(len(deaths_deaths_conuntry)):
    	if re.search(country_total[i],str(deaths_deaths_conuntry[jj])) != None:
    		deaths_cty.append(deaths_deaths_conuntry[jj]) 
    # 첫번째 필터를 숫자 구하기
    for jj in range(len(deaths_cty)):
    	aa = str(deaths_cty[jj])[str(deaths_cty[jj]).find('span')+27:str(deaths_cty[jj]).find('</')]
    	aa = aa.replace(",","")
    	deaths_cty_sum= deaths_cty_sum+int(aa)

    # 특수한 경우 몽골만 해당
    if country_total[i] == "Mongolia":
    	if re.search("Mainland China",str(deaths_cty)) != None:
	    	deaths_cty_sum = 0
    # 특수한 경우 몽골만 해당
    if country_total[i] == "Mongolia":
      if re.search("China",str(deaths_cty)) != None:
        deaths_cty_sum = 0
    #------------------------------완치율 구하는 곳 ---------------------------
    for jj in range(len(deaths_recov_conuntry)):
    	if re.search(country_total[i],str(deaths_recov_conuntry[jj])) != None:
        	recov_cty.append(deaths_recov_conuntry[jj])

    # 첫번째 필터를 통한 숫자 구하기
    for jj in range(len(recov_cty)):
    	aa = str(recov_cty[jj])[str(recov_cty[jj]).find('span')+35:str(recov_cty[jj]).find('</')]
    	aa = aa.replace(",","")
    	recov_cty_sum = recov_cty_sum+int(aa)


    # 특수한 경우 몽골만 해당
    if country_total[i] == "Mongolia":
    	if re.search("Mainland China",str(recov_cty)) != None:
	    	recov_cty_sum = 0
    # 특수한 경우 몽골만 해당
    if country_total[i] == "Mongolia":
      if re.search("China",str(recov_cty)) != None:
        recov_cty_sum = 0
    try:
        country_deaths[str(countryKoreaName[country_total[i]])+'_deaths']=deaths_cty_sum
        country_recov[str(countryKoreaName[country_total[i]])+'_recov']=recov_cty_sum
        country[countryKoreaName[country_total[i]]]=infeted_total[i]
    except:
        country_deaths[str(country_total[i])+'_deaths']=0
        country_recov[str(country_total[i])+'_recov']=0
        country[country_total[i]]=infeted_total[i]
        print("X")

    deaths_cty = []
    recov_cty = []
    deaths_cty_sum = 0
    recov_cty_sum = 0
    if country_total[i] == "한국(KR)" :
        korea_check = i        





# up.append(str(up_nb[0])[str(up_nb[0]).find('격리'):str(up_nb[0]).find('격리')+10])
# up[0] = re.findall(r"\d+",str(up[0]))
# up.append(str(up_nb[0])[str(up_nb[0]).find('격리해제'):str(up_nb[0]).find('격리해제')+10])
# up[1] = re.findall(r"\d+",str(up[1]))
# up.append(str(up_nb[0])[str(up_nb[0]).find('사망'):str(up_nb[0]).find('사망')+10])
# up[2] = re.findall(r"\d+",str(up[2]))
# up.append(str(up_nb[0])[str(up_nb[0]).find('의사환자'):str(up_nb[0]).find('의사환자')+10])
# up[3] = re.findall(r"\d+",str(up[3]))
# up.append(str(up_nb[0])[str(up_nb[0]).find('검사'):str(up_nb[0]).find('검사')+10])
# up[4] = re.findall(r"\d+",str(up[4]))
# up.append(str(up_nb[0])[str(up_nb[0]).find('결과음성'):str(up_nb[0]).find('결과음성')+10])
# up[5] = re.findall(r"\d+",str(up[5]))

# print(up)



#확진자 통합
korea_pp = int(up[0][0])
#사망자
korea_deaths = int(up[2][0])
#격리해제
korea_rec = int(up[1][0])
#의심환자
korea_rea = int(up[4][0])+int(up[5][0])#int(up[3][0])
#검사중
korea_ing = int(up[4][0])
#결과 음성
korea_no = int(up[5][0])

#확진자 나이대
korea_age_m = {"one" : 0,"two" : 10,"three":4, "four": 5, "five" :10, "six":1, "seven": 4, "eight": 1}
korea_age_w = {"one" : 2,"two" : 8,"three":9, "four": 6, "five" :13, "six":8, "seven": 2, "eight": 0}

# print(서울[1]) 격리중
# print(서울[3]) 격리해제
# print(서울[5]) 사망
# print(서울[7]) 합계
# print(서울[9]) 검사중
# print(서울[11]) 결과음성

#지역별 감염자
korea_cty = {"강원" : int(강원[1]),
            "경기" : int(경기[1]),
            "서울":int(서울[1]), 
            "인천": int(인천[1]), 
            "충남" :int(충남[1]), 
            "충북":int(충북[1]), 
            "세종": int(세종[1]), 
            "대전": int(대전[1]), 
            "경북": int(경북[1]), 
            "대구": int(대구[1]), 
            "전북": int(전북[1]), 
            "전남": int(전남[1]), 
            "광주": int(광주[1]), 
            "경남": int(경남[1]), 
            "울산": int(울산[1]), 
            "부산": int(부산[1]), 
            "제주": int(제주[1])
            }

global_total = len(country_total)

global_data = {
        'update_time' : korea,
        'date' : korea.strftime('%Y-%m-%d'),
        'korea_total' : korea_pp+korea_rec+korea_deaths,
        'korea_pppp' : korea_pp, 
        'korea_deaths' : korea_deaths,
        'korea_recov' : korea_rec,
        'korea_rea' : korea_rea,
        'korea_ing' : korea_ing,
        'korea_no' : korea_no,
        'korea_cty' : korea_cty,
        'global_total' : global_total,
        'global' : country,
        'global_deaths' : country_deaths,
        'global_recov' : country_recov,
        'korea_age_m' : korea_age_m,
        'korea_age_w' : korea_age_w
        }

result = collect.update_one(
    {'date':korea.strftime('%Y-%m-%d')},   #수정할 데이터 찾을 조건
    {
        '$set':{
                'update_time' : korea,
                'date' : korea.strftime('%Y-%m-%d'),
                'korea_total' : korea_pp+korea_rec+korea_deaths,
                'korea_pppp' : korea_pp, 
                'korea_deaths' : korea_deaths,
                'korea_recov' : korea_rec,
                'korea_rea' : korea_rea,
                'korea_ing' : korea_ing,
                'korea_no' : korea_no,
                'korea_cty' : korea_cty,
                'global_total' : global_total,
                'global' : country,
                'global_deaths' : country_deaths,
                'global_recov' : country_recov,
                'korea_age_m' : korea_age_m,
                'korea_age_w' : korea_age_w
                },
               #수정값
    })

if result.matched_count == 0 :
        collect.insert(global_data)



#확진자 연령별
#20대
# 21
# 25
# 28
# 28
# 28
# 28
# 28

#30대
# 33
# 35
# 37
# 30

#40대
# 48
# 40
# 43
# 42
# 41
# 46

#50대
# 55
# 55
# 54
# 55
# 55
# 54
# 59
# 57
# 51

#60대
# 62

#70대
#73
