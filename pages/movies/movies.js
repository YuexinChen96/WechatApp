var app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    containerShow:true,
    searchPanelShow:false,
    searchResult: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var count = "?start=8&count=3";
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + count;
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + count;
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","Top250");
  },

  onMoreTap:function(event){
    var cate = event.currentTarget.dataset.cate;
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+cate,
    })
  },

  onMovieTap: function (event) {
    console.log(event);
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id='+movieId,
    })
  },

  getMovieListData: function (url, settedKey, cate_title){
    var that = this;
    wx.request({
      url: url,
      success: function (res) {
        that.processDoubanData(res.data, settedKey, cate_title);
      },
      fail: function () {

      }
    })
  },

  processDoubanData: function (moviesDouban, settedKey,cate_title){
    var movies = [];
    for(var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length >= 6){
        title = title.substring(0,6)+"...";
      }
      var temp = {
        title:title,
        avgstar: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    var readyData = {};
    readyData[settedKey] = {
      movies:movies,
      cate_title:cate_title
    };
    this.setData(readyData);
    //console.log(this.data);
  },

  onCancelImgTap:function(){
    this.setData({
      containerShow:true,
      searchPanelShow: false,
    })
  },

  onBindFocus:function(event){
    this.setData({
      containerShow: false,
      searchPanelShow: true,
    })
  },

  onBindChange: function(event){
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    //console.log(searchUrl);
    this.getMovieListData(searchUrl, "searchResult", "");

  },

  
})