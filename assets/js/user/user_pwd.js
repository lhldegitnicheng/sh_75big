$(function () {
    let form = layui.form;
    let layer = layui.layer;
    // 先校验表单  然后在发起ajax请求
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 需要校验1，一个是新密码和原密码相比较  一个是确认密码和新密码相比较
        newPwd: function (value) { //value：表单的值、item：表单的DOM对象
            //    value是新密码的值
            console.log(value);
            // 获取旧密码的值
            let oldPwd = $('[name=oldPwd]').val()
            // console.log(oldPwd, value); 
            if (value === oldPwd) {
                return "新密码和原密码不能一致"
            }
        },
        //进行第二次校验，检验新密码和确认密码需要保持一致 
        samePwd: function (value) { //value：表单的值、item：表单的DOM对象
            //    value是确认密码的值
            console.log(value);
            // 获取新密码的值
            let newPwd = $('[name=newPwd]').val();
            console.log(newPwd, value);
            if (value !== newPwd) {
                return "修改的两次密码不一致，请重新确认密码"

            }
        }
    });
    // 重置密码发起ajax请求
    $('#pwdForm').on('submit', function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        // console.log(data); 
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("重置密码失败 " + res.message);
                }
                layer.msg("重置密码成功!");


                // 重置表单中的密码框内容,用原生的docment 对象里面的方法reset（）  注意需要转换一下
                $('#pwdForm').get(0).reset();
            }

        })
    })


})