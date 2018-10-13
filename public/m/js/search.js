$(function () {

    var keyArr=[];
    $('.search-from button').on("click",function () {
        var inputVal=$(this).siblings("input").val();
        if (inputVal) {

            keyArr.push(inputVal);
            //本地存储存储数据
            window.localStorage.setItem("keyArr",JSON.stringify(keyArr));

            //跳转到结果集页面
            location.href="search-result.html?key="+inputVal;
        } else {
            alert("请输入商品名称");
        }
    })

    $('.history-clear').on('click',function () {
        $("#history-ul").html("");
        window.localStorage.removeItem("keyArr");
    })

    if (window.localStorage.getItem("keyArr")) {
        //直接拿出来的事拿出的JSON字符串
        //JSON转化为数组
        keyArr=JSON.parse(window.localStorage.getItem("keyArr"));
        // console.log(keyArr);
        var historyHtml = template("search-history",{result:keyArr});
        console.log(historyHtml);
        $("#history-ul").html(historyHtml);
    }

})