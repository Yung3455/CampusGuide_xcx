// pages/map/map.js
var amapFile = require('../../src/js/amap-wx.js');
const uilt = require('../../utils/utils.js');
Page({
  ...(uilt.getShareInfo({ title: '路线规划', path: '/pages/map/map' })),
  data: {
    key: '9c858c4388348a5fb7f78e2c656a7823',
    show: false,
    currentLo : null,
    currentLa : null,
    newCurrentLo : null,
    newCurrentLa : null,
    distance : 0,
    duration : 0,
    markers : null,
    scale: 16,
    polyline: null,
    statusType: 'car',
    includePoints:[]
  },
  onLoad(op){
    this.setData({
      latitude:op.xz_latitude,
      longitude:op.xz_longitude
    })
    var _this = this;
    wx.getLocation({
      type:"gcj02",
      altitude:"true",
      success(res){
        _this.setData({ 
          // currentLo: res.longitude, 
          // currentLa: res.latitude,
          currentLa:op.xz_latitude,
          currentLo:op.xz_longitude,
          includePoints: [{
            longitude: res.longitude,
            latitude: res.latitude
          }],
          markers: [{
            id: 0,
            longitude: res.longitude,
            latitude: res.latitude,
            title: res.address,
            iconPath: 'https://rattenking.gitee.io/stone/images/wx/images/navi_s.png',
            width: 32,
            height: 32
          }]
        });
      }
    })
  },
  getAddress(e){
    var _this = this;
    wx.chooseLocation({
      success(res){
        var markers = _this.data.markers;
        markers.push({
          id: 0,
          longitude: res.longitude,
          latitude: res.latitude,
          title: res.address,
          iconPath: 'https://rattenking.gitee.io/stone/images/wx/images/navi_e.png',
          width: 32,
          height: 32
        });

        var points = _this.data.includePoints;
        points.push({
          longitude: res.longitude,
          latitude: res.latitude
        });
        _this.setData({
          newCurrentLo: res.longitude,
          newCurrentLa: res.latitude,
          includePoints: points,
          markers: markers,
          show:true
        });
        _this.getPolyline(_this.data.statusType);
      }
    });
  },
  drawPolyline(self,color){
    return {
      origin: this.data.currentLo + ',' + this.data.currentLa,
      destination: this.data.newCurrentLo + ',' + this.data.newCurrentLa,
      success(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        self.setData({
          distance: data.paths[0].distance,
          duration: parseInt(data.paths[0].duration/60),
          polyline: [{
            points: points,
            color: color,
            width: 6,
            arrowLine: true
          }]
        });
      }
    }
  },
  getPolyline(_type){
    var amap = new amapFile.AMapWX({ key: this.data.key });
    var self = this;
    switch (_type){
      case 'car':
        amap.getDrivingRoute(this.drawPolyline(this,"#0091ff"));
        break;
      case 'walk':
        amap.getWalkingRoute(this.drawPolyline(this, "#1afa29"));
        break;
      case 'ride':
        amap.getRidingRoute(this.drawPolyline(this, "#1296db"));
        break;
      default:
        return false;
    }
  },
  goTo(e){
    var _type = e.currentTarget.dataset.type;
    this.setData({statusType : _type});
    this.getPolyline(_type);
  }
})