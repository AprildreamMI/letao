/**
 * 登录拦截
 */

$.ajax({
	url: '/employee/checkRootLogin',
	type: 'get',
	async: false,
	success: function(res){

		if(res.error && res.error == 400){

			location.href = "login.html";

		}
		
	}
});

$(function(){

	/**
	 * 退出
	 * 1.获取退出按钮并且添加点击事件
	 * 2.调用退出接口实现退出功能
	 */

	$('.login_out_bot').on('click', function(){

		if(confirm("确定要退出吗?")) {

			$.ajax({
				url: '/employee/employeeLogout',
				type: 'get',
				success: function(res){

					if(res.success){

						location.href = "login.html";

					}else {

						alert(res.message);

					}

				}
			});

		}

	});
































	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});