import '../../common/common.less';
import './index.less';
import '../../common/common.js';
import $tool from '../../common/tool.js';
import $store from '../../common/store.js';
import $ajax from '../../common/ajax.js';

$(function(){
    //加载语言包
    $tool.loadProperties(res=>{
        let html = [

            ]
        html.forEach(item=>{
            $("."+item).html($.i18n.prop(item))
        })
    });

    toolinit();

    getdata();
});

function toolinit(){
    $(".showSuccess").on("click",function(){
        $tool.showSuccess('这是一个提示框')
    })
    $(".showError").on("click",function(){
        $tool.showError('这是一个错误提示框')
    })
    $(".showloading").on("click",function(){
        $tool.showloading('正在展示load...')
        setTimeout(()=>{
            $tool.hideloading()
        },3000)
    })
    $(".showconfim").on("click",function(){
        let $el = $tool.showconfim({
             text : '这是一个确认框',
             cancel_text : '取消',
             submit_text : '确定',
             cancelfn : ()=>{
                 $el.fadeOut("fast")
             },//不写取消事件 则取消按钮隐藏
             submitfn : ()=>{
                 $el.fadeOut("fast")
             },
        })
    })
}

async function getdata(){
    // 接口请求
    // let res = $ajax.request("GET","/list",{
    //     currentPage:1,
    //     pageCount:7
    // })
    // if(res.code == 200){
    //     $tool.runHandlebar(res.data,'template_listblock','placeholder_listblock')
    // }
    let data = [{
        id:'1',
        url:'https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_40c4f13.svg',
        name:'百度翻译',
        duction:'提供即时免费的中文、英语、日语、韩语、法语、德语、俄语、西班牙语、葡萄牙语、越南语、印尼语、意大利语、荷兰语全文翻译、网页翻译、文档翻译服务。'
    },{
        id:'2',
        url:'https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_40c4f13.svg',
        name:'百度翻译',
        duction:'提供即时免费的中文、英语、日语、韩语、法语、德语、俄语、西班牙语、葡萄牙语、越南语、印尼语、意大利语、荷兰语全文翻译、网页翻译、文档翻译服务。'
    }]
    $tool.runHandlebar(data,'template_listblock','placeholder_listblock')
}
