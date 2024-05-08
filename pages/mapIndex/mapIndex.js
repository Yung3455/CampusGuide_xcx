//获取应用实例
var app = getApp();
Page({
  data: {
    longitude:114.215693,
    latitude:22.684418,
    fullscreen: false,
    windowHeight: "",
    windowWidth: "",
    isSelectedBuild: 0,
    scenerylistid: 0,
    islocation: true,
    scenery:{},
    sceneryList:"",
    mycomment:"",
    xz_longitude:0,
    xz_latitude:0,
    backgroundImg:"",
    ico:"",
    markers:{
      longitude:0,
      latitude:0,
    }
  },

  onLoad: function (event) {
    this.mapCtx=wx.createMapContext('myMap');
   this.mapCtx.addGroundOverlay({
    id: 0,
    src: "../img/uni.jpg",
    bounds: {
      southwest: { //西南角
        latitude: 22.67971,
        longitude: 114.2102,
      },
      northeast: { //东北角
        latitude: 22.68978,
        longitude: 114.22112,
      }
    },
    success(res){
      console.log('wp', res)
    },
    fail(err){
      console.log('wperr', err)
    }
  }) 
    wx.setNavigationBarTitle({
      title: "逛逛深信院"
    })

    //前后台交互  获得景点列表
    var that=this;
    wx.request({
			url: app.globalData.Url+`/wxstudent/wxsceneryList`,
			data: {},
			method: 'POST', 
			header:{'content-type':'application/x-www-form-urlencoded'},
			success: function (req) {
        var list=req.data
        that.setData({
          sceneryList:list,
        })
			},
    })
    
    //后台交互 获得景点
     var that=this;
     wx.request({
       url: app.globalData.Url+`/wxstudent/wxscenery`,
       data: {
        scenerylistid: this.data.scenerylistid,
        //  isSelectedBuild: this
       },
       method: 'POST', 
       header:{'content-type':'application/x-www-form-urlencoded'},
       success: function (req) {
         var list=req.data
         that.setData({
           scenery:list,
         })
       },
     })
   
    //分享功能
    wx.showShareMenu({
      withShareTicket: true
    })
    
    //获取当前设备宽度与高度，用于定位控键的位置
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      },
    })
  
    //获取目前位置
    wx.getLocation({
      "type":"gcj02",
      "altitude":"true",
      success:function(res){
         that.setData({
           xz_latitude:Number(res.latitude.toFixed(6)),
           xz_longitude:res.longitude.toFixed(6),        
         })
         //console.log("经度"+res.longitude.toFixed(6))
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
      backgroundImg:app.globalData.bgImgUrl+"/sxImage/",
      ico:app.globalData.bgImgUrl+"/sxImage/mapIco/"
    })
  },

  //导航栏换页
  changePage: function (event) {
    //获得景点列表的序号
    this.setData({
      scenerylistid: event.currentTarget.id,
      isSelectedBuild: this,
    });
    this.onLoad()
    
  },

  // 选中 其对应的框
  markertap(e) {
    
  },

  //跳转搜索页面
  navigateSearch() {
    wx.navigateTo({
      url: "../search/search?xz_latitude="+this.data.xz_latitude+"&xz_longitude="+this.data.xz_longitude
    })
  },
  //跳转规划页面
  navigateLocation() {
    wx.navigateTo({
        url: "../map/map?xz_latitude="+this.data.xz_latitude+"&xz_longitude="+this.data.xz_longitude
      })
  },

  //控制所有关于点击对象的信息
  clickButton: function (e) {
    this.setData({ fullscreen: !this.data.fullscreen })
  },

  //分享功能
  onShareAppMessage: function (res) {
      var title, path;
      if (this.data.introduce){
        title = '校园导览';
        path = "/pages/index/index";
      } else {
        title = this.data.building.name + ' - ' +  '校园导览'
        path = "/pages/index/index";
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