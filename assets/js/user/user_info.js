$(function () {
    let layer = layui.layer;
    let form = layui.form;
    // 获取用户的基本信息
    getInfo()
    function getInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                // if (res.status !== 0) {
                //     return layer.msg('获取用户基本信息失败！')
                // }
                // // layer.msg('获取用户信息成功')
                // // layui 个表单赋值的语法：form.val('filter,object)
                // // 语法：form.val('filter', object);
                // filter  也就是要找的表单， 但前提是在class="layui-form" 这个表单中中找  并且写上lay-filter=""    
                // form.val("formfilterTest", { //filter 即  所在元素属性 lay-filter="" 对应的值 // form.val("userForm", res.data);
                //   需要注意：给表单赋值，这个是按照name属性来一一对应的
                form.val('userForm', res.data)
            }
        })
    }

    // 点击重置按钮，保留原来的昵称，在原来的为你昵称上进行修改即可，然后再次发起ajax请求即可
    $('#resetBtn').click(function (e) {
        e.preventDefault();
        // 发起ajax请求    
        getInfo()
    })

    // 更新提交用户的修改信息
    $('#userForm').on('submit', function (event) {
        event.preventDefault();
        // 快速收集表单数据
        let data = $(this).serialize();
        console.log(data);

        $.ajax({
            type: "POST",
            url: '/my/userinfo',
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败!");
                }
                layer.msg("更新用户信息成功");

                // 通过window.parent来获取到父页面（既index.html）
                window.parent.getAvatarAdd();
                // console.log(window.parent.getAvatarAdd);

            },
        });

    })
    // 表单校验功能   用户的昵称的校验   判断用户昵称的值不能大于6在做一个判断 
    form.verify({
        // 别忘了在结构中|nickname
        nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
            // console.log(value);
            if (value.length > 6) {
                return "昵称长度是在1-6个字符之间"
            }

        }
    });


})

