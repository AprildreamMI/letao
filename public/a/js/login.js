$.ajax({
	url: '/employee/checkRootLogin',
	type: 'get',
	async: false,
	success: function(res){

		if(res.success){

			location.href = "user.html";

		}
		
	}
});

$(function(){

	/**
	 * 登录
	 * 1.获取登录按钮并且添加点击事件
	 * 2.获取用户输入的用户名和密码
	 * 3.对用户输入的表单信息进行验证
	 * 4.调用登录接口实现登录
	 * 5.登录成功 跳转到用户管理页面
	 */
	
	$('#login-button').on('click', function(){

		var username = $.trim($("[name='username']").val());
		var password = $.trim($("[name='password']").val());

		if(!username){
			alert("请输入用户名");
			return;
		}

		if(!password){
			alert("请输入密码");
			return;
		}

		$.ajax({
			url: '/employee/employeeLogin',
			type: 'post',
			data: {
				username: username,
				password: password
			},
			success: function(res){

				if(res.success){

					// 登录成功
					location.href = "user.html";

				}else {

					alert(res.message);

				}
				
			}
		});

	});

});