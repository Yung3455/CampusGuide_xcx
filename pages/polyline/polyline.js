var app = getApp();
//路程、方向 工具
var utils=require("../utils.js")
Page({
  data: {
    markers: {
      longitude:0,
      latitude:0,
    }, 
    polyline:{
      points:[{latitude:22.689048, longitude:114.219379},{latitude:22.685174, longitude:114.212898}],
      color:"#000",
    },
    xz_longitude:"114.215693",
    xz_latitude:"22.684418",
    juli:null,
    fangxiang:null,
    mb_longitude:0,
    mb_latitude:0,
    mb_name:null,
    mb_floor:null,
  },
  //获取当前坐标并标记maerkes
  onLoad: function (options) {
    var that=this;
    wx.getLocation({
      type:"gcj02",
      altitude:"true",
      success:function(res){
         that.setData({
          polyline:[{
            points:[{latitude:that.data.xz_latitude, longitude:that.data.xz_longitude},
              {latitude:that.data.mb_latitude, longitude:that.data.mb_longitude}],
            color:"#ff0000",
            width:5
          }],
          markers:[
            {
            id:0,
            latitude:res.latitude,
            longitude:res.longitude,
            iconPath:app.globalData.bgImgUrl+"/sxImage/mapIco/start.png",
            width:30,
            height:30,
            callout:{
              content:"当前位置",
              color:"#000",
              fontSize:13,
              borderRadius:5,
              borderWidth:1,
              borderColor:"#000",
              padding:2,
              display:"ALWAYS"
            },
            },
            {
            id:1,
            latitude:that.data.mb_latitude,
            longitude:that.data.mb_longitude,
            iconPath:app.globalData.bgImgUrl+"/sxImage/mapIco/end.png",
            width:30,
            height:30,
            callout:{
              content:"目的地",
              color:"#000",
              fontSize:13,
              borderRadius:5,
              borderWidth:1,
              borderColor:"#000",
              padding:2,
              display:"ALWAYS"
            },
            },
          ]         
         })
        },
      fail:function(){
        wx.showToast({
          title: '网络繁忙！',
          icon:'loading',
          duration:2000
        });
      },
    })
    this.mapCtx=wx.createMapContext('map');
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

    this.setData({
      mb_longitude:options.longitude,
      mb_latitude:options.latitude,
      mb_name:options.name,
      mb_floor:options.floor,
      xz_latitude:options.xz_latitude,
      xz_longitude:options.xz_longitude,
    });
    this.juli();
   },
  
 
  //计算距离
  juli:function(){
    //目标经度，目标纬度，当前经度，当前纬度
    // var fangxiang=utils.getDirection(this.data.xz_longitude,this.data.xz_latitude,this.data.mb_longitude,this.data.mb_latitude);
    var fangxiang=utils.getDirection(this.data.xz_latitude,this.data.xz_longitude,this.data.mb_latitude,this.data.mb_longitude);
    //目标经度，目标纬度，当前经度，当前纬度
    var juli=Math.floor(utils.GetDistance(this.data.mb_longitude,this.data.mb_latitude,this.data.xz_longitude,this.data.xz_latitude));
    this.setData({
      juli:juli,
      fangxiang:fangxiang,
    });
  },
     /**选择定位 */
  click: function (res) {
      var that=this;
      var plugin=requirePlugin('routePlan');
      var key = 'DFQBZ-UAOLD-AXH4J-HXVRR-RDW5E-GHF4A';  //使用在腾讯位置服务申请的key
      var referer = 'sziitGuider';   //调用插件的app的名称
      var themeColor = '#7B68EE';  //主题颜色
      var endPoint = JSON.stringify({
        'name':that.data.mb_name,
        'latitude':that.data.mb_latitude,
        'longitude':that.data.mb_longitude
      });
      var startPoint = JSON.stringify({
        'name':'我的位置',
        'latitude':that.data.xz_latitude,
        'longitude':that.data.xz_longitude
      });
      wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer +'&endPoint=' + endPoint  + '&startPoint='+ startPoint + '&themeColor=' + themeColor
    });
    // wx.openLocation({
    //   type:"wgs84",
    //   //type:"gcj02",
    //   latitude: Number(this.data.mb_latitude),
    //   longitude: Number(this.data.mb_longitude),
    //   scale: 18,
    //   name: this.data.mb_name,
    //   address:this.data.mb_floor,
    // })
    // console.log("la:"+this.data.mb_latitude)
  },
   /**视野变化 点击选择地点 */
  move:function(res){
    console.log(res);
    let index_lat="markersa[0].latitude";
    let index_lng="markersa[0].longitude";
    this.setData({
      [index_lat]:res.detail.latitude,
      [index_lng]:res.detail.longitude,
    })
  },
})  