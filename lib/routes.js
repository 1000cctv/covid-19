
FlowRouter.route("/bb", {
  name: "pageWebsite",
  //body 새로 정의
  action: function (params, queryParams) {
      $("body").scrollTop(0);
      BlazeLayout.render("bgmain", { main: "pageWebsite" });
  }
});

FlowRouter.route("/", {
  name: "반응형 첫번째", 
  //body 새로 정의
  action: function (params, queryParams) {
      $("body").scrollTop(0);
      BlazeLayout.render("bgmain", { main: "반응형" });
  }
});

FlowRouter.route("/seoul", {
  name: "반응형 서울", 
  //body 새로 정의
  action: function (params, queryParams) {
      $("body").scrollTop(0);
      BlazeLayout.render("bgmain", { main: "서울" });
  }
});

FlowRouter.route("/new_s", {
  name: "반응형 뉴스", 
  //body 새로 정의
  action: function (params, queryParams) {
      $("body").scrollTop(0);
      BlazeLayout.render("bgmain", { main: "news_kr" });
  }
});

FlowRouter.route("/ytb", {
  name: "반응형 유튜브", 
  //body 새로 정의
  action: function (params, queryParams) {
      $("body").scrollTop(0);
      BlazeLayout.render("bgmain", { main: "youtube_kr" });
  }
});

FlowRouter.route("/seoul_s", {
  name: "반응형 서울_선별진료소", 
  //body 새로 정의
  action: function (params, queryParams) {
      $("body").scrollTop(0);
      BlazeLayout.render("bgmain", { main: "서울_선별진료소" });
  }
});

