$(function () {
    var isEdit = Number(getPathNmaeValue(location.href,"isEdit"));
    var id = null;
    var url = null;
    console.log(isEdit);

    /*编辑操作*/
    if (isEdit) {
        var address = JSON.parse(localStorage.getItem("address"));
        url="/address/updateAddress";
        id=address.id;
        var html=template("fromBox",address);
        $("#formBox").html(html);
    } else {    //添加操作
        url="/address/addAddress";
        var html=template("fromBox",{});
        $("#formBox").html(html);
    }

    //创建picker选择器 (选择器允许您对元素组或单个元素进行操作。)
    var picker = new mui.PopPicker({layer:3});
    picker.setData(cityData);

    $("#addAddressBtn").on("tap",function () {
        var name = $.trim($("input[name='name']").val());
        var postcode = $.trim($("input[name='postcode']").val());
        var city = $.trim($("input[name='city']").val());
        var address = $.trim($("input[name='address']").val());

        if (!name) {
            mui.toast("请输入收货人姓名");
            return;
        }
        if (!postcode) {
            mui.toast("请输入邮编");
            return;
        }
        if (!city) {
            mui.toast("请输入省市区");
            return;
        }
        if (!address) {
            mui.toast("请输入详细地址");
            return;
        }

        $.ajax({
            url:url,
            type:"post",
            data:{
                address:city,
                addressDetail:address,
                recipients:name,
                postcode:postcode,
                id:id
            },
            success:function (response) {
                if (response.success) {
                    if (isEdit) {
                        mui.toast("修改地址成功！");
                    } else {
                        mui.toast("添加地址成功！");
                    }
                    setTimeout(function () {
                        location.href="adress.html";
                    },2000)
                }
            }
        })
    })
    
    $("input[name='city']").on("tap",function () {
        This = this;
        picker.show(function (selectItems) {
            $(This).val(selectItems[0].text+selectItems[1].text+selectItems[2].text);
        });
    })
})

function getPathNmaeValue(url,name) {
    var index = url.indexOf("?");
    var keyStr = url.substring(index+1);

    var keyArr = keyStr.split("&");
    for (var i=0; i <keyArr.length;i++) {

        var valueAArr = keyArr[i].split("=");
        if (valueAArr[0]==name) {
            return valueAArr[1];
        }
    }
}