$(function(){

	/**
	 * 获取用户列表
	 */
	
	$.ajax({
		url: '/user/queryUser',
		type: 'get',
		data: {
			page: 1,
			pageSize: 10
		},
		success: function(res) {
			console.log(res);

			var html = template("userTpl", res);

			$('#user-box').html(html)
			
		}
	});

	/**
	 * 用户的状态管理
	 * 1.获取操作按钮 并且添加点击事件
	 * 2.判断当前操作是禁用操作还是启用操作
	 * 3.根据当前的操作 调用接口 传递不同的参数
	 * 4.刷新页面
	 */
	
	$('#user-box').on('click', '.edit-btn', function(){

		// 当前用户的状态
		var isDelete = $(this).attr('data-isdelete');

		// 用户ID
		var id = $(this).attr('data-id');

		$.ajax({
			url: '/user/updateUser',
			type: 'post',
			data: {
				id: id,
				isDelete: isDelete ? 0 : 1
			},
			success: function(res) {

				if(res.success){

					location.reload();
					
				}

			}
		})

	});

});