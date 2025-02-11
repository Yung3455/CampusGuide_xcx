// pages/welcome/welcome.js
Page({
  data: {
    noticeData:[
      {
        id:0,
        title:"关于举行2023年上半年全国计算机等级考试的通知 ",
        noticemsg:"考生应至少提前1小时到达考点，进入考点时要听从现场工作人员指挥，社会考生及本校未住校学生3月25日考试当天从学校（深圳市龙岗区龙翔大道2188号）西北门进入，按照入校专用通道，所有考生要求佩戴口罩，逐一检测体温，核查准考证和有效身份证件。临时出现体温异常的考生，可根据医疗卫生专业人员指引，先在临时观察区进行复核评估后作下一步处置。发热考生原则上安排在备用隔离考位进行考试，如提供72小时内核酸或者抗原检测阴性证明材料，也可安排在正常考位考试。社会考生不得穿越警戒线去往学校其他场所，考试结束后，原路返回离校。",
        publishDate:"2023-03-21"
      },
      {
        id:1,
        title:"停电通知",
        noticemsg:"为做好学校配电房仪表更换及智慧用电系统的安装，兹计划1月6日至1月15日学校部分建筑停电",
        publishDate:"2023-01-05"
      },
      {
        id:2,
        title:"公共拓展课网上选课的通知",
        noticemsg:"根据公共课教学部（素质赋能中心）提供的开课信息，教务处已完成2022-2023（2）公共拓展课229门课程、330个班次的系统建课，可满足17360人次的选课需求。同时额外开设2门精品慕课（1学分/门），方便学生线上修读。现将学生（含本部专科学生、合作应用型本科学生）选课工作安排如下：...",
        publishDate:"2022-12-21"
      },
      {
        id:3,
        title:"新生教材发放的通知",
        noticemsg:"各二级学院提前落实各班级领书人员并按规定时间领取，建议自备拖车或行李箱等搬书工具。为避免人员聚集，每个班级指派4-5名同学领书，班级负责人领书签到时请现场扫码进群，方便后续联系沟通",
        publishDate:"2022-09-15"
      },
    ],
    goBackSchool:[
      {
        backTime:"2022年9月17日",
        beizhu:"市外生报到"
      },
      {
        backTime:"2022年9月19日",
        beizhu:"市内生报到"
      },
      {
        backTime:"2022年9月19日-23日",
        beizhu:"新生体检"
      },
      {
        backTime:"2022年9月20日-24日",
        beizhu:"新生入学教育"
      },
      {
        backTime:"2022年9月21日",
        beizhu:"开学典礼"
      },
      {
        backTime:"2022年9月26日",
        beizhu:"正式上课"
      }
    ],
    docuInfoArr:["《录取通知书》原件及复印件（2份）","毕业证书或同等证明学历证明（验原件，收复印件1份）","平安银行卡","户口本复印件（户主页和本人页 3 份）","身份证","学生档案","团籍档案和团员证","本人近期正面免冠一寸白底照片10张"],
    dailyprodArr:["笔、笔筒、笔袋、笔芯","宿舍用台灯、帆布包","小型家用药箱","床上四件套：枕头、凉席、被单、被子","鞋子、拖鞋、衣架、蚊帐、床帘","换洗衣物","牙刷、牙膏、漱口杯、毛巾","洗发水、沐浴露、洗衣液"],
    trafficData:[
      {
        title:"东门交通",
        content:"东门靠近宿舍群和物流园，出东门左手边有公交站“信息学院东”，右手边步行大概15-20分钟的时间可到大运地铁站",
        busNo:"M322路、M219路、M547路、M386路、M446路、M294路、M368路、M318路、M593路"
      },
      {
        title:"北门交通",
        content:"学校正门，搭高铁和长途在北门附近（信息学院站）",
        busNo:"M139路、M447路、E7路、高快巴士81路、E25路、M319路、M165路、E27路、802路、E6路、A4路、E5路"
      },
      {
        title:"南门交通",
        content:"靠近体育馆，校外靠近荷坳新村",
        busNo:"从南门步行约800米到达荷坳新村公交站，可乘坐M386路"
      }
    ],
    routepoly1Data:[
      {
        id:1,
        routeOutline:"802路公交车",
        routeDetail:"从深圳坪山站南广场公交站可乘坐802路公交车，大约途径27站，全程约1小时10分钟公交站左右，可达信息学院2公交站"
      },
      {
        id:2,
        routeOutline:"M165路",
        routeDetail:"从深圳坪山站南广场公交站可乘坐M165路公交车，大约途径16站，全程约1小时10分钟公交站左右，可达信息学院1公交站"
      },
      {
        id:3,
        routeOutline:"M497路→3号线（龙岗线）",
        routeDetail:"从深圳坪山站南广场公交站乘坐M497路公交车，途径8个站可达双龙地铁站2公交站，在双龙地铁站D口可乘坐地铁3号线（龙岗线）福保方向乘坐5站到达大运地铁站，之后可选择步行、搭公交、打车等方式到达学校"
      },
    ],
    routepoly2Data:[
      {
        id:1,
        routeOutline:"5号线（环中线）→M447路、E27路、E7路",
        routeDetail:"从深圳北站地铁站D口乘坐5号线（环中线）黄贝岭方向途经3站，到达坂田地铁站，从B口出到达坂田地铁站公交站，乘坐M447路（或E27路、E7路）途经2站，到达信息学院公交站"
      },
      {
        id:2,
        routeOutline:"4号线（龙华线）→M447路",
        routeDetail:"从深圳坪山站南广场公交站可乘坐M165路公交车，大约途径16站，全程约1小时10分钟公交站左右，可达信息学院1公交站"
      },
      {
        id:3,
        routeOutline:"5号线（环中线）→3号线（龙岗线）",
        routeDetail:"从深圳北站地铁站D口乘坐5号线（环中线）黄贝岭方向途经8站，到达布吉地铁站，站内换乘3号线（龙岗线）双龙方向（站内换乘184米，约3分钟），途经9站到达大运地铁站，之后可选择步行、搭公交、打车等方式到达学校"
      },
    ],
    routepoly3Data:[
      {
        id:1,
        routeOutline:"M139路",
        routeDetail:"从深圳东站东广场公交站乘坐M139路（坪地发方总站方向）途经8站到达信息学院公交站，全程约51分钟"
      },
      {
        id:2,
        routeOutline:"M295路→3号线（龙岗线）",
        routeDetail:"从深圳东站东广场公交站乘坐M295路坑梓基地总站方向）途经4站到达丹竹头地铁站，从丹竹头地铁站B口乘坐3号线（龙岗线）双龙方向途经6站到达大运地铁站，之后可选择步行、搭公交、打车等方式到达学校"
      }
    ],
    routepoly4Data:[
      {
        id:1,
        routeOutline:"1号线（罗宝线）→3号线（龙岗线）",
        routeDetail:"从深圳站步行约200米到达罗湖地铁站C口，乘坐1号线（罗宝线）机场东方向途径2站到达老街地铁站，站内换乘3号线（龙岗线）双龙方向途径15站到达大运地铁站，之后可选择步行、搭公交、打车等方式到达学校"
      },
      {
        id:2,
        routeOutline:"1号线(罗宝线)→3号线(龙岗线)→M139路",
        routeDetail:"从深圳站步行约200米到达罗湖地铁站C口，乘坐1号线（罗宝线）机场东方向途径2站到达老街地铁站，站内换乘3号线（龙岗线）双龙方向途径9站到达丹竹头地铁站，出地铁步行约160米丹竹头公交站，途径5站可到达信息学院公交站"
      }      
    ],
    QAData:[
      {
        ques:"校外人员(家长)是否能入校？",
        answ:"目前疫情防控还未结束，校外人员暂无法入校。"
      },
      {
        ques:"新生需要迁户吗？",
        answ:"可根据本人意愿决定是否迁移户口。"
      },
      {
        ques:"开学需要携带的东西很多怎么办？",
        answ:"可以提前邮寄物品到学校哈。邮寄地址：广东省深圳市龙岗区龙城街道龙翔大道2188号"
      },
      {
        ques:"宿舍床位有床垫吗？需不需要自带？",
        answ:"新生床位已取消床垫，需自购，可选择网购寄至学校。"
      },
      {
        ques:"图书馆入馆需要预约吗？去哪里预约？",
        answ:"无需预约，可通过刷校园付款码或刷脸进馆。"
      }
    ],
    active:0,
    currentTab:0
  },
  onLoad:function(){
    wx.setNavigationBarTitle({
      title: "迎新季"
    })
  },
  switchNav: function (e) {
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({
        currentTab: id
      });
    }
    page.setData({
      active: id
    });
  },
  detailMsg:function(e){
    var idx=e.currentTarget.dataset.index;
    var noticeTitle=this.data.noticeData[idx].title;
    var notice=this.data.noticeData[idx].noticemsg;
    wx.showModal({
      // title: '通知详情',
      title: noticeTitle,
      content: notice,
      showCancel:false,
      confirmText:"我知道了",
    })
  }
})