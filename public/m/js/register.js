$(function () {

    $("#registerBtn").on("tap",function () {
        var username = $("input[name='username']").val();
        var mobile = $("input[name='mobile']").val();
        var password = $("input[name='password']").val();
        var aginPassword = $("input[name='aginPassword']").val();
        var vCode = $("input[name='vCode']").val();

        if (!username) {
            mui.toast("请输入用户名");
            return;
        }

        if (mobile < 11) {
            mui.toast("请输入正确的手机号");
            return;
        }

        if (!password) {
            mui.toast("请输入密码");
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
            url:"/user/register",
            type:"post",
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success:function (response) {
                if (response.success) {
                    mui.toast("注册成功");
                    setTimeout(function () {
                        location.href="login.html";
                    },2000);
                } else {
                    mui.toast("注册失败"+response.message);
                }
            }
        });

    });


    /*获取验证码*/
    $("#getVerify").on("tap",function () {
        $.ajax({
            url:"/user/vCode",
            type:"get",
            success:function (response) {
                alert(response.vCode);
            }
        });
    });
})