import './index.less'
import $tool from '../../common/tool.js'
import $store from '../../common/store.js'
import $ajax from '../../common/ajax.js'

$(function(){
    //加载语言包
    $tool.loadProperties(res=>{
        let html = [
                'string_user_login_tip','string_user_phone','string_user_phone_code','string_user_login'
            ]
        html.forEach(item=>{
            $("."+item).html($.i18n.prop(item))
        })

        $(".string_user_phone_input_tip").attr('placeholder',$.i18n.prop('string_user_phone_input_tip'))
        $(".string_user_phone_code_input_tip").attr('placeholder',$.i18n.prop('string_user_phone_code_input_tip'))
    });

    $(".login_close").on("click",function(){
        $(".login_main").fadeOut("fast")
    })

    codeinit()
    forminit()
});

function forminit(){
    $("#submit").on("click",async function(){
        let name = {
            code: $.i18n.prop('string_user_phone_code_input_tip'),
            phone:$.i18n.prop('string_user_phone_input_tip'),
        }
        var formdata = {};
        var arrdata = $('#login_form').serializeArray();
        for(let item of arrdata){
            formdata[item.name] = item.value;
            if(!item.value){
                return show_err_info(name[item.name]);
            }
        }
        hide_err_info();
        let res = await $ajax.request("POST","/op/login",{
            username:formdata.phone,
            password:formdata.code,
        })
        if(res.code != 200){
            return $tool.showError(res.err||res.message||$.i18n.prop('string_request_failed'));
        }

        $store.setstate.token(res.data.sid)
        $store.setstate.userinfo(res.data)
        location.reload()
    })
}

function show_err_info(err){
    $('.err_info').html(err).show()
}
function hide_err_info(err){
    $('.err_info').hide()
}

function codeinit(){
    let time = 0;
    let t = null;
    $(".input_getcode").on("click",async function(){
        var phone = $('.input_phone').val();
        if(t){
            return
        }
        if(!phone){
            return show_err_info($.i18n.prop('string_user_phone_input_tip'));
        }
        let formdata = {
            mobile:phone
        }
        hide_err_info();
        let res = {
            code : 200
        }
        // let res = await $ajax.request("GET","",formdata)
        if(res.code != 200){
            return $tool.showError(res.err||res.message||$.i18n.prop('string_request_failed'));
        }
        $tool.showSuccess($.i18n.prop('string_request_code_sent'))
        runtime($(this))
    })

    function runtime(el){
        time = 60
        el.html(`${time}`).addClass('disabled')
        t = setInterval(function(){
            if(time==0){
                return stoptime(el);
            }
            time--
            el.html(`${time}`)
        },1000)
    }
    function stoptime(el){
        el.html($.i18n.prop('string_phone_code_button_tip')).removeClass('disabled')
        if(t){
            clearInterval(t)
            t=null;
        }
    }
}
