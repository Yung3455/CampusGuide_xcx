var app = getApp();
Page({
  data: {
    keyword: null,
    // buildlData:config.map,
    showData: null,
    cursor: 0,
    backgroundImg:"",
    ico:"",
    xz_latitude:"",
    xz_longitude:"",
  },

  bindSearchInput: function(e) {
    //访问后台交换数据，获得查询结果
    var that = this;
		wx.request({
			url: app.globalData.Url+`/wxstudent/wxSearch`,
			data: {
				sceneryName: e.detail.value.replace(/(^\s*)|(\s*$)/g, "")
			},
			method: 'POST', 
			header:{ 'content-type':'application/x-www-form-urlencoded'},
			success: function (req) {
				var list=req.data
				if (list.length>0) {
					that.setData({
						showData:list
					})
				} else {
          wx.showToast({
            title: '无此数据！',
            icon:'loading',
            duration:1500 
					});
				}
			},
		})
    this.data.cursor = e.detail.cursor;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      backgroundImg:app.globalData.bgImgUrl+"/sxImage/",
      ico:app.globalData.bgImgUrl+"/sxImage/mapIco/",
      xz_latitude:options.xz_latitude,
      xz_longitude:options.xz_longitude,
    })
  },

  reset: function() {
    this.setData({
      keyword: null
    });
  }
})