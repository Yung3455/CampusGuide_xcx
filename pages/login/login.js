var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var timeutil=require("../nowTimeutil.js");
const util = require('../../utils/util.js');
var app=getApp();
//注册日期的数据类型转换（插入到数据库）
Page({
  data: {
    user:"",//用来判断是否跳转到用户中心

    //顶头
    tabs: ["登陆", "注册"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    //登陆部分
    telnumber: '',
		password: '',
    username:"",  
    userid:"",
    isError: false,
    errorText: '',
    
    //未知
		collegeid:"", //院系
		birthyear:"",  //生日
		studentimg:"",  //头像
		sex:"",  //性别

    //验证码部分
    code: "", 
    makecode:"",

    //注册
    nowtime:"",
    grade:"",  //注册时间
    repassword:"",
    zcusername:"",
    zcsex:"",
    zccollege:"",
    zcbirthyear:"",
    array:['男','女'],
    collegeArr:['无','软件学院','电子与通信学院','计算机学院','数字媒体学院','智能制造与装备学院','交通与环境学院','管理学院','财经学院','应用外语学院','中德机器人学院','继续教育学院'],
  },
  onLoad: function () {
    //执行验证码生成器
    this.createCode(); 
    //生成当前日期，进行注册
    this.setData({
      nowtime:timeutil.formatTime(new Date())
    })
    //console.log(this.data.nowtime);
    var curDate = new Date();
    var year = curDate.getFullYear();
    var month = curDate.getMonth() + 1;
    var day = curDate.getDate();

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  // 验证码验证 成功后注册 
  register: function(){ 
    if(this.data.makecode == this.data.code && this.data.password == this.data.repassword){
      wx.request({
        url: app.globalData.Url+'/wxstudent/wxRegister',
        data: {
          username: this.data.zcusername,
          sex: this.data.zcsex,
          collegeid:this.data.zccollege,
          birthyear: this.data.zcbirthyear,
          password: this.data.password,
          telnumber: this.data.telnumber,
          grade:this.data.nowtime,
        },
        method:'POST',
        header:{ 'content-type':'application/x-www-form-urlencoded' },
        success:function(req){
          var list=req.data;
          console.log(req.data)
          if(list==1){
            wx.showToast({
              title: '注册成功！',
              icon:'success',
              duration:1500 //提示的延迟的时间
            }),
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }else{
            wx.showToast({
              title: '啊哦，出错啦，请稍后重试',
              icon:'false',
              duration:1500 //提示的延迟的时间
            })
          }
        }
      })
    }else{
      if(this.data.makecode != this.data.code){ 
        wx.showToast({ 
           title: '验证码不正确', 
           icon: 'none', 
           duration: 2000 
         })
      }else if(this.data.password != this.data.repassword){
        wx.showToast({ 
          title: '密码不一致，请重新输入', 
          icon: 'none', 
          duration: 2000 
        }) 
      }else{
        wx.showToast({ 
          title: '网络繁忙。请稍后再试！', 
          icon: 'none', 
          duration: 2000 
        }) 
      }
    }
  },
  //选择性别
  bindPickerChange: function (e) {
    var that = this;
    var selectSex = that.data.array[e.detail.value];
    that.setData({
      index: e.detail.value,
      zcsex : selectSex
    })
    //console.log(this.data.zcsex);
  },
  bindCollegeChange:function(e){
    var that = this;
    var selectCollege = that.data.collegeArr[e.detail.value];
    that.setData({
      zccollege: e.detail.value,
    })
  },
  //选择出生日期
  bindDateChange: function(e) {
    this.setData({
      zcbirthyear: util.formatTime(e.detail.value, 'Y/M/D')
    })
    //console.log(this.data.zcbirthyear);
  },
  //输入手机号，获得手机号
	bindPhoneInput: function (e) {
		this.setData({
      telnumber: e.detail.value,
      username: e.detail.value
    });
	},
	//输入密码，获得密码
	bindPasswordInput: function (e) {
		this.setData({
			password: e.detail.value
		});
  },
  //输入重复密码，获得重复密码
  bindRePasswordInput: function (e) {
		this.setData({
      repassword: e.detail.value
		});
	},
  //输入用户名，获得用户名
  bindUsernameInput: function (e) {
		this.setData({
      zcusername: e.detail.value
    });
	},
	//点击登录按钮
	login: function (e) {
		var that = this;
		if (this.data.telnumber === '' || this.data.password === '') {
			this.setData({
				isError: true,
				errorText: "手机号码或密码不能为空"
			});
			return;
		}
		//用户名或手机号登陆
		wx.request({
			url: app.globalData.Url+`/wxstudent/wxlogin`,
			data: {
        telnumber: this.data.telnumber,
        username: this.data.username,
				password: this.data.password
			},
			method: 'POST', 
			header:{ 'content-type':'application/x-www-form-urlencoded'},
			success: function (req) {
				var list=req.data
				if (req.data.length==1) {
					that.setData({
						userid:list[0].userid
					})
					wx.setStorageSync('USERID', that.data.userid);
					wx.navigateTo({
						url: '/pages/user/user',
          })
				} else {
					that.setData({
						isError: true,
						errorText: "请输入正确的手机号或用户名和密码"
					});
				}
			},
		})
	},
  //顶头切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //获取输入验证码的值
  makecodeInput:function(e){ 
    this.setData({ 
      makecode:e.detail.value 
    })
  },  
  //验证码 生成器
  createCode(){ 
    var code; 
    //首先默许code为空字符串 
    code = ''; 
    //设置长度，这里看须要，我这里设置了4 
    var codeLength = 4; 
    //设置随机字符 
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9); 
    //循环code1Length 我设置的4就是循环4次 
    for(var i = 0; i < codeLength; i++){ 
      //设置随机数范围，这设置为0 ~ 10 
      var index = Math.floor(Math.random() * 10); 
      //字符串拼接 将每次随机的字符 停止拼接 
      code += random[index]; 
    } 
      //将拼接好的字符串赋值给展示的code 
      this.setData({ 
        code: code 
      })
  },
  //点击更新验证码 
  getcode: function() { 
    this.createCode(); 
  },
  
});