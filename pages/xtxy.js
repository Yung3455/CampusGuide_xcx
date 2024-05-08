//学校基本信息 
var data={
  "shortName": "深信院", //学校简称
  "name": "深圳信息职业技术学院", //学校名称
  "xiaoxun":"纯德实学",
  "images": "/pages/img/northdoor.jpg", // 首页图片地址
  "share": "/pages/img/northdoor.jpg", //分享时展示图片的地址
  "latitude": "22.684418",
  "longitude": "114.215693",
  "img": ["https://www.sziit.edu.cn/__local/A/1B/EE/783ECCD872A359EF50B1185FAC6_13BAB5D3_5D103.png", 
          "https://www.sziit.edu.cn/__local/0/C5/9C/3EA04235606BE563AA82A12B72F_E80F8877_74C9C.png",
          "https://www.sziit.edu.cn/__local/A/1B/EE/783ECCD872A359EF50B1185FAC6_13BAB5D3_5D103.png",
          "https://www.sziit.edu.cn/__local/0/C5/9C/3EA04235606BE563AA82A12B72F_E80F8877_74C9C.png"],  //首页轮播简介图片
  "bgimg":"https://www.sziit.edu.cn/__local/A/1B/EE/783ECCD872A359EF50B1185FAC6_13BAB5D3_5D103.png",
  "description": "<p>深圳信息职业技术学院位于广东省深圳市，是一所由深圳市人民政府举办，广东省人民政府批准成立的公办全日制普通高等学校。</p><p>是首批“国家示范性软件学院”建设院校、广东省一流高职院校建设单位、博士后创新实践基地、“国家示范性高等职业院校”、教育部“中德职教汽车机电合作项目”试点院校、教育部“工业机器人领域职业教育项目”合作院校、首批高校数字媒体产教融合创新应用示范基地。2019年12月，被教育部、财政部列入第二类高水平学校建设单位（B档）。</p>",
  "mapCopyright": { name: "招生宣传服务中心", url: "" } 
}


//腾讯地图导航key
var dtkey={
  key:"	CFGBZ-C5W6S-6APOL-6VBD7-YQXPV-NDFEN"
}
 //数据暴露出去
 module.exports = {  
  data: data,
  // map: map,
  dtkey : dtkey,
  // schoolPerson:schoolPerson
}