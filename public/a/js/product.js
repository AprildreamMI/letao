$(function(){

	/**
	 * 商品的列表数据获取并展示在页面中
	 */

	$.ajax({
		url: '/product/queryProductDetailList',
		type: 'get',
		data: {
			page: 1,
			pageSize: 20
		},
		success: function(res){

			// console.log(res);

			var html = template("productTpl", res);

			$('#productBox').html(html);

		}
	});


	/**
	 * 添加商品
	 * 1.获取二级分类并展示在选择框中
	 * 2.实现图片上传
	 * 3.实现添加商品
	 */

	$.ajax({
		url: '/category/querySecondCategoryPaging',
		type: 'get',
		data: {
			page: 1,
			pageSize: 100
		},
		success: function(res){

			console.log(res);

			var html = template("secondTpl", res);

			$('#secondBox').html(html);

		}
	});


	var imageArray = [];

	$('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {

	    	imageArray.push(data.result);

	    }
	});


	$('#addProduct').on('click', function(){

		var proName = $.trim($("[name='proName']").val());
		var oldPrice = $.trim($("[name='oldPrice']").val());
		var price = $.trim($("[name='price']").val());
		var proDesc = $.trim($("[name='proDesc']").val());
		var size = $.trim($("[name='size']").val());
		var num = $.trim($("[name='num']").val());
		var brandId = $.trim($("[name='brandId']").val());

		$.ajax({
			url: '/product/addProduct',
			type: 'post',
			data: {
				proName: proName,
				oldPrice: oldPrice,
				price: price,
				proDesc: proDesc,
				size: size,
				num: num,
				brandId: brandId,
				statu: 1,
				pic: imageArray
			},
			success: function(res){

				if(res.success){

					location.reload();

				} else {

					alert(res.message);

				}
				
			}
		})

	});

});