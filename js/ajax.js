let apiUrl = 'http://www.reminisce.cn/huanxin'

let getBannerList_url = apiUrl + '/api/banner/getBannerList' // Banner列表
let getAbout_url = apiUrl + '/api/configs/getAbout' //获取关于我们
let getContactWays_url = apiUrl + '/api/configs/getContactWays' //获取联系方式

let getInformationParList_url = apiUrl + '/api/partner/getInformationList' //更多合作伙伴

let getInformationInfoList_url = apiUrl + '	/api/information/getInformationList' //资讯列表
let getInformationDetail_url = apiUrl + '/api/information/getInformationDetail' //获取资讯详情

let getHomeInfo_url = apiUrl + '/api/home/getHomeInfo' //首页内容
let getProductDetail_url = apiUrl + '/api/product/getProductDetail' //商品详情

let getSolutionDetail_url=apiUrl + '/api/solution/getSolutionDetail' //解决详情



// getInformationParList(1, 100)
// getInformationList(1, 100)
// getAbout()
// getHomeInfo()

//资讯列表
function getInformationList(page, size) {
  $.ajax({
    type: 'post',
    url: getInformationInfoList_url,
    data: {
      page,
      size,
    },
    success: function (sc) {
      let innHtml = ''
      let list = sc.body.list
      for (let i in list) {
        innHtml += `
        <div class="blog-card">
          <a href="newProject.html?productId=${list[i].id}">
            <div style="position: relative;"><img
                src="${list[i].cover_img}"
                alt="" class="blog-thumbnail">
            </div>
            <div class="blog-card-content">
              <div class="font-20 semi-bold t-color">${list[i].title}</div>
              <div class="t-color mt-16 sub"> <span class="blog-card-author"> </span>  ${list[i].add_time}</div>
            </div>
          </a>
        </div>`
      }

      $('#UlListNews').html(innHtml)
    },
    async: false,
  })
}
// 获取资讯详情
function getInformationDetail(informationId) {
  $.ajax({
    type: 'post',
    url: getInformationInfoList_url,
    data: {
      informationId: 1,
    },
    success: function (sc) {},
    async: false,
  })
}

// Banner列表
  function getBannerList(identifier,id) {
    var p = new Promise(function(resolve,reject){
      $.ajax({
        type: 'post',
        url: getBannerList_url,
        data: {
          identifier,
          id
        },
        success: function (sc) {
          resolve(sc.body)
          

        },
        async: false,
      })
    })
    return p
  
}
//关于我们
function getAbout() {
  $.ajax({
    type: 'post',
    url: getAbout_url,
    data: {},
    success: function (sc) {
      let detailList = sc.body
      let innerHtml = ''
      for (let i in detailList) {
        switch (detailList[i].type){
          case 1:
            innerHtml+=setMoban1(detailList[i])
            break
          case 2:
            innerHtml+=setMoban2(detailList[i])
            break
          case 3:
            innerHtml+=setMoban3(detailList[i])
            break
          case 4:
            innerHtml+=setMoban4(detailList[i])
            break
          case 5:
          innerHtml+=setMoban5(detailList[i])
          break
          case 6:
          innerHtml+=setMoban6(detailList[i])
          break
          default:
          // console.log("detailList[i].type",detailList[i].type)

        }
      }

      
      $('#aboutUs').html(innerHtml)
    },
    async: false,
  })
}
//获取联系方式
function getContactWays() {
  $.ajax({
    type: 'post',
    url: getContactWays_url,
    data: {},
    success: function (sc) {
      let bodyObj=sc.body
      
      // console.log("sc",sc)
      $("#yxId").text(`邮箱地址：${bodyObj.e_mail}`)
      $("#qqId").html(`在线沟通，请点我<a href="http://wpa.qq.com/msgrd?v=3&uin=${bodyObj.qq}&site=qq&menu=yes" target="_blank">在线咨询</a>`)
     $("#telId").html(`咨询热线：<br>${bodyObj.phone}<br>qq：<br>${bodyObj.qq}`)
      $("#wxId").html(`<img src="${bodyObj.wechat}" />`)
      
    },
    async: false,
  })
}

