# angular-pageControl
the page control for angularJS.
it just a first version of this component if you have any advise please send e-mail to 331988750@qq.com.

#Usage

````

import:
1.<script src="./angular-pagectrl.js"></script>

js:
2.angular.module('app',['pageControl'])

html:
3.
<page-ctrl 
    max-page="{{maxPage}}"              
    box-class="pageControl" 
    item-class="item" 
    active-class="active" 
    data="data"
    show-number-button="6"
    url="{{url}}"
    method="POST"
    params="{{params}}"
    current-page-key="currentPage"                  
    >
 <!--
        max-page 你的最大页数
        box-class 你的分页器样式
        item-class 分页器按钮样式
        active-class 按钮选中样式
        data 你要请求的每页数据的容器
        show-number-button 你想要显示多少个按钮
        url 获取每页数据的url
        params 请求每页数据的具体参数 页面写第一页即可
        current-page-key 告诉组建如何求改你的cureentPage的value 的key 是哪个  比如要请求第n也的数据的key 是{currentPage:n} 可以设置为 current-         page-key = "currentPage"
        method默认参数为POST 可以不传递参数 
    -->   
/**
controller('main',function($scope,$http){

  $scope.url = 'http://localhost:8030/history' //获取每页数据的url
  $scope.params = {                            //请求参数
      userId:001,
      showPage:2,
      currentPage:1
  }

  $http({
      url:'http://localhost:8030/maxPage',  //获取页数的url
      method:'POST',
      data:{
          userId:001,
          showPage:2
      }
  }).then(function(result){
      $scope.maxPage = result.data.maxPage;   //获取最大页数
  },function(error){
      console.log(error.message);
  })

})
 **/
````


大家好,这是我的第一个angularJS通用组件-分页器,欢迎大家试用。
