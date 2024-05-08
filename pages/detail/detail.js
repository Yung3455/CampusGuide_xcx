const app = getApp();
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
Page({
  data: {
    channels:[
      {"title":"深圳信息职业技术学院","playUrl":"http://192.168.1.106:8080/sxImage/introd.mp4"}
    ],
    id:"",
    grade:"",
    title: "",
    description:"",
    xiaoxun:"",
    tximg:"",
    floor:"",
    longitude:null,
    latitude:null,
    indexPar:"",
    imgpath:"pages/img/",
    zhanshi:true,
    xz_longitude:0,
    xz_latitude:0,
    T:"",
    video:"",
    img:"",
    backgroundImg:"",
    ico:"",
    content: '',//内容
    src:'', //
    touched:0,
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    var that=this;
    wx.request({
      url: app.globalData.Url+`/wxstudent/wxsceneryapplets`,
      data:{ },
      method: 'POST', 
      header:{'content-type':'application/x-www-form-urlencoded'},
      success: function (req) {
        var list=req.data
        that.setData({
          indexPar:list[0],
          zhanshi:list[0].mycomment,
        })
      },
    })

    wx.setNavigationBarTitle({
      title: options.title+"简介"
    })

    //获取目前位置
    wx.getLocation({
          "type":"gcj02",
          "altitude":"true",
          success:function(res){
             that.setData({
               xz_latitude:Number(res.latitude),
               xz_longitude:Number(res.longitude),        
             });
             console.log("经度"+res.longitude)
            },
          fail:function(){
            wx.showToast({
              title: '网络繁忙！',
              icon:'loading',
              duration:2000
            });
          },
        }) 
   
    this.setData({
      id:options.id,
      grade:options.grade,
      title: options.title, 
      description: options.description,
      xiaoxun:options.xiaoxun,
      floor:options.floor,
      tximg:options.tximg,
      longitude:options.longitude,
      latitude: options.latitude,
      // zhanshi:options.zhanshi,
      xz_longitude:options.xz_longitude,
      xz_latitude:options.xz_latitude,
      T:options.T,
      video:options.video,
      img:options.img,
      backgroundImg:app.globalData.bgImgUrl+"/sxImage/",
      ico:app.globalData.bgImgUrl+"/sxImage/mapIco/",
    });
  },
  onReady(e) {
    //创建内部 audio 上下文 InnerAudioContext 对象。
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError(function (res) {
      console.log(res);
      wx.showToast({
        title: '语音播放失败',
        icon: 'none',
      })
    }) 
  },

  // 文字转语音
  wordYun:function (e) {
    if(this.data.touched==0){
      var that = this;
      var content = this.data.description;
      plugin.textToSpeech({
        lang: "zh_CN",
        tts: true,
        content: content,
        success: function (res) {
          that.setData({
            src: res.filename
          })
          that.yuyinPlay();
        },
        fail: function (res) {
          console.log("fail tts", res)
        }
      })  
    }else{
      this.end()
    }
  },
  
  //播放语音
  yuyinPlay: function (e) {
    if (this.data.src == '') {
      console.log(暂无语音);
      return;
    }
    this.innerAudioContext.src = this.data.src //设置音频地址
    this.innerAudioContext.play(); //播放音频
    var that = this;
    that.setData({
      touched:this.data.touched=this.data.touched+1
    })
  },
 
  // 结束语音
  end: function (e) {
    this.innerAudioContext.pause();//暂停音频
    this.setData({
      touched:this.data.touched=this.data.touched-1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var title, path;
    if (this.data.introduce){
      title = app.globalData.introduce.name + '校园导览';
      path = "/pages/map/details";
    } else {
      title = this.data.building.name + ' - ' + app.globalData.introduce.name + '校园导览'
      path = "/pages/map/details?tid=" + this.data.tid + "&bid=" + this.data.bid
    }
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: title,
      path: path,
      imageUrl: app.imgCDN + this.data.building.img[0],
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})