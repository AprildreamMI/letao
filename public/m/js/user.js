var res = null;
$.ajax({
    url:"/user/queryUserMessage",
    type:"get",
    async:false,
    success:function (response) {
        res = response;
        if (response.error && response.error==400) {
            location.href="login.html";
        }
    }
})
$(function () {
    var html = template("userList",res);
    $("#userListBox").html(html);
    $("#loginOut").on("tap",function () {
        $.ajax({
            url:"/user/logout",
            type:"get",
            success:function (response) {
                if (response.success) {
                    mui.toast("退出登录成功！");
                    setTimeout(function () {
                        location.href="index.html";
                    },2000)
                }
            }
        })
    })

})