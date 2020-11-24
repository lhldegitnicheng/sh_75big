// ajax基本配置项，配置url地址
$.ajaxPrefilter(function (options) {
    // 在每次发送ajax之前会执行该函数，通过该git函数的形参options可以回去到每次ajax的配置项
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);

})
