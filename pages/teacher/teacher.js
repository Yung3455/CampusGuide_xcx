const app = getApp();
const filter = require('../filter.js');
Page(filter.loginCheck({

	/**
	 * 页面的初始数据
	 */
	data: {
		keyword: '',
		teacherlist:"",
		tishi:"",
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that=this;
		console.log("vsvd:"+options.collegeid)
    wx.request({
			url: app.globalData.Url+'/wxstudent/wxGetTeachers',
			data:{
				collegeid:options.collegeid
			},
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(req){
				var list=req.data;
				if(req.data.length>0){
					that.setData({
						teacherlist:list  //更新设置数据
					})
				}else{
					that.setData({
						tishi:"true"  //更新设置数据
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
	//打电话
	callPhone: function (e) {
		wx.makePhoneCall({
			phoneNumber: e.currentTarget.dataset.phone
		})
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
	search: function (e) {
		wx.navigateTo({
			url: '/pages/card/card?id=0&type=3&title=' + this.data.keyword
		})
	}
}))