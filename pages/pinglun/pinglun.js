var timeutil=require("../nowTimeutil.js");
var filter=require("../filter.js");
var app = getApp();
Page(filter.loginCheck({
  data: {
    msgData:[],
    inputVal:"",
    sceneryid:"",
    nowtime:"",
    grade:"",
    mycomment:null,
  }, 
    
  onLoad: function (options) { 
    this.setData({
      sceneryid: options.id,
      grade:options.grade,
      nowtime:timeutil.formatTime(new Date()),
      mycomment:options.mycomment,
    });

    wx.setNavigationBarTitle({
      title: options.title+"评语"
    });    
   
    //准备从后台拿去评论内容公布在评论区，按景点id区分
    var that=this; 
    wx.request({
      url: app.globalData.Url+`/wxstudent/wxSelectComment`,
      data: {
        sceneryid: this.data.sceneryid,
      },
      method: 'POST', 
      header:{'content-type':'application/x-www-form-urlencoded'},
      success: function (req) {
        var list=req.data
        that.setData({
          msgData:list,
        })
      },
    })
  },

  //获得输入框里的值
  changeInputValue(e){
    this.setData({
      inputVal:e.detail.value
    }) 
  },

  //添加留言
  addMsg(){
    var list = this.data.msgData;
    //获得的值给list缓存
    list.push({
      msg:this.data.inputVal
    });

    wx.request({
      url: app.globalData.Url+`/wxstudent/wxInsertComment`,
      data: {
        content: this.data.inputVal,
        studentid:wx.getStorageSync('USERID'),
        sceneryid: this.data.sceneryid,
        nowtime:this.data.nowtime,
        grade:this.data.grade,
      },
      method: 'POST', 
      header:{'content-type':'application/x-www-form-urlencoded;charset=utf-8'},
      success: function () {
        wx.showToast({
          title: '等待审核',
          icon:'success',
          duration:2000
        });
      },
    }) 
    //把缓存值给msgData并清空输入框
    this.setData({
      msgData:list,
      inputVal:''
    }); 
  },

  //删除留言
  DelMsg(ev){
    var n=ev.target.dataset.index;
    var list = this.data.msgData;
    list.splice(n,1);
    this.setData({
      msgData:list
    });
  },
  }))