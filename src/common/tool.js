import $store from "./store";

//提示
function showSuccess(message, time){
    time = time?time:3;
    let num = new Date().getTime();
    $('body').append(`
        <div class="tool_toastk tool_succ_toast tool_toast_${num}">
            <span class="tool_toast_text">${message}</span>
        </div>
    `);
    $('.tool_toast_'+num).fadeIn('fast');
    setTimeout(function(){
        $('.tool_toast_'+num).fadeOut('fast');
        setTimeout(()=>{
            $('.tool_toast_'+num).remove();
        },300)
    },time*1000)
}
//错误提示
function showError(message, time){
    time = time?time:3;
    let num = new Date().getTime();
    $('body').append(`
        <div class="tool_toastk tool_err_toast tool_toast_${num}">
            <span class="tool_toast_text">${message}</span>
        </div>
    `);
    $('.tool_toast_'+num).fadeIn('fast');
    setTimeout(function(){
        $('.tool_toast_'+num).fadeOut('fast');
        setTimeout(()=>{
            $('.tool_toast_'+num).remove();
        },300)
    },time*1000)
}

//显示loading
function showloading(message){
    $('body').append(`
        <div class="tool_loading">
          <img class="tool_loading_img" src="./static/img/loadicon.png" alt="">
          <div class="tool_loading_text">${message||''}</div>
        </div>
    `);
    $('.tool_loading').fadeIn('fast');
}
//隐藏loading
function hideloading(){
    $('.tool_loading').fadeOut('fast');
    setTimeout(()=>{
        $('.tool_loading').remove();
    },300)
}

//确认弹窗
function showconfim(obj){
    // obj = {
    //      text : '显示文字',
    //      cancel_text : '取消文字',
    //      submit_text : '确定文字',
    //      cancelfn : 取消回调函数,//不写取消事件 则取消按钮隐藏
    //      submitfn : 成功回调函数,
    // }
    // return jquery元素 用于移除弹窗
    let num = new Date().getTime();
    $('body').append(`
       <div class="tool_confimk tool_confim_${num}">
            <div class="tool_confim_mould">
                <div class="tool_confim_text">${obj.text}</div>
                <div class="tool_confim_btns">
                    ${obj.cancelfn?`<div class="tool_confim_btn tool_confim_btn_cancel">${obj.cancel_text||'取 消'}</div>`:''}
                    <div class="tool_confim_btn tool_confim_btn_submit">${obj.submit_text||'确 定'}</div>
                </div>
            </div>
        </div>
    `);
    let el = $(`.tool_confim_${num}`)
    el.fadeIn('fast');
    el.on("click",'.tool_confim_btn_cancel',function(e){
        if(obj.cancelfn){
            obj.cancelfn()
        }
    }).on("click",'.tool_confim_btn_submit',function(e){
        if(obj.submitfn){
            obj.submitfn()
        }
    })
    return el
}

// 监听滚动 触发元素进入动画
function runScroll(idobj){
    for(let key in idobj){//先隐藏需要执行动画的的元素
        $(idobj[key].el).hide();
    }
    handleScroll(idobj)
    window.addEventListener('scroll', function (){
        handleScroll(idobj)
    })
}
function handleScroll (idobj) { // 实现当滚动到指定位置，触发动画
    //idobj = {'#tempk':{el:'.temp'，animate：'fadeIn'}} key=>触发元素 el=>操作元素 animate=>要添加的class
    for(let key in idobj){
        if(!idobj[key].show){
            gdjz(key, 200, () => {
                // console.log(key)
                idobj[key].show = true
                $(idobj[key].el).show().addClass(idobj[key].animate);
            })
        }
    }
}
function gdjz (el, offset, callback) {
    let dom = document.querySelector(el)
    if(dom){
        var a,b,c,d;
        d = getElementToPageTop(dom) // 元素距离相对父级的高度，这里父级指的是body
        a = eval(d + offset)
        b = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop //  获取窗口滚动条高度
        c = document.documentElement.clientHeight || document.body.clientHeight // 获取浏览器可视区的高度
        // console.log(b , c , a)
        if( b + c > a ) {
            callback && callback()
        }
    }
}
function getElementToPageTop(el) {
    if(el.parentElement) {
        return el.parentElement.offsetTop + el.offsetTop
    }
    return el.offsetTop
}

//获取html名
function getpagename(){
    return location.pathname.slice(location.pathname.lastIndexOf("/")+1)
}

//Handlebars渲染页面
function runHandlebar(data,template,placeholder,isappend){
    var temp = Handlebars.compile($("#" + template).html());
    if(isappend=='prepend'){
        $("#" + placeholder).prepend(temp({
            datas: data
        }));
    }else if(isappend){
        $("#" + placeholder).append(temp({
            datas: data
        }));
    }else{
        $("#" + placeholder).html(temp({
            datas: data
        }));
    }
}

//获取html参数
function getQuery(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return decodeURI(pair[1]);}
    }
    return(false);
}

//加载语言包
function loadProperties(callback){
    jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
        name:'strings', //资源文件名称
        path:'./static/i18n/', //资源文件路径
        mode:'map', //用Map的方式使用资源文件中的值
        language:$store.state.language,
        callback: function(res) {//加载成功后设置显示内容
            callback()
        }
    });
}

//时间格式化
function  formattime(time,format,nottext) {
    //time时间 format格式 nottext空文本
    //format示例：
    //"yyyy年MM月dd日"
    //"MM/dd/yyyy"
    //"yyyyMMdd"
    //"yyyy-MM-dd hh:mm:ss"
    if(time){
        let date ;
        if(typeof time == 'string'){
            date = new Date(time.replace(/\-/ig,'/'));
        }else{
            date = new Date(time)
        }
        var o = {
            "M+" : date.getMonth()+1, //month
            "d+" : date.getDate(), //day
            "h+" : date.getHours(), //hour
            "m+" : date.getMinutes(), //minute
            "s+" : date.getSeconds(), //second
            "q+" : Math.floor((date.getMonth()+3)/3), //quarter
            "S" : date.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        return format;
    } else {
        return nottext?nottext:'';
    }
}

export default {
    showloading,
    hideloading,
    showconfim,
    showSuccess,
    showError,
    runScroll,
    getpagename,
    runHandlebar,
    getQuery,
    loadProperties,
    formattime
}
