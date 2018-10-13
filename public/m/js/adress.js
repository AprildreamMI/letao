$(function () {

    /*查询所有收货地址*/
    $.ajax({
        url:"/address/queryAddress",
        type:"get",
        success:function (response) {
            res = response;
            var html = template("adressList",{result:response});
            $("#adressBox").html(html);
        }
    });

    var res = null;
    /*删除地址*/
    $("#adressBox").on("tap",".mui-btn-red",function () {
        This = this;
        mui.confirm("确认要删除吗？",function (message) {

            var id = $(This).attr("data-id");
            //确定要删除
            if (message.index == 1) {
                $.ajax({
                    url:"/address/deleteAddress",
                    type:"post",
                    data:{
                        id:id
                    },
                    success:function (response) {
                        if (response.success) {
                            mui.toast("删除地址成功！");
                            setTimeout(function () {
                                location.reload();
                            },1000)
                        } else {
                            mui.toast("删除地址失败！");
                        }
                    }
                });
            } else {
                mui.swipeoutClose(This.parentNode.parentNode);
            }
        });
    });

    /*编辑收货地址*/
    $("#adressBox").on("tap",".mui-btn-blue",function () {
        var id = $(this).attr("data-id");
        for (var i =0;i<res.length;i++) {
            if (res[i].id == id) {
                console.log(res[i]);
                window.localStorage.setItem("address",JSON.stringify(res[i]));
                location.href="addAdress.html?isEdit=1";
            }
        }
    })
})