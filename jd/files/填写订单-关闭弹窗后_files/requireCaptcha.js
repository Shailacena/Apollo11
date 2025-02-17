// 测试环境模拟加载js
var JdCaptcha = null; // 声明全局Jcap对象
var jcapLoadCreate = (function (loaded) {
    var loaded = false;
    var pubFn = [];
    var info = {tdat_version: 99992,host: "jcap.m.jd.com",tdat_ctx:"23130303037303236454145424647333930364347354831453137323142373636383333363233303033333234454636454541433246344546333730344346493333373831483530334233303035313030303"};
    var js_url = "//storage.360buyimg.com/jsresource/jcap/js/v1.0.1/captcha_mobile_2025_02_11.ta4kp5.min.js", c_url = "//h5.360buyimg.com/jcap/js/jcap_2020_04_27.min.js";
    var has_c_url = false;
    var length = document.scripts.length;
    for (var I = 0; I < length; I++) {
        var src = document.scripts[I].src
        if (src.indexOf(c_url) > 0) { has_c_url = true };
    }
    for (var index = 0; index < 2; index++) {
        var script = document.createElement('script');
        var head = document.getElementsByTagName('head')[0];
        if (index == 0) {
            if (!has_c_url) {
                script.setAttribute('type', 'text/javascript');
                script.src = c_url;
            }
        }
        else {
            script.src = js_url;
            script.onload = script.onreadystatechange = function () {
                if (!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))) {
                    script.onload = script.onreadystatechange = null;
                    loaded = true;
                    JdCaptcha = window.jdCAP ? jdCAP.captcha(info) : captcha(info);  // 初始化验证码
                    if (pubFn.length > 0) {
                        for (var i = pubFn.length; i > 0; i--) {
                            var fnitem = pubFn.shift();
                            if (typeof fnitem == 'function') fnitem(JdCaptcha());
                        }
                    }
                }
            }
        }
        head.appendChild(script);
    }

    return function (option, callback) {
        var handle = function (Jcap_vue) {
            try {
                if (typeof callback == 'function') { // 老版初始化
                    Jcap_vue.setCachaOption(option); // 初始化保存参数
                    callback(Jcap_vue); // 回调函数
                    // if(typeof option.onLoad == 'function'){ // 初始化完成调load方法
                    //     option.onLoad(); // 回调函数
                    // }
                    return
                }
                Jcap_vue.create(option);
            } catch (e) { }
        }
        if (!loaded) { // 未加载完成
            pubFn.push(handle)
            return
        }
        handle(JdCaptcha()); // 已加载完
    }
})();
// JdCaptcha.create = jcapLoadCreate;  // 全局
var captchaLoadJS = function (option, callback) {
    jcapLoadCreate(option, callback);
}



