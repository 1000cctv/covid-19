
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';


import chart from 'tui-chart';
import 'tui-chart/dist/tui-chart.min.css';
import 'tui-chart/maps/world';
import 'tui-chart/maps/south-korea';

// import jschart from 'js-chart';
// import 'js-chart/dist/Chart.js';
// import 'js-chart/dist/Chart.min.js'


import "../lib/countryNameToCode";
import "../lib/vendor/bootstrap/css/bootstrap.min.css";

//카운터 js
// import "../lib/js/countup/waypoints.min.js";
// import "../lib/js/countup/jquery.counterup.min.js";
// import "../lib/js/countup/jquery.counterup.js";

import "./bg.css";
import "./bgmain.html";
// import "./bg_news.html";
// import "./seoul.html";

import "popper.js";
import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";


Template.반응형.onCreated(function() {
  // Session.set("cnt", 6);


  today = moment((new Date()).getTime()).startOf('day').format('YYYY-MM-DD');
  yesterday = moment((new Date()).getTime()).subtract(1, 'd').startOf('day').format('YYYY-MM-DD');
  day1 = moment((new Date()).getTime()).subtract(1, 'd').startOf('day').format('YYYY-MM-DD');
  day2 = moment((new Date()).getTime()).subtract(2, 'd').startOf('day').format('YYYY-MM-DD');
  day3 = moment((new Date()).getTime()).subtract(3, 'd').startOf('day').format('YYYY-MM-DD');
  day4 = moment((new Date()).getTime()).subtract(4, 'd').startOf('day').format('YYYY-MM-DD');
  day5 = moment((new Date()).getTime()).subtract(5, 'd').startOf('day').format('YYYY-MM-DD');
  day6 = moment((new Date()).getTime()).subtract(6, 'd').startOf('day').format('YYYY-MM-DD');



  var self = this;
  self.autorun(function() {

    self.subscribe("total_earth"); // public
    self.subscribe("area_korea"); 
    // self.subscribe("total_korea"); // korea
    handle = self.subscribe('total_korea');
    //self.subscribe('boards');
  })

});

Template.반응형.onRendered(function() {
  // this.$('.carousel').carousel();
  var self = this;
  var check = 0;
  self.autorun(function() {

     if (handle.ready()) {



      var aaaarrrr = Total_korea.findOne({date : today});
      var totoday = Total_korea.findOne({date : today});
      var day11 = Total_korea.findOne({date : day1});
      var day22 = Total_korea.findOne({date : day2});
      var day33 = Total_korea.findOne({date : day3});
      var day44 = Total_korea.findOne({date : day4});
      var day55 = Total_korea.findOne({date : day5});
      var day66 = Total_korea.findOne({date : day6});

      var totoday_inf = totoday && totoday['korea_pppp']; 
      var totoday_dt = totoday && totoday['korea_deaths']; 
      var totoday_rec = totoday && totoday['korea_recov']; 

      var totoday1_inf = day11 && day11['korea_pppp']; 
      var totoday1_dt = day11 && day11['korea_deaths']; 
      var totoday1_rec = day11 && day11['korea_recov']; 
      var totoday2_inf = day22 && day22['korea_pppp']; 
      var totoday2_dt = day22 && day22['korea_deaths']; 
      var totoday2_rec = day22 && day22['korea_recov']; 

      var totoday3_inf = day33 && day33['korea_pppp']; 
      var totoday3_dt = day33 && day33['korea_deaths']; 
      var totoday3_rec = day33 && day33['korea_recov']; 

      var totoday4_inf = day44 && day44['korea_pppp']; 
      var totoday4_dt = day44 && day44['korea_deaths']; 
      var totoday4_rec = day44 && day44['korea_recov']; 

      var totoday5_inf = day55 && day55['korea_pppp']; 
      var totoday5_dt = day55 && day55['korea_deaths']; 
      var totoday5_rec = day55 && day55['korea_recov']; 

      var totoday6_inf = day66 && day66['korea_pppp']; 
      var totoday6_dt = day66 && day66['korea_deaths']; 
      var totoday6_rec = day66 && day66['korea_recov']; 

      var hh = []
      var hh2 = []
      var dt = []
      var dt2 = []
      var re = []
      var re2 = []
      // DB에서 국가 개수 가져오기
      var tg = aaaarrrr['global_total'] 
      // console.log(tg)
      //국가 별 네임 값, 벨류 값 각각의 어레이에 담기
      var global_iii = aaaarrrr && aaaarrrr['global'];      
      for (var key in global_iii){
        hh.push({name:key});
        hh2.push({val:global_iii[key]});
      }

      var global_dt = aaaarrrr && aaaarrrr['global_deaths'];
      for (var key in global_dt){
        dt.push({name:key});
        dt2.push({val:global_dt[key]});
      }
      var global_re = aaaarrrr && aaaarrrr['global_recov'];
      for (var key in global_re){
        re.push({name:key});
        re2.push({val:global_re[key]});
      }


      if (check == 0){
      //********************************국내 주간 통계***************************************
      weekly_chart(totoday_inf,totoday_dt,totoday_rec,totoday1_inf,totoday1_dt,totoday1_rec
        ,totoday2_inf,totoday2_dt,totoday2_rec
        ,totoday3_inf,totoday3_dt,totoday3_rec
        ,totoday4_inf,totoday4_dt,totoday4_rec
        ,totoday5_inf,totoday5_dt,totoday5_rec
        ,totoday6_inf,totoday6_dt,totoday6_rec);
      //********************************한국 맵***************************************
      var global_iii = aaaarrrr && aaaarrrr['korea_cty']; 
      korea_chart(global_iii);

      //********************************구글 월드 맵***************************************
      google_world_chart(hh,hh2,dt,dt2,re,re2,tg);

      google_korea_chart(global_iii);
      //********************************월드 맵***************************************
      // world_chart(hh,hh2,dt,dt2,re,re2,tg);
      //********************************연령별***************************************
      // var one = aaaarrrr['korea_age_m']['one']
      // var two = aaaarrrr['korea_age_m']['two']
      // var three = aaaarrrr['korea_age_m']['three']
      // var four = aaaarrrr['korea_age_m']['four']
      // var five = aaaarrrr['korea_age_m']['five']
      // var six = aaaarrrr['korea_age_m']['six']
      // var seven = aaaarrrr['korea_age_m']['seven']
      // var eight = aaaarrrr['korea_age_m']['eight']
      // var total = one+two+three+four+five+six+seven+eight
      // //***********************************************************************
      // var one_w = aaaarrrr['korea_age_w']['one']
      // var two_w = aaaarrrr['korea_age_w']['two']
      // var three_w = aaaarrrr['korea_age_w']['three']
      // var four_w = aaaarrrr['korea_age_w']['four']
      // var five_w = aaaarrrr['korea_age_w']['five']
      // var six_w = aaaarrrr['korea_age_w']['six']
      // var seven_w = aaaarrrr['korea_age_w']['seven']
      // var eight_w = aaaarrrr['korea_age_w']['eight']
      // var total_w = one_w+two_w+three_w+four_w+five_w+six_w+seven_w+eight_w
      // korea_chart_age(total,one,two,three,four,five,six,seven,eight,total_w,one_w,two_w,three_w,four_w,five_w,six_w,seven_w,eight_w);

      //********************************해외 감염자 기록***************************************
      // 감염자 11 - 1번쨰,2번째,3번,4번,5번,7번째,8번,13번,16번,23,24
      // 접촉자 23 - 6번,9번, 10번,11번,12번,14번,15번,17번,18번,19,20,21,22,25,26,27,28,30,47,48,49,50,51
      // 확인중 17 - 29,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46
      // var value1111 = Total_korea.findOne({date : today});
      // var value2222 = value1111 && value1111['korea_total'];
      // var one = 11 //감염자
      // var two = 23 //접촉자
      // var three = value2222 - one - two//17+31
      // var total = one + two + three
      // drawing_chart(total,one,two,three);

      check =1;

      }

     }

  })

});




