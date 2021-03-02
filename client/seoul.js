
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
// import 'tui-chart/dist/tui-chart.min.css';
// import chart from 'tui-chart';
// import "../lib/countryNameToCode";
// import 'tui-chart/maps/world';
// import 'tui-chart/maps/south-korea';


import "../lib/vendor/bootstrap/css/bootstrap.min.css";
import "./bg.css";
import "./seoul.html";

// import "popper.js";
// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";


Template.서울.onCreated(function() {
  // Session.set("cnt", 6);
  today = moment((new Date()).getTime()).startOf('day').format('YYYY-MM-DD');
  yesterday = moment((new Date()).getTime()).subtract(1, 'd').startOf('day').format('YYYY-MM-DD');


  var self = this;
  self.autorun(function() {
    self.subscribe("area_korea"); // public
    handle = self.subscribe('area_korea');
    self.subscribe('total_korea');

  })

});

Template.서울.onRendered(function() {
  // this.$('.carousel').carousel();
  var self = this;
  // var check = 0;
  self.autorun(function() {
     if (handle.ready()) {
      // self.$('.seoul_').hide();
      // if (check == 0){
          // item = document.getElementsByClassName("seoul_");
          // console.log(item.length)
      var aaaarrrr = Total_korea.findOne({date : today});

      // check =1;
      // }
     }
  })
});






Template.서울.events({
  //동선자 전체 열기 닫기
  "click #btn": function(event, template) {
    template.$(".seoul_").show();

  },
  "click #btn2": function(event, template) {
    template.$(".seoul_").hide();
  },

  "keyup #search": function(event, template) {
        var value, item, i;

        item_연번 = document.getElementsByClassName("seoul_연번");
        item_인적사항 = document.getElementsByClassName("seoul_인적사항");
        item_감염경로 = document.getElementsByClassName("seoul_감염경로");
        item_확진일 = document.getElementsByClassName("seoul_확진일");
        item_거주지 = document.getElementsByClassName("seoul_거주지");
        item_격리시설 = document.getElementsByClassName("seoul_격리시설");

        value = document.getElementById("search").value.toUpperCase();
        item = document.getElementsByClassName("seoul_");
        sr = document.getElementById("search_result");

        var kr_cty = Area_korea.findOne({date : today});
        var korea_cty = kr_cty && kr_cty['seoul'];

        // for(p=0;p<korea_cty.length;p++){
        //     item_연번[p].style.display = "none";
        //     item_인적사항[p].style.display = "none";
        //     item_감염경로[p].style.display = "none";
        //     item_확진일[p].style.display = "none";
        //     item_거주지[p].style.display = "none";
        //     item_격리시설[p].style.display = "none";   
        // }

        ct = 0;
        for(i=0;i<item.length;i++){
          if(item[i].innerHTML.toUpperCase().indexOf(value) > -1){
            item[i].style.display = "table-cell";
            item[i].style.background = "#ddd06a";

            // for(l=0;l<korea_cty.length;l++){
            //   for(ll=0;ll<korea_cty[l]['동선'].length;ll++){
            //     if (korea_cty[l]['동선'][ll] == item[i].innerHTML.replace("&nbsp;"," ")){
            //         item_연번[l].style.display = "table-cell";
            //         item_인적사항[l].style.display = "table-cell";
            //         item_감염경로[l].style.display = "table-cell";
            //         item_확진일[l].style.display = "table-cell";
            //         item_거주지[l].style.display = "table-cell";
            //         item_격리시설[l].style.display = "table-cell";
            //     }
            //   }
            // }
            
            ct = ct+1
          }else{
            item[i].style.display = "none";
            item[i].style.background = "#e3f2fd";
          }
          if (value.length == 0){
            item[i].style.display = "none";
            item[i].style.background = "#e3f2fd";
            ct = 0
          }

        }
        if (ct >= 1){
          sr.style.color = "green";
          sr.style.width = "150px";
          sr.innerHTML = "<B> 검색 결과 :   "+ct+"개 찾음</B>";
        }else if (ct == 0){
          sr.style.color = "red";
          sr.innerHTML = "<B>찾지 못함</B>";
        }
        ct =0;
  }

  // "click #sseoul": function(event,template){
  //   alert("업데이트 중입니다.")
  // }
  // "click #value": function(event,template){
  //   alert("aa")
  // }


});


    // function insertHTML(efef){
    //           var strHTML=
    //           "<td  width='200px' style='vertical-align:middle; text-align:center'><B>22</B></td>"
    //           objImg.innerHTML = strHTML;

    //           // "<td  width='200px'style='vertical-align:middle; text-align:center'>33</td>" 

    //           var strHTML2=
    //           "<td id=objImg2></td>"  
    //           objImg.innerHTML= strHTML2;

    //           var strHTML3= 
    //           "<td  width='200px' style='vertical-align:middle; text-align:center'><B>55</B></td>"
    //           objImg2.innerHTML= strHTML3;




    // }

var bbb22 = [];

