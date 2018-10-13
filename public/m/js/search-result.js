
var page = 1;
var resultHtml = "";
var keyValue = getPathNmaeValue(location.href,"name");
var priceStore = 1;
var numStore = 1;
var This = null;

$(function () {
    mui.init({
        pullRefresh : {
            container: "#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :function () {
                    This = this;
                    getPageData(This);
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    $("#priceButton").on("tap",function () {
        priceStore = priceStore == 1 ? 2 : 1;
        resultHtml = "";
        page = 1;
        mui("#refreshContainer").pullRefresh().refresh(true);
        getPageData(This);
    });
    $("#numButton").on("tap",function () {
        numStore = numStore == 1 ? 2 : 1;
        resultHtml = "";
        page = 1;
        mui("#refreshContainer").pullRefresh().refresh(true);
        getPageData(This);
    });
});

/*通过URL来分割字符串，获取key*/
function getPathNmaeValue(url,name) {
    var index = url.indexOf("?");
    var keyStr = url.substring(index+1);

    var keyArr = keyStr.split("&");
    for (var i=0; i <keyArr.length;i++) {

        var valueAArr = keyArr[i].split("=");
        if (valueAArr[0]==name) {
            return valueAArr[1];
        }
    }
}

/*主体部分必须是 position: absolute;*/
function getPageData(This) {
    $.ajax({
        url:"/product/queryProduct",
        type:"get",
        data:{
            page:page++,
            pageSize:3,
            proName:keyValue,
            price:priceStore,
            num:numStore
        },
        success:function (response) {
            if (response.data.length > 0 ) {
                resultHtml += template("resultTemplate",response);
                $("#resultUl").html(resultHtml);
                //加载完毕
                This.endPullupToRefresh(false);
            } else  {
                //没有更多数据了
                This.endPullupToRefresh(true);
            }
        }

    });
}