//************************국내 주간 통계*****************************************************
var weekly_chart = function(totoday_inf,totoday_dt,totoday_rec,totoday1_inf,totoday1_dt,totoday1_rec
        ,totoday2_inf,totoday2_dt,totoday2_rec
        ,totoday3_inf,totoday3_dt,totoday3_rec
        ,totoday4_inf,totoday4_dt,totoday4_rec
        ,totoday5_inf,totoday5_dt,totoday5_rec
        ,totoday6_inf,totoday6_dt,totoday6_rec) {
      day = []
      day_ct = 0
      do {
              day[day_ct] = moment((new Date()).getTime()).subtract(day_ct, 'd').startOf('day').format('MM-DD');
              day_ct+= 1;
      }while (day_ct < 7);
      google.charts.load('current', {'packages':['line', 'corechart']});
      google.charts.setOnLoadCallback(drawChart);


      function drawChart() {

      var chartDiv = document.getElementById('g_chart_div');

      var data = new google.visualization.DataTable();
      data.addColumn('string', '날짜');
      data.addColumn('number', "총 인원");
      // data.addColumn('number', "사망자");
      // data.addColumn('number', "격리해제");
       data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});
       t6 = totoday6_inf+totoday6_dt+totoday6_rec
       t5 = totoday5_inf+totoday5_dt+totoday5_rec
       t4 = totoday4_inf+totoday4_dt+totoday4_rec
       t3 = totoday3_inf+totoday3_dt+totoday3_rec
       t2 = totoday2_inf+totoday2_dt+totoday2_rec
       t1 = totoday1_inf+totoday1_dt+totoday1_rec
       t = totoday_inf+totoday_dt+totoday_rec
      data.addRows([
          [day[6], totoday6_inf+totoday6_dt+totoday6_rec,createCustomHTMLContent('https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1280px-Flag_of_South_Korea.svg.png'
            ,day[6],totoday6_inf+totoday6_dt+totoday6_rec,totoday6_inf,totoday6_dt,totoday6_rec)],
          [day[5], totoday5_inf+totoday5_dt+totoday5_rec,createCustomHTMLContent('https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1280px-Flag_of_South_Korea.svg.png'
            ,day[5],totoday5_inf+totoday5_dt+totoday5_rec,totoday5_inf,totoday5_dt,totoday5_rec)],
          [day[4], totoday4_inf+totoday4_dt+totoday4_rec,createCustomHTMLContent('https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1280px-Flag_of_South_Korea.svg.png'
            ,day[4],totoday4_inf+totoday4_dt+totoday4_rec, totoday4_inf,totoday4_dt,totoday4_rec)],
          [day[3], totoday3_inf+totoday3_dt+totoday3_rec,createCustomHTMLContent('https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1280px-Flag_of_South_Korea.svg.png'
            ,day[3],totoday3_inf+totoday3_dt+totoday3_rec, totoday3_inf,totoday3_dt,totoday3_rec)],
          [day[2], totoday2_inf+totoday2_dt+totoday2_rec,createCustomHTMLContent('https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1280px-Flag_of_South_Korea.svg.png'
           ,day[2] ,totoday2_inf+totoday2_dt+totoday2_rec, totoday2_inf,totoday2_dt,totoday2_rec)],
          [day[1], totoday1_inf+totoday1_dt+totoday1_rec,createCustomHTMLContent('https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1280px-Flag_of_South_Korea.svg.png'
            ,day[1],totoday1_inf+totoday1_dt+totoday1_rec, totoday1_inf,totoday1_dt,totoday1_rec)],
          [day[0], totoday_inf+totoday_dt+totoday_rec,createCustomHTMLContent('https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1280px-Flag_of_South_Korea.svg.png'
            ,day[0],totoday_inf+totoday_dt+totoday_rec, totoday_inf,totoday_dt,totoday_rec)]
      ]);

      var classicOptions = {
        title: 'Corona 19 주간',
/*         width: 900,
        height: 500, */
        // Gives each series an axis that matches the vAxes number below.
        series: {
          0: {targetAxisIndex: 0},
          1: {targetAxisIndex: 1},
          2: {targetAxisIndex: 1}
        },
        legend: { position: 'bottom'},
        tooltip:{textStyle : {fontSize:12}, showColorCode : true, isHtml: true},
        vAxes: {
          // Adds titles to each axis.
          // 0: {title: ''},
          // 1: {title: ''} 
        },
        hAxis: {
          ticks: [
                 ]
        },
        vAxis: {
          viewWindow: {
             // max:  1000
          }
        }
      };
      function drawClassicChart() {
        var classicChart = new google.visualization.LineChart(chartDiv);
        classicChart.draw(data, classicOptions);

      }

      drawClassicChart();


      }

