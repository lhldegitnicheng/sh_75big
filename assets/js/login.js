$(function () {
    //   点击去注册  让登录隐藏  显示注册页面 
    $('#logoPagefr').click(function () {
        // alert(11)
        $('.RegPage').show();
        $('.logoPage').hide();
    })
    // 点击去登录，让登录显示，让注册隐藏
    $('#RegPagefl').click(function () {
        $('.logoPage').show();
        $('.RegPage').hide();
    })
    // 表单验证

    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value, item) { //value：表单的值、item：表单的DOM对象
            //    打印的是再次确认密码的，因为是repass进行和确认密码进行校验
            // console.log(value);
            // return ('两次密码不一致！')
            let pwd = $(".RegPage input[name=password]").val();

            if (value !== pwd) {
                return ('两次密码不一致！')
            }
        }

    });

    // 提交表单 收集提交表单数据，在发起注册ajax请求
    $('#RegPageForm').on('submit', function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        // console.log(data); 
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('注册失败' + res.message);
                }
                layer.msg('注册成功')
                // 注册成功之后
                $('#RegPagefl').click()
            }
        })

    })

    // // 提交表单 收集提交数据，在发起登录的ajax请求
    $('#logoPageform').on('submit', function (e) {
        e.preventDefault();
        // alert(11)
        // 收集表单数据 
        let data = $(this).serialize();
        console.log(data);
        // 发起ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败！' + res.message)
                }

                // 登录成功之后，需要把登录成功之后的命令牌token保存在本地存储里面，方便后面的登录的身份认证
                // 服务器响应回来的token是字符串，因为本地存储只能数组或者对象   但是从后台拿过来的token直接是字符串  所以可以直接是用本地存储，不用转换成字符串

                localStorage.setItem('token', res.token);
                layer.msg('登录成功！即将跳往后台首页', function () {
                    location.href = 'index.html'
                });

            }
        })

    })

})