//更多合作伙伴
function getInformationParList(page, size) {
  $.ajax({
    type: 'post',
    url: getInformationParList_url,
    data: {
      page,
      size,
    },
    success: function (sc) {
      // console.log('sc', sc)
      let list = sc.body.list

      // let listHrml=''
      for (let i in list) {
        // listHrml+=`<dd><img src="${list[i].logo}"/></dd>`
        let listHrml = `<dd><img src="${list[i].logo}"/></dd>`
        $('#roll').append(listHrml)
      }
      // console.log("listHrml",listHrml)

      // $("#roll").html(listHrml);
    },
    async: false,
  })
}

//首页内容
function getHomeInfo() {
  $.ajax({
    type: 'post',
    url: getHomeInfo_url,
    data: {},
    success: function (sc) {
      let productList = sc.body.product
      let solutionList=sc.body.solution
      const newProductList=[]//
      const newSolutionList=[]

      const colorList=['#B25BFF','#00CAF8',"#26D98E","#5B87FF","#27B5FE","#00CBC1"]
      const headerImgList=['./header/bmc.svg','./header/edcs.svg','./header/sdn.svg','./header/sdwan.svg','./header/gia.svg','./header/ipt.svg']
      let html = ''
      for (let i in productList) {
        let newList = setPrimaryNav(
          productList[i].products,
          'newProduct'
        )
        html += `<div class="primaryNav-dropdown-category">
        <div class="font-16">${productList[i].name}</div>
          ${newList}
        </div>`
        newProductList.push(...productList[i].products)
      }
      $('#primaryNavDropdown').html(html)



      let newHtml = ''
      for (let i in solutionList) {
        // console.log("solutionList[i]",solutionList[i])
      
        let newList = setPrimaryNav(
          solutionList[i].solutions,
          'resolveProject'
        )
        newHtml += `<div class="primaryNav-dropdown-category">
        <div class="font-16">${solutionList[i].name}</div>
          ${newList}
        </div>`
        newSolutionList.push(...solutionList[i].solutions)
      }
      // console.log("newHtml",newHtml)
      $('#resolveProject').html(newHtml)


      // let newHtml=`<div class="primaryNav-dropdown-category">
      // <div class="font-16">解决方案</div>`
      // for(let i in solutionList){
      //   let newList = setPrimaryNav(
      //     solutionList[i].solutions,
      //     'resolveProject'
      //   )
      //   newHtml += `${newList} `
      // }

      // newHtml+=`</div>`

      // console.log("newHtml",newHtml)
      // $('#resolveProject').html(newHtml)







      let newProductListLength=6
      if(newProductList.length<=6){
        newProductListLength=newProductList.length
      }

      for(let j =0;j<newProductListLength;j++){
        let h=j+1
        setHtml(newProductList[j], colorList[j], '#itme'+h, headerImgList[j])
        setH5Html(newProductList[j], colorList[j], '.index-productIntro-item-'+h, headerImgList[j])
      }
      



      // setHtml(productList[0], '#B25BFF', '#itme1', './header/bmc.svg')
      // setHtml(productList[1], '#00CAF8', '#itme2', './header/edcs.svg')
      // setHtml(productList[2], '#26D98E', '#itme3', './header/sdn.svg')
      // setHtml(productList[3], '#5B87FF', '#itme4', './header/sdwan.svg')
      // setHtml(productList[4], '#27B5FE', '#itme5', './header/gia.svg')
      // setHtml(productList[5], '#00CBC1', '#itme5', './header/ipt.svg')
    },
    async: false,
  })
}
//  ${for(let i in List.products){`
function setHtml(List, color, id, imgSrc) {
  let liList = ''
  // for (let i in List.products) {
    // liList += `<li class="mt-16" style="color:${color}"><span>${List.products[i].title}</span></li>`
  // }
  // newProject.html?productId=${list[i].id}
  let innerHtml = `<a href="newProduct.html?productId=${List.id}"> <div class="font-20 semi-bold t-color">${List.title}</div>
  <ul>
  <li class="mt-16" style="color:${color}"><span>${List.content}</span></li>

  </ul><img src="${imgSrc}" class="product-logo" />
  <div class="product-item-borderCover" style="background:${color}"></div></a>`

  $(id).html(innerHtml)
}


