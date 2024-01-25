/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 接口域名地址
 * baseImgPath: 图片上传存放地址
 *
 */
let baseUrl = '';
if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://123.57.178.145:5007';//测试
} else {
    baseUrl = 'http://123.57.178.145:5007';// 正式
}

export {
    baseUrl
}
