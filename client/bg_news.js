
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import "../lib/countryNameToCode";
import "../lib/vendor/bootstrap/css/bootstrap.min.css";
import "./bg.css";
import "./bg_news.html";

// import "popper.js";
// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";


Template.news_kr.onCreated(function() {
  // Session.set("cnt", 6);
  today = moment((new Date()).getTime()).startOf('day').format('YYYY-MM-DD');
  yesterday = moment((new Date()).getTime()).subtract(1, 'd').startOf('day').format('YYYY-MM-DD');

  var self = this;
  self.autorun(function() {
    //self.subscribe("news"); // public
    handle = self.subscribe('news');
  })

});

Template.news_kr.onRendered(function() {
  // this.$('.carousel').carousel();

      // day_ct = 0
      // do {
      //     insertHTML(day_ct)
      //         day_ct+=1;
      // }while (day_ct < 7);
  //동선 기본 닫기

  var self = this;
  var check = 0;
  self.autorun(function() {
     if (handle.ready()) {
      if (check == 0){
        var today_News = News_kr.findOne({date : today});

      check =1;
      }
     }
  })
});


Template.news_kr.events({
  //동선자 전체 열기 닫기
  // "click #btn": function(event, template) {
  //   template.$(".seoul_").show();
  // },
  // "click #btn2": function(event, template) {
  //   template.$(".seoul_").hide();
  // },
  // "click #sseoul": function(event,template){
  //   alert("업데이트 중입니다.")
  // }
});




Template.news_kr.helpers({
  'news_status': function() {
    var cott = 0
    var result = [];
    var sortingField = "value";
    var kr_cty = News_kr.findOne({date : today});
    var result_t = [];

    var korea_cty = kr_cty && kr_cty['naver_news'];
      for (var key in korea_cty){
        result.push({name:key,value:korea_cty[key]});
    }
    return result ;
    // console.log(result[0]['value'])
    // console.log(result[0]['value']['이미지링크'])

// $("#img_form_url").attr("src", imgurl);


    // 내림차순
    // result.sort(function(a, b) { 
    // return b[sortingField] - a[sortingField];
    // });

  }

});

 // 단순 12345 숫자 형식을 콤마(,)로 찍어주면서 12,345 로 바꿔줌
 Template.registerHelper('number_format', function(num) {
    return num && num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
 })


//********************************************************************************************************

