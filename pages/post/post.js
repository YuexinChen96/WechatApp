// pages/post/post.js
var post_data = require('../../data/post-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ post_key: post_data.postList})
  },
  onPostLeague:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url:"post-league/post-league?id=" + postId
    })
  },
  onSwiperTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "post-league/post-league?id=" + postId
    })
  }
})