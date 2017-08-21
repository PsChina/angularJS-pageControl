# angular-pageControl
The page control for angularJS.
If you have any advise please send e-mail to 331988750@qq.com.

# Get Start
## git
Open git and run
````
git clone git@github.com:PsChina/angularJS-pageControl.git
````
## npm
````
npm install angular-pagecontrol--save-dev
````

# Usage
````
1.import pageControl module.
<script src="./angular-pagectrl.js"></script>

2.injection pageControl in your app.
angular.module('app',['pageControl'])

3.use it.
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
    previous-page-class="previousPage"
    next-page-class="nextPage" 
    previous-omit-class="previousOmit"
    next-omit-class="nextOmit"                       
    >
    <!--
        max-page                @   你的最大页数
        box-class               @   你的分页器样式
        item-class              @   分页器按钮样式
        active-class            @   按钮选中样式
        data                    =   你要请求的每页数据的容器
        show-number-button      @   你想要显示多少个按钮
        url                     @   获取每页数据的url
        params                  @   请求每页数据的具体参数 页面写第一页即可
        current-page-key        @   告诉组建如何求改你的cureentPage的value 的key 是哪个  比如要请求第n也的数据的key 是{currentPage:n} 可以设置为 current-page-key = "currentPage"
        method默认参数为POST     @   可以不传递参数 
        previousPageClass       @   上一页类名
        nextPageClass           @   下一页类名
        previousOmitClass       @   上一页省略号类名
        nextOmitClass           @   下一页省略号类名        
    -->   
    css:
        html,body {
            margin: 0;
            padding: 0;
            height: 100%;
        }
        .item{
            margin: 2px;
            border:1px solid black;
            width: 50px;
            height: 50px;
            float: left;
            line-height: 50px;
            text-align: center;
        }
        .pageControl{
            position: fixed;
            left: 0;
            bottom: 0;
        }
        
        .pageContent{
            width: 100%;
            height: 100%;
            overflow: hidden;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .active{
            background: red;
        }
        .previousPage{
            margin: 2px;
            border:1px solid black;            
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            background: green;
            float: left;
            border-top-left-radius: 25px;
            border-bottom-left-radius: 25px;
        }
        .nextPage{
            margin: 2px;
            border:1px solid black;            
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            background: green;
            float: left;
            border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;            
        }
        .previousOmit{
            float: left;
            width: 50px;
            height: 50px;
            line-height: 80px;
            text-align: center
        }
        .nextOmit{
            float: left;
            width: 50px;
            height: 50px;
            line-height: 80px;
            text-align: center
        }    
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
      $scope.maxPage = 10;
  })

})
 **/
````

欢迎试用!
