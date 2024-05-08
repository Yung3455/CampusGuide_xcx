var app=getApp();
Page({
  data: {
    userid:"",
    slCollegeid:"",
    collegename:"",
    college:null,
    collegeLength:2,
    array:['无','软件学院','电子与通信学院','计算机学院','数字媒体学院','智能制造与装备学院','交通与环境学院','管理学院','财经学院','应用外语学院','中德机器人学院','继续教育学院'],
    objectArray: [{
      id: 0,
      name: '无'
    }, {
      id: 1,
      name: '软件学院'
    },{
      id: 2,
      name: '电子与通信学院'
    },{
      id: 3,
      name: '计算机学院'
    },{
      id: 4,
      name: '数字媒体学院'
    },{
      id: 5,
      name: '智能制造与装备学院'
    },{
      id: 6,
      name: '交通与环境学院'
    },{
      id: 7,
      name: '管理学院'
    },{
      id: 8,
      name: '财经学院'
    },{
      id: 9,
      name: '应用外语学院'
    },{
      id: 10,
      name: '中德机器人学院'
    },{
      id: 11,
      name: '继续教育学院'
    }],
  },
  onLoad: function (options) {
    var that=this;
    var userid=options.userid;   
    wx.request({
			url: app.globalData.Url+'/wxstudent/wxGetCollegeName',
			data:{
        collegeid:options.collegeid
			},
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(req){
				var list=req.data;
        that.setData({
          collegename:list[0].collegename,
          userid:userid
        })
      }
    })
  
    wx.request({
			url: app.globalData.Url+'/wxstudent/wxGetCollege',
			data:{},
      method:'POST',
      header:{ 'content-type':'application/x-www-form-urlencoded' },
      success:function(req){
        var list=req.data;
        //console.log("xueyuan:"+list[1].collegename)
        that.setData({
          college:list,
          collegeLength:list.length
        })
      }
    })

  },
  //学院选择器
  bindCollegeChange: function (e) {
    var that = this;
    that.setData({
      index: e.detail.value,
    })
  },

  updateCollege: function () {
    var that=this;
    var indexC=that.data.index;
    wx.request({
			url: app.globalData.Url+'/wxstudent/wxUpdateCollege',
			data:{
        userid:this.data.userid,
        collegeid:this.data.slCollegeid
      },
      method:'POST',
      header:{ 'content-type':'application/x-www-form-urlencoded' },
      success:function(){
        that.setData({
          slCollegeid:indexC
        });
        wx.showToast({
          title: '修改成功',
          icon:'success',
          duration:2000
        });
        // console.log(that.data.collegeid)
      }
    })
  },
})