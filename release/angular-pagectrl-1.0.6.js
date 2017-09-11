/**
 * 基于angularJS的一个分页器@angular1.x
 * State-based pageControl for AngularJS 1.x
 * @version 1.0.6
 * https://github.com/PsChina/angular-pageControl
 * @license Pan·ShanShan
 * 2017-08-20
 */
angular.module('pageControl',[])
.directive('pageCtrl',function(component){
    return {
        restrict:'E',
        template:`
            <div ng-class="boxClass" >
                <div ng-class="previousPageClass" ng-click="goToPrePage()" ng-show="currentPage>1">上一页</div>
                <div ng-class="[itemClass,firstButtonClass]" ng-click="go(1)" ng-show="firstPageButton||maxPage>1">1</div>
                <div ng-class="previousOmitClass" ng-show="previous">...</div>
                <div ng-class="[itemClass,{{'active'+$index}}]" ng-click="go()" ng-repeat="item in array track by $index">{{item}}</div>
                <div ng-class="nextOmitClass" ng-show="next">...</div>
                <div ng-class="[itemClass,lastButtonClass]" ng-click="go(maxPage)" ng-show="maxPage>1" >{{maxPage}}</div>
                <div ng-class="nextPageClass" ng-click="goToNextPage()" ng-show="currentPage!=maxPage&&maxPage">下一页</div>
            </div>            
        `,
        scope:{
            maxPage:'@',            //接收服务端返回的最大页数   (用于生成最后一页及其相邻页码)
            boxClass:'@',           //pageControll盒子样式     
            itemClass:'@',          //按钮样式
            activeClass:'@',        //选中样式
            showNumberButton:'@',   //期望显示几个数字按钮      (用于约束显示几个按钮)
            url:'@',                //向服务器数据数据的url     (用于向服务器发送ajax请求)
            data:'=',               //请求到的数据的存放容器    (用于接收请求到的数据)
            method:'@',             //请求方式                 (用于向服务器发送ajax请求)
            params:'@',             //请求参数                 (用于向服务器发送ajax请求)
            currentPageKey:'@',     //当前页的参数名           (用于向服务器发送ajax请求)
            previousPageClass:'@',  //上一页类名
            nextPageClass:'@',      //下一页类名
            previousOmitClass:'@',  //上一页省略号类名
            nextOmitClass:'@',      //下一页省略号类名
        },
        controller:function($scope,$http){

                $scope.initArray = function(){
                if($scope.maxPage-$scope.showNumberButton>0){
                    $scope.array = new Array($scope.showNumberButton-2);
                    $scope.next = true;
                }else{
                    if($scope.maxPage-2>0){
                        $scope.array = new Array($scope.maxPage-2);
                    } else {
                        $scope.array = [];
                    }
                }
                for(var i = 0 ,length = $scope.array.length; i<length ; i++ ){
                    $scope.array[i] = i+2
                }
                component.maxPage = $scope.maxPage;
            }         
            
            $scope.resetArray = function(operation){
                angular.forEach($scope.array,function(value,index){
                    $scope.array[index] = value + operation;
                })              
                operation>0 ? ($scope.previous = true) : ($scope.next = true);
            }

            //加载首屏数据
            $scope.initArray()
            $scope.currentPage =1;
            if(component.maxPage>0){
                $scope.firstPageButton = true;
            }
            $http({
                url:$scope.url,
                method:$scope.method ? $scope.method : 'POST',
                data:$scope.params ? $scope.params : ''
            }).then(function(result){
                $scope.data = result.data;
            },function(error){
                throw new Error(error.message);
            })
            
            //跳转到选中页并请求数据
            $scope.go = function(){
            $scope.currentPage = arguments[0] ? arguments[0] : this.item; 

            if(component.lastPage!=$scope.currentPage){ //如何当前页不是最新的那么不请求数据
                var params = JSON.parse($scope.params);
                params[$scope.currentPageKey] = $scope.currentPage;  
                $http({
                    url:$scope.url,
                    method:$scope.method ? $scope.method : 'POST',
                    data:params ? params : ''
                }).then(function(result){
                    $scope.data = result.data;
                },function(error){
                    throw new Error(error.message);
                })
                component.lastPage = $scope.currentPage;
            }
     
            //清除类名
            $scope.firstButtonClass = '';
            $scope.lastButtonClass = '';
            angular.forEach($scope.array,function(value,index){
                $scope['active'+index] = '';
            })
            //清除类名 end
                $scope['active'+this.$index] = $scope.activeClass;
                $scope.$index = this.$index;
                
                var firstItemValue = $scope.array[0]
                var lastItemValue = $scope.array[$scope.array.length-1]

                if ( $scope.currentPage == firstItemValue && $scope.currentPage> 2) {//第一个repeat的元素
                    
                        angular.forEach($scope.array,function(value,index,array){
                            if(index == 0){
                                $scope['active'+index] = ''
                            } else if( index == 1){
                                $scope['active'+index] = $scope.activeClass;
                            }
                        })
                    
                    $scope.resetArray(-1);
                    if($scope.array[0] == 2){
                        $scope.previous = false; 
                    }

                } else if ( $scope.currentPage == lastItemValue && $scope.currentPage<component.maxPage-1) {//最后一个repeat的元素

                        angular.forEach($scope.array,function(value,index,array){
                            if(index == array.length-1){
                                $scope['active'+index] = ''
                            }else if(index == array.length -2 ){
                                $scope['active'+index] = $scope.activeClass;
                            }
                        })
                    
                        $scope.resetArray(1);

                    if($scope.array[$scope.array.length-1] == component.maxPage-1){
                        $scope.next = false;
                    }
                } else if( $scope.currentPage == 1 ) {

                //改变选中状态(第一个按钮)
                    angular.forEach($scope.array,function(value,index){
                        $scope['active'+index] = '';
                    })
                    $scope.firstButtonClass = $scope.itemClass + ' ' + $scope.activeClass;
                //改变选中状态(第一个按钮) end    

                    $scope.previous = false;
                    $scope.initArray();
                } else if( $scope.currentPage == component.maxPage  ) {

                //改变选中状态(最后一个按钮)
                    angular.forEach($scope.array,function(value,index){
                        $scope['active'+index] = '';
                    })
                    $scope.lastButtonClass = $scope.itemClass + ' ' + $scope.activeClass;           
                //改变选中状态(最后一个按钮) end 

                    if(component.maxPage-$scope.showNumberButton>0){
                        $scope.previous = true;
                    }
                    $scope.next = false;
                    var tempArray = $scope.array;
                    for (var i = tempArray.length-1 ; i>=0 ; i--){
                        tempArray[i] = component.maxPage - (tempArray.length - i);
                    }
                    $scope.array = tempArray;
                }
                
            }

            $scope.goToPrePage = function(){
                
                $scope.currentPage--;
                angular.forEach($scope.array,function(value,index,array){
                    if($scope.currentPage == value){
                        $scope.$index = index;
                    }
                })
                $scope.go($scope.currentPage)

            }

            $scope.goToNextPage = function(){

                $scope.currentPage++;

                angular.forEach($scope.array,function(value,index,array){
                    if($scope.currentPage == value){
                        $scope.$index = index;
                    }
                })

                $scope.go($scope.currentPage)  
            }
        },
        link:function($scope){
            component.maxPage = $scope.maxPage;
            component.lastPage = 1;
            if(component.isFirstLoad){
                $scope.firstButtonClass = $scope.activeClass;
                component.isFirstLoad = false;
            }
            $scope.$watch('maxPage',function(newVal){
                $scope.initArray()
            },true)
            //初始化 显示数字按钮的数量和 非数字按钮的样式
            $scope.showNumberButton = $scope.showNumberButton ? $scope.showNumberButton : 6;            
            $scope.previousPageClass = $scope.previousPageClass ? $scope.previousPageClass : $scope.itemClass;
            $scope.nextPageClass = $scope.nextPageClass ? $scope.nextPageClass : $scope.itemClass;
            $scope.previousOmitClass = $scope.previousOmitClass ? $scope.previousOmitClass : $scope.itemClass;
            $scope.nextOmitClass = $scope.nextOmitClass ? $scope.nextOmitClass : $scope.itemClass; 
        }
    }
})
.value('component',{
    isFirstLoad:true,
    maxPage:0
})