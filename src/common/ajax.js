import $tool from './tool.js'
import $store from './store.js'
import {baseUrl} from './env';

function request(type, url, param) {
    return new Promise(resolve => {
        return $.ajax({
            url: baseUrl + url,
            data: param || {},
            type: type || 'GET',
            dataType: "json",
            headers: getheader(),
            error: function () {
                $tool.showError('网络连接失败')
            },
            success: function (data) {
                if(data.code=='601'){//登录失效
                    $store.setstate.token('')
                    $store.setstate.userinfo({})
                    $tool.showError(data.err||data.message)
                    $("#header .header_login").click()
                }
                resolve(data)
            },
        });
    })
}

function getheader() {
    let header = {}
    header = {
        sys:JSON.stringify({
            "innerWidth": window.innerWidth,
            "innerHeight": window.innerHeight,
            "system": navigator.platform,
            "language":$store.getter.ajax_language()
        })
    }
    if($store.state.token){
        header.Authorization = 'jwt '+$store.state.token
    }
    return header
}

export default {
    request,
    baseUrl
}
