var postData = require('../../../data/post-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;
    var post_Data = postData.postList[postId];
    this.setData(post_Data);
    var postLike = wx.getStorageSync('liked');
    if (postLike) {
      var postLike = postLike[postId];
      if (postLike) {
        this.setData({
          like_state: postLike
        })
      }
    } else {
      var postLike = {}
      postLike[postId] = false;
      wx.setStorageSync('liked', postLike)
    }
  },

  onLikeTap: function(event) {
    var like_ = wx.getStorageSync('liked');
    var temp_state = !(like_[this.data.postId]);
    like_[this.data.postId] = temp_state;
    //ShowToast method
    wx.setStorageSync('liked', like_);
    this.setData({
      like_state: temp_state
    })
    wx.showToast({
      title: temp_state ? '加入阵营' : '退出阵营',
      duration: 1000
    })
    //showModel method
    var that = this;
    // wx.showModal({
    //   title: '阵营',
    //   content:temp_state? '是否加入阵营':'是否退出阵营',
    //   showCancel: true,
    //   cancelText: '取消',
    //   cancelColor: "#333",
    //   confirmText:temp_state? '加入':'退出',
    //   success:function(res){
    //     if(res.confirm){
    //       wx.setStorageSync('liked', like_);
    //       that.setData({
    //         like_state: temp_state
    //       })
    //     }
    //   }
    // })
  },

  onShareTap: function(event) {
    var itemList = ["分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '是否' + itemList[res.tapIndex] + ' ?',
        })
      }
    })
  },

  onMusicTap: function(event) {
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = '此时此刻';
    backgroundAudioManager.epname = '此时此刻';
    backgroundAudioManager.singer = '许巍';
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000';
    // 设置了 src 之后会自动播放
    console.log("here");
    backgroundAudioManager.src ='http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38';
    console.log(backgroundAudioManager);
    backgroundAudioManager.play();
    console.log(backgroundAudioManager);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})