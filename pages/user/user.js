//防偷窥
const filter = require('../filter.js');
const timeutil=require("../nowTimeutil.js");
//时间工具
const util = require('../../utils/util.js');
var app=getApp();
Page(filter.loginCheck({
	data: {
		userid: '',
		grade:"",//注册时间
		birthyear:"",//生日
		user: {},
		backgroundImg:"",
		zhufu:""
	},
	onLoad: function (options) {
	},
	onShow: function () {
		var that = this;
		that.setData({
			userid: wx.getStorageSync('USERID'),
			backgroundImg:app.globalData.bgImgUrl+"/sxImage/",
		});
		wx.request({
			url: app.globalData.Url+`/wxstudent/selectStudent`,
			data: {
				userid:that.data.userid,
			},
			method: 'GET',
			header:{ 'content-type':'application/x-www-form-urlencoded'},
			success: function (req) {
				var list=req.data;
				if(util.formatTime(list[0].birthyear, 'Y年M月D日')==util.formatTime(new Date(), 'Y年M月D日')){
					that.setData({
						zhufu:"true"
					})
				}
				that.setData({
					user: list[0],
					grade:util.formatTime(list[0].grade, 'Y年M月D日'),
					birthyear:util.formatTime(list[0].birthyear, 'Y年M月D日')
				})
			},
		});
  },

	logout:function(){
		var that=this;
		wx.removeStorage({
			key: 'USERID',
			success (res) {
				console.log(res)
			}
		})
		wx.reLaunch({
			url: '/pages/index/index',
		});
		that.setData({
			userid:wx.getStorageSync('USERID'),
			user:null
		})
	},
	
	Tologin:function(){
		wx.navigateTo({
			url: '/pages/login/login',
		})
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
		return {
			title: `${this.data.user.name}的名片`
		}
	}
}))