function createCustomHTMLContent(flagURL,day,total, inf, dt, rec) {
  return '<div style="padding:5px 5px 5px 5px;">' +
      '<img src="' + flagURL + '" style="width:75px;height:50px"><br/>' +
      '<table class="medals_layout">' + 
      '<tr>' +'<td><b>' + day + '</b></td>' + '</tr>' + 
      '<tr>' +'<td><b>' +'총인원:'+ total + '</b></td>' + '</tr>' + 
      '<tr>' +'<td><b>' +'격리중:'+ inf + '</b></td>' + '</tr>' + 
      '<tr>' +'<td style="color:red;"><b>' +'사망자:'+ dt + '</b></td>' + '</tr>' + 
      '<tr>' +'<td style="color:green;"><b>' +'격리해제:'+ rec + '</b></td>' + '</tr>'

      + '</table>' + '</div>';
}

}

//=================================google Chart 월드 맵===============================================
var google_world_chart = function(hh,hh2,dt,dt2,re,re2,tg) {
google.load('visualization', '1', {'packages': ['geochart']});
google.setOnLoadCallback(drawVisualization);

function drawVisualization() {
  var data = new google.visualization.DataTable();
      ia = 0
      ai = 0
      google_world_ct = 0
      g_data = [];
      conty = [];
  do {
  			 
	  		try {
	             name_code = hh[ia]['name'].replace(/[^A-Z]/g,"");
	             val_code= hh2[ia]['val'].replace(/,/g,"");
	             if (name_code.length == 2){
		              g_data.push({ code: name_code , data: Number(val_code) });
		              conty.push({ code: hh[ia]['name'] , data: hh2[ia]['val'], dt: dt2[ia]['val'], re: re2[ia]['val'] })              
		             }
	          } catch (e) {
	          	// console.log(hh[ia])
	          } 


             ia += 1; 
     }while (ia < tg);

  data.addColumn('string', 'Country');
  data.addColumn('number', 'Value'); 
  data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});

   // Number(conty[google_world_ct]['data'].replace(/,/g,""))
   // console.log()
  do {  
        
              data.addRows([[{
                v:g_data[google_world_ct]['code'],
                f:conty[google_world_ct]['code']
              },
                google_world_ct,
                createCustomHTMLContent(String(conty[google_world_ct]['data']).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                  ,String(conty[google_world_ct]['dt']).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                  ,String(conty[google_world_ct]['re']).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                  )]]);

  
      google_world_ct += 1;
     }while (google_world_ct < g_data.length);

      // data.addRows([[{v:'KR',f:'Korea'},0,createCustomHTMLContent(1111,12,12,12)]]);
      // data.addRows([[{v:'AF',f:'China'},50,'21% of Visits']]);


   var options = {
     backgroundColor: {fill:'#FFFFFF',stroke:'#FFFFFF' ,strokeWidth:0 },
     colorAxis:  {minValue: 0,   colors: ['#0a2c13','#054c19','#076a23','#0c9232','#10ad3c','#31cc5d','#45de70','#6cf492','#89fca9','#a8f6be','#c1f2cf','#d8f1df','#eeeeee',]},
     legend: 'none',  
     backgroundColor: {fill:'#FFFFFF',stroke:'#FFFFFF' ,strokeWidth:0 },  
     datalessRegionColor: '#F5F0E7',
     displayMode: 'regions', 
     enableRegionInteractivity: 'true', 
     resolution: 'countries',
     sizeAxis: {minValue: 1, maxValue:1,minSize:10,  maxSize: 10},
     region:'world',
     keepAspectRatio: true,
     // width:600,
     // height:400,
     tooltip:{textStyle : {fontSize:12}, showColorCode : true, isHtml: true}
   };

    var chart = new google.visualization.GeoChart(document.getElementById('google_word_map'));
    
  //   google.visualization.events.addListener(chart, 'select', function() {
  //   var selection = chart.getSelection();
  //   if (selection.length == 1) {
  //     var selectedRow = selection[0].row;
  //     var selectedRegion = data.getValue(selectedRow, 0);
  //     if(selectedRegion == 'KR') {
  //       // console.log('클릭')
  //     }
  //     if(selectedRegion == 'CN') {
  //       // console.log('클릭')
  //     }
  //   }
  // });

  chart.draw(data, options);
 }


