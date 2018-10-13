$(function () {
    $("#updateBtn").on("tap",function () {

        var oldpassword = $.trim($("input[name='oldpassword']").val());
        var password = $.trim($("input[name='password']").val());
        var aginPassword = $.trim($("input[name='aginPassword']").val());
        var vCode = $.trim($("input[name='vCode']").val());

        console.log(vCode);
        if (!oldpassword) {
            mui.toast("请输入原密码");
            return;
        }

        if (!password) {
            mui.toast("请输入新密码");
            return;
        }

        if (password!=aginPassword) {
            mui.toast("两次密码不一致");
            return;
        }

        if (!vCode) {
            mui.toast("请输入验证码");
            return;
        }

        $.ajax({
            url:"/user/updatePassword",
            type:"post",
            data:{
                oldPassword:oldpassword,
                newPassword:password,
                vCode:vCode
            },
            success:function (response) {
                mui.toast("修改密码成功！");
                setTimeout(function () {
                    location.href="login.html";
                },2000)
            }
        });

    })

    /*获取验证码*/
    $("#getVerify").on("tap",function () {
        $.ajax({
            url:"/user/vCodeForUpdatePassword",
            type:"get",
            success:function (response) {
                alert(response.vCode);
            }
        });
    });
})