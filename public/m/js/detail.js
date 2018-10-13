$(function () {
    var id = getPathNmaeValue(location.href,"id");
    var size = null;
    var detailNum = null;

    $.ajax({
        url:"/product/queryProductDetail",
        type:"get",
        data:{
            id:id
        },
        success:function (response) {
            var html = template("productTpl",response);
            $("#product-box").html(html);

            //获得slider插件对象  需要重新初始化一下
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });

    $("#product-box").on("tap",".size span",function () {
        $(this).addClass("active").siblings("span").removeClass("active");
        size = $(this).html();
    });

    $("#reduce").on("tap",function () {
        var num = $("#inp").val();
        num--;
        if (num <1) {
            num=1;
        }
        detailNum = num;
        $("#inp").val(num);

    });
    $("#increase").on("tap",function () {
        var num = $("#inp").val();
        num++;
        if (num >44) {
            num=44;
        }
        detailNum = num;
        $("#inp").val(num);
    });

    $("#addCart").on("tap",function () {
        if (!size) {
            mui.toast("请选择尺码");
            return;
        }

        if (!detailNum) {
            mui.toast("请选择数量");
            return;
        }
        $.ajax({
            url:"/cart/addCart",
            type:"post",
            data:{
                productId:id,
                num:detailNum,
                size:size
            },
            success:function (response) {
                console.log(1);
                if (response.success){
                    mui.confirm("加入购物车成功，是否跳转购物车",function (message) {
                        if (message.index) {
                            location.href="cart.html";
                        }
                    })
                } else {
                    mui.toast("添加购物车失败");
                }
            }
        });
    })
})

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