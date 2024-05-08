// app.js
var config = require("/pages/xtxy.js")
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  globalData: {
    userInfo: null,
    map: null,
    introduce: null,
    latitude: null,
    longitude: null,  
    
    //192.168.1.108
    Url:'http://192.168.1.110:8080/guide_war_exploded',
    bgImgUrl:'http://192.168.1.110:8080',

    //192.168.43.19
    // Url:'http://192.168.43.19:8080/guide_war_exploded',
    // bgImgUrl:'http://192.168.43.19:8080',

    // Url:'http://172.3.13.142:8080/guide_war_exploded',
    // bgImgUrl:'http://172.3.13.142:8080',


    // Url:'http://localhost:8080/guide_war_exploded',
    // bgImgUrl:'http://localhost:8080',

  }
})
