$(function () {
    $("#loginBtn").on("tap",function () {
        var username = $.trim($("input[name='username']").val());
        var password = $.trim($("input[name='password']").val());

        if (!username) {
            mui.toast("请输入用户名");
            return;
        }

        if (!password) {
            mui.toast("请输入密码");
            return;
        }

        $.ajax({
            url:"/user/login",
            type:"post",
            data: {
                username:username,
                password:password
            },
            success:function (response) {
               if (response.success) {
                   mui.toast("登录成功");
                   setTimeout(function () {
                       location.href="user.html";
                   },2000);
               }
            }
        });

    })
})