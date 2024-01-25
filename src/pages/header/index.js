import './index.less'
import $store from '../../common/store.js'
import $ajax from "../../common/ajax";
import $tool from "../../common/tool";

$(function(){
    istop()
    $(document).scroll(istop)
    let href = $tool.getpagename()||'index.html';
    $('.header_tablist .tabitem[href="./'+href+'"]').addClass('active')
        .siblings('.active').removeClass('active')

    //加载语言包
    $tool.loadProperties(res=>{
        let html = [
                'string_user_login'
            ]
        html.forEach(item=>{
            $("."+item).html($.i18n.prop(item))
        })
    });

    logininit()
    langinit()
})
function langinit(){
    $(".header_langiconk").on("focus",function(){
        $(".lang_set").fadeIn("fast")
    }).on("blur",function(){
        $(".lang_set").fadeOut("fast")
    }).on("click",function(){
        $(this).focus()
    }).on("click",'.setitem',function(e){
        e.preventDefault();
        e.stopPropagation();
        $store.setstate.language($(this).data('lang'))
    })
}
function logininit(){
    if($store.state.token){
        if($store.state.userinfo.headpic){
            $(".user_img").attr('src',$store.state.userinfo.headpic||'./static/img/userhead.png')
        }
        $(".header_login").hide();
        $(".header_userk").show();
        $(".header_user").on("focus",function(){
            $(".user_set").fadeIn("fast")
            $(this).addClass('active')
        }).on("blur",function(){
            $(".user_set").fadeOut("fast")
            $(this).removeClass('active')
        }).on("click",function(){
            $(this).focus()
        })
        $("#loginout").on("click",async function(){
            $store.setstate.token('')
            $store.setstate.userinfo({})
            location.href='./index.html'
        })
    }else{
        $(".header_login").show();
        $(".header_userk").hide();
    }
    $('#login').load('./login.html');
    $(".header_login").on("click",function(){
        $(".login_main").fadeIn("fast")
    })
}
function istop(){
    var scroH = $(document).scrollTop();  //滚动高度
    if (scroH > 1) {  //距离顶部大于1px时
        $('.header_main').addClass('notop')
    }else{
        $('.header_main').removeClass('notop')
    }
}
