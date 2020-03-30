var app = getApp();
var util = require('../../../utils/util.js');

Page({

  data: {
    navigateTitle: "",
    movies: {},
    requestUrl: "",
    totalCount: 0,
    isEmpty: true
  },

  onLoad: function(options) {
    var cate = options.category;
    this.data.navigateTitle = cate;
    //console.log(cate); 
    var dataUrl = "";
    switch (cate) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);
    // console.log(this.data)
  },

  onReachBottom:function(event){
    var nextUrl = this.data.requestUrl+"?start="+this.data.totalCount+"&count=20";
    util.http(nextUrl,this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  onPullDownRefresh:function(event){
    var start = Math.random();
    start = (start * 30).toString().substring(0,2);
    var refreshUrl = this.data.requestUrl+"?start="+start+"&count=20";
    this.data.movies={};
    this.data.isEmpty = true;
    this.data.totalCount = parseInt(start);
    util.http(refreshUrl,this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  processDoubanData: function(moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        avgstar: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    var totalMovies = {};
    this.data.totalCount+=20;
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    console.log(totalMovies);
    this.setData({
      movies: totalMovies
    });
    wx.hideNavigationBarLoading(); 
    wx.stopPullDownRefresh();
  },



  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },

  onMovieTap: function (event) {
    console.log(event);
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId,
    })
  },
})