function createCustomHTMLContent(inf, dt, rec) {
  return '<div style="padding:5px 5px 5px 5px;">' +
      // '<img src="' + flagURL + '" style="width:75px;height:50px"><br/>' +
      '<table class="medals_layout >' + 
      '<tr>' +'<td width="100">' +'<b>확진자: </b>'+ inf + '명 </td>' + '</tr>' + 
      '<tr>' +'<td width="100" style="color:red;">' +'<b>사망자: </b>'+ dt + '명</td>' + '</tr>' + 
      '<tr>' +'<td width="100" style="color:green;">' +'<b>완치자: </b>'+ rec + '명</td>' + '</tr>'
      + '</table>' + '</div>';
}
}




//=================================google Chart 한국 맵===============================================


var google_korea_chart = function(kr_cty) {

google.load('visualization', '1', {'packages': ['geochart']});
google.setOnLoadCallback(kr_drawVisualization);
count = 0;
function kr_drawVisualization() {
  var data = new google.visualization.DataTable();
  result = []
  data.addColumn('string', 'Country');
  data.addColumn('number', 'Value'); 
  data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});


    for (var key in kr_cty){
        result.push({name:key,value:kr_cty[key]});
      }
    result.sort(function(a, b) { // 내림차순
    return b["value"] - a["value"];
    });
    // console.log(result.length)
    // console.log(kr_cty[result[0]['name']])
    // console.log(result[0]['name'])
    // console.log(gg_koreaNameToCode[result[0]['name']])
    do {
                data.addRows([[{
                  v:gg_koreaNameToCode[result[count]['name']], 
                  f:result[count]['name']
                },
                  count,
                  createCustomHTMLContent(String(kr_cty[result[count]['name']]).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
                  ]]);                       
                count+= 1;
       }while (count < result.length-1);  

  // data.addRows([[{v:'KR-42',f:'Gang\'weondo'},9,'Click to change background color']]);
  // data.addRows([[{v:'KR-41',f:'Gyeonggido'},10,'Click to change background color']]);
  // data.addRows([[{v:'KR-47',f:'Gyeongsangbugdo'},11,'Click to change background color']]);
  // data.addRows([[{v:'KR-48',f:'Gyeongsangnamdo'},12,'Click to change background color']]);
  // data.addRows([[{v:'KR-49',f:'Jejudo'},13,'Click to change background color']]);
  // data.addRows([[{v:'KR-45',f:'Jeonrabugdo'},14,'Click to change background color']]);
  // data.addRows([[{v:'KR-46',f:'Jeonranamdo'},15,'Click to change background color']]);

  var options = {
    backgroundColor: {fill:'#FFFFFF',stroke:'#FFFFFF' ,strokeWidth:0 },
    colorAxis:  {minValue: 0, maxValue: 16,  colors: ['#105249','1b8476','#27ad9b','#2dc5b0','#34e0c9','#3bfde3','#b5fff5','#e4fffb','#fafafa']},
    legend: 'none', 
    backgroundColor: {fill:'#FFFFFF',stroke:'#FFFFFF' ,strokeWidth:0 }, 
    datalessRegionColor: '#f5f5f5',
    displayMode: 'regions', 
    enableRegionInteractivity: 'true', 
    resolution: 'provinces',
    sizeAxis: {minValue: 1, maxValue:1,minSize:10,  maxSize: 10},
    region:'KR', //country code
    keepAspectRatio: true,
    tooltip:{textStyle : {fontSize:12}, showColorCode : true, isHtml: true}
    // width:600,
    // height:400,
  };
  var chart = new google.visualization.GeoChart(document.getElementById('google_korea_map')); 
  chart.draw(data, options);
}

