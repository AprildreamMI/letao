$(function(){

	/**
	 * 获取二级分类数据并展示在页面中
	 */

	var page = 1;
	var pageSize = 10;
	var totalPage = 0;

	// 获取第一页的数据
	getData();

	// 获取下一页的数据
	$('#nextBtn').on('click', function(){

		page++;

		if(page > totalPage) {

			page = totalPage;

			alert("已经是最后一页了");

			return;

		}

		// 获取下一页的数据
		getData();

	});

	// 获取上一页的数据
	$('#prevBtn').on('click', function(){

		page--;

		if(page < 1) {

			page = 1;

			alert("已经是第一页了");

			return;

		}

		// 获取下一页的数据
		getData();

	});

	function getData(){

		$.ajax({
			url: '/category/querySecondCategoryPaging',
			type: 'get',
			data: {
				page: page,
				pageSize: pageSize
			},
			success: function(res) {

				// console.log(res);

				// 总页数
				totalPage = Math.ceil(res.total / pageSize);

				var html = template("categorySecondTpl", res);

				$('#categorySecondBox').html(html);

			}
		});

	}

	/**
	 * 二级分类添加
	 * 1.获取一级分类的数据并显示在选择框中
	 * 2.图片文件上传
	 * 3.调用接口 实现二级分类数据添加
	 */
	
	$.ajax({
		url: '/category/queryTopCategoryPaging',
		type: 'get',
		data: {
			page: 1,
			pageSize: 100
		},
		success: function(res){
			
			var html = template("categoryFirstTpl",res);

			$('#categoryFirstBox').html(html);

		}
	});

	var previewImg = "";

	// 上传图片
	$('#fileUpload').fileupload({
       dataType: 'json',
       done: function (e, data) {
           
           console.log(data.result.picAddr);

           // 上传图片预览
           $('#preview').attr("src",data.result.picAddr);

           previewImg = data.result.picAddr;

       }
   	});

	// 实现二级分类的添加
   	$('#save').on('click',function(){

   		var categoryId = $.trim($("[name='categoryId']").val());

   		var brandName = $.trim($("[name='brandName']").val());

   		$.ajax({
   			url: '/category/addSecondCategory',
   			type: 'post',
   			data: {
   				brandName: brandName,
   				categoryId: categoryId,
   				brandLogo: previewImg,
   				hot: 0
   			},
   			success: function(res){

   				if(res.success){

   					location.reload();

   				}
   				
   			}
   		})

   	});



});