import '../../common/common.less';
import './index.less';
import '../../common/common.js';
import $tool from '../../common/tool.js';
import $store from '../../common/store.js';
import $ajax from '../../common/ajax.js';

$('#header').load('./header.html');

$(function(){
    //加载语言包
    $tool.loadProperties(res=>{
        let html = [

            ]
        html.forEach(item=>{
            $("."+item).html($.i18n.prop(item))
        })
    });

    getdata();
});

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
        name:'百度翻译',
    },{
        name:'百度翻译',
    }]
    $tool.runHandlebar(data,'template_listblock','placeholder_listblock')
}