function createCustomHTMLContent(inf) {
  return '<table width="100" class="medals_layout >' + 
      '<tr>' +'<td width="100">' +'<b>확진자: </b>'+ inf + '명 </td>' + '</tr>' 
      + '</table>' + '</div>';
}
}

//=================================nhn tui-Chart 월드 맵==============================================
var world_chart = function(hh,hh2,dt,dt2,re,re2,tg) {
      ia = 0
      ai = 0
      var container = document.getElementById('world_map'),
          data = { series: [ ] };
          conty = [];
          do {
                     name_code = hh[ia]['name'].replace(/[^A-Z]/g,"");
                     val_code= hh2[ia]['val'].replace(/,/g,"");
                     data.series.push({ code: name_code , data: Number(val_code) });
                     conty.push({ code: hh[ia]['name'] , data: hh2[ia]['val'], dt: dt2[ia]['val'], re: re2[ia]['val'] })
                      ia += 1;
             }while (ia < tg);
          options = {
            chart: {
                width: 430,
                height: 200,
                 format: '0'
              // title: '코로나 바이러스 국가별'
            },
            map: 'world',
            legend: {
            align: 'right'
            },
            tooltip: {
                      template: function(item) {
                        let countryName = item['name'];
                        let countryCode = countryNameToCode[item['name']];
                        // console.log(countryCode)
                        //  console.log(data.series[0]['code'])
                          do {
                                 
                                if (countryCode == data.series[ai]['code']){
                                      name = conty[ai]['code']
                                      name_data = conty[ai]['data']
                                      name_deaths = conty[ai]['dt']
                                      name_recov = conty[ai]['re']
                                }
                                      ai += 1;
                             }while (ai < tg);
                          ai = 0;

                        let html1 = '<h6>' + name+ '</h6> ';
                        html2 = '<h6>' + '감염자 : '+ name_data + ' 명'+'</h6>';
                        html3 = '<h6>' + '사망자 : '+ name_deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' 명'+'</h6>';
                        html4 = '<h6>' + '완치자 : '+ name_recov.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' 명'+'</h6> ';
                        html = '<div class="map-tooltip">' + html1 + html2 + html3 +html4 + "</div>";
                        return html;
                   }
                    
              }
          };
      chart.mapChart(container, data, options);
}



//===============================원형 차트 수 작업=================================

  var drawing_chart = function(total,one,two,three) {
    var chart = require('tui-chart');
    var container = document.getElementById('korea_age_chart');
    var data = {
      categories: ['국내 감염자'],
      seriesAlias: {
        pie1: 'pie',
        pie2: 'pie'
      },
      series: {
        pie1: [{
          name: '감염 경로',
          data: total
        }, ],
        pie2: [
          {
            name: '(해외)감염자',
            data: one
          },
          {
            name: '접촉자',
            data: two
          },
          {
            name: '확인중',
            data: three
          }     
        ]
      }
    };
    var options = {
      chart: {
          width: 300,
          height: 350,

         format: function(value, chartType, areaType, valuetype, legendName) {
            if (areaType === 'makingSeriesLabel') { // formatting at series area
                value = value + '%';
                // console.log(value)
            }
            return value;
        }
        // height: 700,
        // title: 'Usage share of web browsers'
      },
      series: {
        pie1: {
          radiusRange: ['57%'],
          labelAlign: 'center',
          showLegend: true
        },
        pie2: {
          radiusRange: ['70%', '150%'],
          labelAlign: 'center',
          showLegend: false
          // colors: ['#FF3800', '#FF6000', '#FFAA00', '#14ABBD'],
          // radiusRange: ['60%', '100%']
        }
      },
      legend: {
        visible: true,
        align: 'top',
        // vertical-align:'middle'
      },
      tooltip: {
        suffix: '건'
      },
      theme: 'newTheme'
    };

    chart.registerTheme('newTheme', {
      series: {
        pie1: {
          colors: ['#00a9ff', '#ffb840', '#ff5a46', '#00bd9f', '#785fff', '#f28b8c', '#989486', '#516f7d', '#29dbe3', '#dddddd'],
          label: {
            color: '#fff',
            fontFamily: 'sans-serif'
          }
        },
        pie2: {
          colors: [
            '#FF3800', '#FF6000', '#FFAA00', '#14ABBD'
          ],
          label: {
            color: '#fff',
            fontFamily: 'sans-serif'
          }
        }
      }

    });



    chart.comboChart(container, data, options);
    // 반응형 소스
  // $(window).bind('resize', function(e) {
  //   chart.resize({
  //     width: $('#korea_age_chart').parent('div').parent('div').width() / 6,
  //   })
  // })

  }



//===============================막대 차트 수 작업=================================

var korea_chart_age = function(total,one,two,three,four,five,six,seven,eight,total_w,one_w,two_w,three_w,four_w,five_w,six_w,seven_w,eight_w) {
var container3 = document.getElementById('kca');
var data3 = {
    categories: ['80대', '70대', '60대', '50대', '40대', '30대', '20대', '10대'],
    series: [
        {
            name: '남성',
            data: [eight,seven,six,five,four,three,two,one]
        },
        {
            name: '여성',
            data: [eight_w,seven_w,six_w,five_w,four_w,three_w,two_w,one_w]
        }
    ]
};
var options3 = {
    chart: {
        width: 500,
        height: 600,
        //title: 'Monthly Revenue',
        format: '5,00'
    },
    legend: {
        align: 'top'
    },
    yAxis: {
        title: '연령별'
    },
    xAxis: {
        title: '수',
        min: 0,
        max: 15,
        suffix: '명'
    },
     series: {
         showLabel: true
     },
      tooltip: {
        suffix: '명'
      }
};
var theme = {
    series: {
        colors: [
            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
        ]
    }
};
chart.barChart(container3, data3, options3);
}