function setH5Html(List, color, id, imgSrc){
  let innerHtml=`<a href="newProduct.html?productId=${List.id}">   <div class="index-productIntro-itemWrapper">
  <div
    style="background:linear-gradient(180deg,rgba(222,246,245,0.5) 0%,rgba(241,251,251,0.5) 100%)"
    class="index-productIntro-item-normal">
    <div class="index-productIntro-itemTitle font-28 semi-bold">${List.title}</div>
    <div class="index-productIntro-itemDesc font-20">${List.content}</div>
    <picture>
      <source srcset="${imgSrc}" media="(max-width: 640px)"><img src="${imgSrc}"
        alt="互联网转接服务" class="product-logo" style="width:160px;height:160px">
    </picture>
  </div>
</div></a>`

$(id).html(innerHtml)
}



//       <div class="primaryNav-dropdown-category">
// <div class="font-16">计算</div>
//<span style="cursor:pointer">
//   <div class="primaryNav-navItem-1"><img src="/header/bmc.svg" class="icon" alt="裸机云" />
//     <div class="name-desc">
//       <p class="font-16">裸机云</p>
//       <p class="desc font-12">高性能计算+云的灵活性</p>
//     </div>
//   </div>
// </span><span style="cursor:pointer">
//   <div class="primaryNav-navItem-1"><img src="/header/edcs.svg" class="icon" alt="边缘数据中心服务" />
//     <div class="name-desc">
//       <p class="font-16">边缘数据中心服务</p>
//       <p class="desc font-12">定制化的主机托管、租赁解决方案</p>
//     </div>
//   </div>
// </span>
// </div>


function setPrimaryNav(List, url) {
  let innerHtml = ''
  for (let i in List) {
    // 
    innerHtml += ` <a href="/${url}.html?productId=${List[i].id} " style="margin: 0;display: inline"><span style="cursor:pointer">
    <div class="primaryNav-navItem-1"><img src="${List[i].imgs}" class="icon" alt="" />
      <div class="name-desc">
        <p class="font-16">${List[i].title}</p>
        <p class="desc font-12"${List[i].content} </p>
      </div>
    </div>
    </span></a>
  `
  // 
  }
  return innerHtml
}

// 商品详情
function getProductDetail(productId) {
  $.ajax({
    type: 'post',
    url: getProductDetail_url,
    data: {
      productId,
    },
    success: function (sc) {
      // let title = sc.body.title
      // let cover_img = sc.body.cover_img


      let detailList = sc.body.detail
      let innerHtml = ''
      for (let i in detailList) {
        switch (detailList[i].type){
          case 1:
            innerHtml+=setMoban1(detailList[i])
            break
          case 2:
            innerHtml+=setMoban2(detailList[i])
            break
          case 3:
            innerHtml+=setMoban3(detailList[i])
            break
          case 4:
            innerHtml+=setMoban4(detailList[i])
            break
          case 5:
          innerHtml+=setMoban5(detailList[i])
          break
          case 6:
          innerHtml+=setMoban6(detailList[i])
          break
          default:
          // console.log("detailList[i].type",detailList[i].type)

        }
      }

      
      $('#news').html(innerHtml)
    },
    async: false,
  })
}

// 商品详情
function getSolutionDetail(solutionId) {
  $.ajax({
    type: 'post',
    url: getSolutionDetail_url,
    data: {
      solutionId,
    },
    success: function (sc) {
      // let title = sc.body.title
      // let cover_img = sc.body.cover_img


      let detailList = sc.body.detail
      let innerHtml = ''
      for (let i in detailList) {
        switch (detailList[i].type){
          case 1:
            innerHtml+=setMoban1(detailList[i])
            break
          case 2:
            innerHtml+=setMoban2(detailList[i])
            break
          case 3:
            innerHtml+=setMoban3(detailList[i])
            break
          case 4:
            innerHtml+=setMoban4(detailList[i])
            break
          case 5:
          innerHtml+=setMoban5(detailList[i])
          break
          case 6:
          innerHtml+=setMoban6(detailList[i])
          break
          default:
          // console.log("detailList[i].type",detailList[i].type)

        }
      }

      
      $('#resolveId').html(innerHtml)
    },
    async: false,
  })
}




