const app = getApp();
const filter = require('../filter.js'); 
Page(filter.loginCheck({

	/**
	 * 页面的初始数据
	 */
	data: {
		keyword: '',
		Deptslist: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that=this;
    wx.request({
      url: app.globalData.Url+'/wxstudent/wxGetDepts',
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(req){
        var list=req.data;
        if(list==null){
          wx.showToast({
            title: '啊哦，出错啦',
            icon:'false',
            duration:1500 //提示的延迟的时间
          })
        }else{
          that.setData({
            Deptslist:list  //更新设置数据
          })
        }
      }
    })
	},
	/**
	 * 获取部门信息
	 */
	getDepts:function(){
    
  },
	/**
	 * 输入关键字
	 */
	bindKeywordInput: function (e) {
		this.setData({
			keyword: e.detail.value
		});
	},

	/**
	 * 搜索
	 */
	search: function (e) {},
	//打电话
	callPhone: function (e) {
		wx.makePhoneCall({
			phoneNumber: e.currentTarget.dataset.phone
		})
	},
}))