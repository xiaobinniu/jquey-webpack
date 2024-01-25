import './registerHelper.js'
import $tool from './tool.js'

//rem
var setfontsize = () => {
    var clientWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth
    let width = 1200;
    if (clientWidth > width) {
        document.documentElement.style.fontSize = 1200 / 100 + 'px'
    } else {
        document.documentElement.style.fontSize = (1200 / width) * clientWidth / 100 + 'px'
    }
}
setfontsize()
window.addEventListener('resize', setfontsize)


//网络检测
window.addEventListener('online', function () {
    // 网络由异常到正常时触发
    $tool.showSuccess('网络已重新连接')
})
window.addEventListener('offline', function () {
    // 网络由正常常到异常时触发
    $tool.showError('网络连接已断开')
})

//禁止右键
// document.oncontextmenu = function(){
//     return false;
// }

