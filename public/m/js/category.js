$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        success:function (response) {
            //测试响应
            // console.log(response);

            var leftHtml=template("category-first",{request:response.rows});
            // console.log(leftHtml);
            $('.left-links').html(leftHtml)
        }
    });

    $('.left-links').on('click','a',function () {
        var aId=$(this).attr("data-id");
        // $(this).siblings("a").parent("li").removeClass("active");
        $('.left-links li').removeClass("active");
        $(this).parent("li").addClass("active");
        $.ajax({
            url:"/category/querySecondCategory",
            type:"get",
            data:{
                id:aId
            },
            success:function (response) {
                var rightHtml=template("category-last",response);
                // console.log(rightHtml);
                $('.right-nav').html(rightHtml);
            }
        })
    })
})