//************************************************************************************************************
//******************************************한국 지도*****************************************************************


var korea_chart = function(kr_cty) {
var container2 = document.getElementById('korea_map');
var data2 = {
    series: [
        {
            code: 'KR-SU', //서울
            data: kr_cty['서울']
        },
        {
            code: 'KR-BS', //부산
            data: kr_cty['부산']
        },
        {
            code: 'KR-DG', //대구
            data: kr_cty['대구']
        },
        {
            code: 'KR-IC', //인천
            data: kr_cty['인천']
        },
        {
            code: 'KR-GJ',//광주
            data: kr_cty['광주']
        },
        {
            code: 'KR-DJ',//대전
            data: kr_cty['대전']
        },
        {
            code: 'KR-US',//울산
            data: kr_cty['울산']
        },
        {
            code: 'KR-GG', //경기도
            data: kr_cty['경기']
        },
        {
            code: 'KR-GW', //강원도
            data: kr_cty['강원']
        },
        {
            code: 'KR-NC', //충북
            data: kr_cty['충북']
        },
        {
            code: 'KR-SC', //충남
            data: kr_cty['충남']
        },
        {
            code: 'KR-NJ', //전북
            data: kr_cty['전북']
        },
        {
            code: 'KR-SJ', //전남
            data: kr_cty['전남']
        },
        {
            code: 'KR-SG', //경남
            data: kr_cty['경남']
        },
        {
            code: 'KR-JJ', //제주
            data: kr_cty['제주']
        },
        {
            code: 'KR-SE', //세종
            data: kr_cty['세종']
        },
        {
            code: 'KR-NG', //경북
            data: kr_cty['경북']
        }
    ]
};
var options2 = {
    chart: {

         width: 400,
         height: 430
    },
    map: 'south-korea',
    legend: {
        align: false
    },
    tooltip: {
      template: function(item) {
        // console.log(item['name'])
        // console.log(koreaNameToCode)
        let html1 = '<h4>' + koreaNameToCode[item['name']] + '</h4> ';
        html2 = '<h5>' + '감염자 :'+ item['value'] + ' 명'+'</h5>';
        html = '<div class="map-tooltip">' + html1 + html2 +"</div>";
        return html;
      }
    }
};
var theme2 = {
    series: {
        startColor: '#ffefef',
        endColor: '#ac4142',
        overColor: '#75b5aa'
    }
};
chart.mapChart(container2, data2, options2);

}



//************************************************************************************************************


Template.반응형.events({
  // "click button[name=submit]": function(evt, ins) {
  //   //  var url = ins.find("input[name=submit]").value;
  //   // Meteor.call('find_website');
  // },
  // "click button[name=more]": function(evt, ins) {
  //   Session.set("cnt", Session.get('cnt') + 10);
  // }
//function changeLink() {
// "click #changeLink": function(event, template) {
//   var link = document.getElementById("link");       // 아이디가 "link"인 요소를 선택함.
//   link.href = "/seoul#";  // 해당 요소의 href 속성값을 변경함.
//   console.log(document.getElementById("changeLink").innerText)
// }

});