Template.서울.helpers({
  'seoul_status': function() {
    var cott = 0
    var result = [];
    var sortingField = "value";
    var kr_cty = Area_korea.findOne({date : today});

    var korea_cty = kr_cty && kr_cty['seoul'];
      for (var key in korea_cty){
        result.push({name:key,value:korea_cty[key],body:korea_cty[key]['동선']});
    }
  

    // console.log(result_t)
    // document.getElementsByClassName('seoul_').hide();
    // style.visibility = "hidden";

    // 내림차순
    result.sort(function(a, b) { 
    return b[sortingField] - a[sortingField];
    });
    return result ;
  },
  'seoul_status_tt': function(data) {
    var result = []
    for (var key in data){
      result.push({name:key,value:data[key]});
    }
    // console.log(result)
    return result
  },
  'date_slice':function(date){
    return moment(date).format('YYYY-MM-DD')
  },

  'all_people': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_inf'];
    var value3 = value1 && value1['korea_area_dt'];
    var value4 = value1 && value1['korea_area_rec'];

    return Number(value2&&value2["서울"])
  },
  'inf': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_inf'];
    return Number(value2&&value2['서울']) 
  },
  'dt': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_dt'];
    return Number(value2&&value2['서울']);
  },
  'rec': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_rec'];
    return Number(value2&&value2['서울']);
  },
  'rea': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_rea'];
    return Number(value2&&value2['서울']);
  },
  'ing': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_ing'];
    return Number(value2&&value2['서울']);
  },
  'no': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_no'];
    return Number(value2&&value2['서울']);
  },
  'self_inf': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_self_inf'];
    return Number(value2&&value2['서울']);
  },
  'self_ing': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_self_ing'];
    return Number(value2&&value2['서울']);
  },
  'self_no': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_self_no'];
    return Number(value2&&value2['서울']);
  },

  'yes_inf': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_inf'];
    var value2 = Number(value2 && value2['서울']);

    var yesterday_val = Area_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_area_inf'];
    var yesterday_val2 = yesterday_val2 && yesterday_val2['서울'];

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
  'yes_dt': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_dt'];
    var value2 = Number(value2 && value2['서울']);

    var yesterday_val = Area_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_area_dt'];
    var yesterday_val2 = yesterday_val2 && yesterday_val2['서울'];

    //value2가 yester보다 클 경우
    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two
      document.getElementById("kr_color2").style.color = 'red';
      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
      document.getElementById("kr_color2").style.color = 'green';
      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },
  'yes_rec': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_rec'];
    var value2 = Number(value2 && value2['서울']);

    var yesterday_val = Area_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_area_rec'];
    var yesterday_val2 = yesterday_val2 && yesterday_val2['서울'];


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
                                try {
      document.getElementById("kr_color3").style.color = 'red';
            } catch (e) {
            } 

      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },
  'yes_rea': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_rea'];
    var value2 = Number(value2 && value2['서울']);

    var yesterday_val = Area_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_area_rea'];
    var yesterday_val2 = yesterday_val2 && yesterday_val2['서울'];

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
  'yes_ing': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_ing'];
    var value2 = Number(value2 && value2['서울']);

    var yesterday_val = Area_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_area_ing'];
    var yesterday_val2 = yesterday_val2 && yesterday_val2['서울'];

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
  'yes_no': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_no'];
    var value2 = Number(value2 && value2['서울']);

    var yesterday_val = Area_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_area_no'];
    var yesterday_val2 = yesterday_val2 && yesterday_val2['서울'];

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
  'yes_self_inf': function(data) {

    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_self_inf'];
    var value2 = Number(value2 && value2['서울']);

    var yesterday_val = Area_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_area_self_inf'];
    var yesterday_val2 = yesterday_val2 && yesterday_val2['서울'];

    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two
                    try {
                            document.getElementById("kr_color7").style.color = 'red';
            } catch (e) {
            } 

      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
                     try {
                            document.getElementById("kr_color7").style.color = 'green';
            } catch (e) {
            } 

      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },
  'yes_self_ing': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_self_ing'];
    var value2 = Number(value2 && value2['서울']);

    var yesterday_val = Area_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_area_self_ing'];
    var yesterday_val2 = yesterday_val2 && yesterday_val2['서울'];

    //value2가 yester보다 클 경우
    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two
                          try {
                            document.getElementById("kr_color8").style.color = 'red';
            } catch (e) {
            } 
      
      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
                                try {
                            document.getElementById("kr_color8").style.color = 'green';
            } catch (e) {
            } 
     
      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  },
  'yes_self_no': function(data) {
    var value1 = Area_korea.findOne({date : today});
    var value2 = value1 && value1['korea_area_self_no'];
    var value2 = Number(value2 && value2['서울']);

    var yesterday_val = Area_korea.findOne({date : yesterday});
    var yesterday_val2 = yesterday_val && yesterday_val['korea_area_self_no'];
    var yesterday_val2 = yesterday_val2 && yesterday_val2['서울'];

    //value2가 yester보다 클 경우
    if (value2 > yesterday_val2){
      var first = value2
      var two = yesterday_val2
      result = first - two
                                      try {
                            document.getElementById("kr_color9").style.color = 'green';
            } catch (e) {
            } 
      
      result = "(+"+result+"명)"
    }else if (yesterday_val2 > value2){
      var first = yesterday_val2
      var two = value2
      result = first - two
                                            try {
                            document.getElementById("kr_color9").style.color = 'red';
            } catch (e) {
            } 
      
      result = "(-"+result+"명)"
    }else{
       result = "(-)"
    }
    return result;
  }

});

 // 단순 12345 숫자 형식을 콤마(,)로 찍어주면서 12,345 로 바꿔줌
 Template.registerHelper('number_format', function(num) {
    return num && num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
 })