//模版1
function setMoban1(obj){
  let innerHtml=`<div class="fadeInUp"
  style="background-image:url('${obj.imgs}'); background-position:center top;background-size: 100% 100%;">
  <div class="banner-topIntro page-middle" style="height: 500px;position: relative;">
    <h1 class="banner-topIntro-title semi-bold"style="color:#${obj.title_color}">${obj.title}</h1>
    <div class="font-20 mt-24 semi-bold subtitle" style="color:#${obj.title_color};width: 50%">${obj.desc}</div>
  </div>
</div>`

return innerHtml
}


//模版2
function setMoban2(obj){
  let innerHtml=`<div class="fadeInUp"
  style="background-image:url('${obj.imgs}'); background-position:center top;background-size: 100% 100%">
  <div class="banner-topIntro page-middle" style="height: 500px;position: relative;text-align: center;">
    <h1 class="banner-topIntro-title semi-bold"style="color:#${obj.title_color}">${obj.title}</h1>
    <div class="font-20 mt-24 semi-bold subtitle"style="color:#${obj.title_color}">${obj.desc}</div>
  </div>
</div>`

return innerHtml
}

//模版3
function setMoban3(obj){
  let innerHtml=`<div class="fadeInUp" >
  <div class="cloudWan-b3-content" style="display:flex ;align-items:center;justify-content:center;padding-top:0; padding:50px 0">
    <div class="left t-color mobile-padding">
      <div class="font-36 semi-bold m-text-center" style="color:#${obj.title_color}">${obj.title}</div>
      <div class="description font-20 mt-24" style="color:#${obj.title_color}">${obj.desc}</div>
    </div>
    <div class="right"><img src="${obj.imgs}" alt="">
    </div>
  </div>
</div>`

return innerHtml
}

//模版4
function setMoban4(obj){
  let innerHtml=`<div class="fadeInUp" >
  <div class="gia-b2-content full-bg">
    <div class="left"><img src="${obj.imgs}" alt=""
        class="main-pic"></div>
    <div class="right" style="margin-left:30px">
      <div class="font-36 semi-bold"style="color:#${obj.title_color}">${obj.title}</div>
      <div class="font-20 mt-24 description"style="color:#${obj.title_color}"> ${obj.desc}</div>
    </div>
  </div>
</div>`

return innerHtml
}

//模版5
function setMoban5(obj){
  let innerHtml='<div class="edcs-feature">'+
  '<div class="fadeInUp">'+
    '<div class="font-36 semi-bold t-color mobile-padding"style="color:#'+obj.title_color+'">'+obj.title+'</div>'+
    '<div class="edcs-feature-content">'
    for(let i in obj.subDetail ){
      innerHtml+=  ' <div class="edcs-feature-item">'
      + ' <img src="'+obj.subDetail[i].imgs+'" style="background-size: 100% 100%;width:120px" alt="">'
     +  ' <div class="font-20 semi-bold t-color mt-32 title" style="color:#'+obj.title_color+'">'+obj.subDetail[i].title+'</div>'
      +  '<div class=" description" style="line-height: 24px;" style="color:#'+obj.title_color+'">'+obj.subDetail[i].desc+'</div>'
    +  '</div>'
    }
    innerHtml+=  ' </div>'
  +'</div>'
+'</div>'

return innerHtml
}

//模版6
function setMoban6(obj){
  let innerHtml=`<div class="cloudWan-b4">
  <div class="fadeInUp">
    <div class="cloudWan-b4-content mobile-padding">
      <div class="font-36 semi-bold t-color"style="color:#${obj.title_color}">${obj.title}</div>
      <div class="description mt-24 font-20 block-middle" style="max-width: 1000px;color:#${obj.title_color}">
      ${obj.desc}</div>
    </div>
    <img src="${obj.imgs}" alt="端到端的加速" 
        class="main-pic">
  </div>
</div>`

return innerHtml
}


// $.ajax({url:"demo_test.txt",success:function(result){
//   $("#div1").html(result);
// }});