Template.반응형.helpers({
  'seoul_url': function(cty) {
    if (cty == '서울') {
      return true;
    }
    return false;
  },
  'seoul_url2': function() {
      var result = [];
      result.push({name:"상세 정보 보기",value:"22"});
    return result[0];
  },
  global : function() { 
     var global_i = Total_korea.findOne({date : today});
     var global_ii = global_i && global_i['global'];
     return global_ii 
  },  
  'kr_contry': function() {
    var result = [];
    var sortingField = "value";
    var kr_cty = Total_korea.findOne({date : today});
    var korea_cty = kr_cty && kr_cty['korea_cty'];
    //********************************************************
    var kr_area = Area_korea.findOne({date : today});
    var korea_area = kr_area && kr_area['korea_area_inf'];
    var korea_seoul = korea_area && korea_area['서울']
      for (var key in korea_cty){
        //서울 부분만 따로 수정 ( 서울 특별시 홈페이지에서 불러온걸로 로드)
        if (key == "서울"){
          korea_cty[key] = korea_seoul
        }
        result.push({name:key,value:korea_cty[key]});
      }
    result.sort(function(a, b) { // 내림차순
    return b[sortingField] - a[sortingField];
    // 44, 25, 21, 13
    });


    return result ;
  },
  'get_country_status': function(obj) {
    var result = [];
    var result2 = [];
    var result3 = [];

    countsum_len = 0

    var global_i = Total_korea.findOne({date : today});
    var global_ii = global_i && global_i['global_deaths'];
    // for (var key in global_ii)
    //   result.push({name:key,value:obj[key],val2:aa});
    var global_iy = Total_korea.findOne({date : today});
    var global_iii = global_iy && global_iy['global_recov'];

    for (var key in obj){
        result.push({name:key,value:obj[key],value2:0,value3:0,count:0});
        countsum_len = countsum_len+1
      }

    for (var key2 in global_ii){
        result2.push({value2:global_ii[key2]});
      }

    for (var key3 in global_iii){
        result3.push({value3:global_iii[key3]});
      }

    //Deaths
    ll = 1
    ii = 0
    do {
      try {
         result[ii]['count'] = ll
         result[ii]['value2'] = result2[ii]['value2'] && result2[ii]['value2'];
         result[ii]['value3'] = result3[ii]['value3'] && result3[ii]['value3']; 
         ll = ll+1

          } catch (e) {
            // console.log(e instanceof TypeError); // true
            // console.log(e.message);              // "null has no properties"
            // console.log(e.name);                 // "TypeError"
            // console.log(e.fileName);             // "Scratchpad/1"
            // console.log(e.lineNumber);           // 2
            // console.log(e.columnNumber);         // 2
            // console.log(e.stack);                // "@Scratchpad/2:2:3\n"
          } 


              // result2[i][Object.keys(result2[i])[0]]
              // result3[ii][Object.keys(result3[ii])[0]]
                     
          ii += 1;
       } while (ii < countsum_len);

    return result;
  },


  // 'check_cnt': function() {
  //   if (Session.get('web_cnt') <= Session.get('cnt')) {
  //     return 0
  //   } else {
  //     return 1
  //   }
  // },
  'date_slice':function(date){
    return moment(date).format('YYYY-MM-DD')
  },

  'get_total_earth': function(data) {
    var value1 = Total_earth.findOne({date : today});
    var value2 = value1 && value1['global_total'];
    return value2;
  },
  'get_total_deaths': function(data) {
    var value1 = Total_earth.findOne({date : today});
    var value2 = value1 && value1['global_deaths'];
    return value2;
  },
  'get_total_recov': function(data) {
    var value1 = Total_earth.findOne({date : today});
    var value2 = value1 && value1['global_recov'];
    return value2;
  },
  'get_total_per': function(data) {
    var value1 = Total_earth.findOne({date : today});
    var infeted_val = value1 && value1['global_total'];
    var death_val = value1 && value1['global_deaths'];
    var cal = (death_val / infeted_val) * 100
    return cal.toFixed(2);
  },
  'get_update': function(data) {
    var value1 = Total_earth.findOne({date : today});
    var val = value1 && value1['update_time'];
    var val2 = value1 && value1['date'];
    a = moment(val).add("hour",3).format('전체 업데이트 : '+val2+' '+'hh시 mm분 ss초')
    return a;
  },
  'yesterday_get_total_earth': function(data) {
    var value1 = Total_earth.findOne({date : today});
    var value2 = value1 && value1['global_total'];

    var yesterday_val = Total_earth.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['global_total'];

    //value2가 yester보다 클 경우
    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two
      document.getElementById("color").style.color = 'red';
      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
      document.getElementById("color").style.color = 'green';
      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },
  'yesterday_get_total_deaths': function(data) {
    var value1 = Total_earth.findOne({date : today});
    var value2 = value1 && value1['global_deaths'];
    var yesterday_val = Total_earth.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['global_deaths'];

    //value2가 yester보다 클 경우
    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two
      document.getElementById("color1").style.color = 'red';
      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
      document.getElementById("color1").style.color = 'green';
      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },
  'yesterday_get_total_recov': function(data) {
    var value1 = Total_earth.findOne({date : today});
    var value2 = value1 && value1['global_recov'];
    var yesterday_val = Total_earth.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['global_recov'];

    //value2가 yester보다 클 경우
    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two
      document.getElementById("color2").style.color = 'green';
      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
      document.getElementById("color2").style.color = 'red';
      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },
// **********************************************국내*****************
  'kr_cty_count': function(data) {
        var aaaarrrr = Total_korea.findOne({date : today});
        var global_iii = aaaarrrr && aaaarrrr['korea_cty']; 
        var 대구 = global_iii && global_iii['대구']
        var 경북 = global_iii && global_iii['경북']
        var 부산 = global_iii && global_iii['부산']
        var 경기 = global_iii && global_iii['경기']
        // var 서울 = global_iii && global_iii['서울']
        var 경남 = global_iii && global_iii['경남']
        var 광주 = global_iii && global_iii['광주']
        var 강원 = global_iii && global_iii['강원']
        var 충북 = global_iii && global_iii['충북']
        var 대전 = global_iii && global_iii['대전']
        var 전북 = global_iii && global_iii['전북']
        var 울산 = global_iii && global_iii['울산']
        var 인천 = global_iii && global_iii['인천']
        var 충남 = global_iii && global_iii['충남']
        var 전남 = global_iii && global_iii['전남']
        var 제주 = global_iii && global_iii['제주']
        var 세종 = global_iii && global_iii['세종']  

        var area_kr = Area_korea.findOne({date : today});
        var seoul = area_kr && area_kr['korea_area_inf']; 
        var 서울 = area_kr && Number(seoul['서울']);
 
        return 대구+경북+부산+경기+서울+경남+광주+강원+충북+대전+전북+울산+인천+충남+전남+제주+세종
    },
// **********************************************국내*****************
  'kr_age_count': function(data) {
      var aaaarrrr = Total_korea.findOne({date : today});
      var one = aaaarrrr &&aaaarrrr['korea_age_m']['one']
      var two = aaaarrrr &&aaaarrrr['korea_age_m']['two']
      var three = aaaarrrr &&aaaarrrr['korea_age_m']['three']
      var four = aaaarrrr &&aaaarrrr['korea_age_m']['four']
      var five = aaaarrrr &&aaaarrrr['korea_age_m']['five']
      var six = aaaarrrr &&aaaarrrr['korea_age_m']['six']
      var seven = aaaarrrr &&aaaarrrr['korea_age_m']['seven']
      var eight = aaaarrrr &&aaaarrrr['korea_age_m']['eight']
      //***********************************************************************
      var one_w = aaaarrrr &&aaaarrrr['korea_age_w']['one']
      var two_w = aaaarrrr &&aaaarrrr['korea_age_w']['two']
      var three_w = aaaarrrr &&aaaarrrr['korea_age_w']['three']
      var four_w = aaaarrrr &&aaaarrrr['korea_age_w']['four']
      var five_w = aaaarrrr &&aaaarrrr['korea_age_w']['five']
      var six_w = aaaarrrr &&aaaarrrr['korea_age_w']['six']
      var seven_w = aaaarrrr &&aaaarrrr['korea_age_w']['seven']
      var eight_w = aaaarrrr &&aaaarrrr['korea_age_w']['eight']
      var total = one_w+two_w+three_w+four_w+five_w+six_w+seven_w+eight_w+one+two+three+four+five+six+seven+eight

      return total;
  },

  'kr_get_update': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var val = value1 && value1['update_time'];
    var val2 = value1 && value1['date'];
    a = moment(val).add("hour",3).format('국내 업데이트 : '+ val2 +' '+'hh시 mm분 ss초')
    return a;
  },
  'get_total_korea': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['korea_total'];
    return value2;
  },
  'get_total_count': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['global_total'];
    return value2;
  },
  'yesterday_get_total_korea': function(data) {
    var value1 = Total_earth.findOne({date : today});
    var value2 = value1 && value1['korea_total'];
    var yesterday_val = Total_earth.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_total'];

    //value2가 yester보다 클 경우
    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two
      document.getElementById("kr_color1").style.color = 'red';
      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
      document.getElementById("kr_color1").style.color = 'green';
      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },
  'get_total_pppp': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['korea_pppp'];
    return value2;
  },
  'yesterday_get_total_pppp': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['korea_pppp'];
    var yesterday_val = Total_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_pppp'];

    //value2가 yester보다 클 경우
    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two
      document.getElementById("kr_color1").style.color = 'red';
      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
      document.getElementById("kr_color1").style.color = 'green';
      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },
  'get_korea_deaths': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['korea_deaths'];
    return value2;
  },
  'yesterday_get_korea_deaths': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['korea_deaths'];
    var yesterday_val = Total_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_deaths'];

    //value2가 yester보다 클 경우
    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two

        try {
              document.getElementById('kr_color2').style.color = "red";
            } catch (e) {
            } 
      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
              try {
              document.getElementById('kr_color2').style.color = "green";
            } catch (e) {
            } 
      
      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },
  'get_korea_recov': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['korea_recov'];
    return value2;
  },
  'yesterday_get_korea_recov': function() {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['korea_recov'];
    var yesterday_val = Total_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_recov'];

    //value2가 yester보다 클 경우
    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two
              try {
                document.getElementById("kr_color3").style.color = 'green';                
            } catch (e) {
            } 

      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
      document.getElementById("kr_color3").style.color = 'red';
      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },
  'get_korea_rea': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['korea_rea'];
    return value2 ;
  },
  'yesterday_get_korea_rea': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['korea_rea'];
    var yesterday_val = Total_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_rea'];
    //value2가 yester보다 클 경우
    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two
      document.getElementById("kr_color4").style.color = 'red';
      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
      document.getElementById("kr_color4").style.color = 'green';
      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },
  'get_korea_ing': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['korea_ing'];
    return value2 ;
  },
  'yesterday_get_korea_ing': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['korea_ing'];
    var yesterday_val = Total_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_ing'];
    //value2가 yester보다 클 경우
    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two
      document.getElementById("kr_color5").style.color = 'red';
      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
      document.getElementById("kr_color5").style.color = 'green';
      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },
  'get_korea_no': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['korea_no'];
    return value2 ;
  },
  'yesterday_get_korea_no': function(data) {
    var value1 = Total_korea.findOne({date : today});
    var value2 = value1 && value1['korea_no'];
    var yesterday_val = Total_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_no'];
    //value2가 yester보다 클 경우
    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two
      document.getElementById("kr_color6").style.color = 'green';
      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
      document.getElementById("kr_color6").style.color = 'red';
      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },

});

 // 단순 12345 숫자 형식을 콤마(,)로 찍어주면서 12,345 로 바꿔줌
 Template.registerHelper('number_format', function(num) {
    return num && num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
 })
