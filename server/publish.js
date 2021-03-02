import "../lib/collections";


//DB 스키마 collections 폴더에 등록하기
Meteor.publish('total_earth', function (cnt) {
  return Total_earth.find({}, { limit: cnt });
});

Meteor.publish('total_korea', function () {
  return Total_korea.find({});
});

Meteor.publish('area_korea', function () {
  return Area_korea.find({});
});

Meteor.publish('news', function () {
  return News_kr.find({});
});


