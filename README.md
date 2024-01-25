jquery多页面官网webpack脚手架 multi_page

简介：用于官网等多页面项目开发，提供最基本的开发方案及功能组件

特点：精简，简单易用，纯干货

功能：
 - webpack多页面项目打包
	 - 兼容 混淆 压缩

 - rem页面适配方案示例
	 - 使用rem，定义最大宽度
	 - 屏幕宽度不足时，进行等比缩放
	 - 如需响应式样式调整，请另写响应式代码进行微调

 - 接口请求ajax封装
 - 模板渲染handlebars
 - 模仿vuex的状态管理(store.js)

 - 国际化-多语言-i18n
 - 简易弹窗组件：提示框、错误框、loading、确认框
 - 随着页面视口滚动触发元素进入动画

使用说明：
 - npm run dev         开发调试 dev时样式加载迟缓不用管，build正常
 - npm run builddev    打包-测试包
 - npm run build       打包-正式包

路径说明：
 - src     项目目录
	 - pages   页面目录（此处格式禁止修改，如需修改需另做其他处理）
		 - header   页面
             - index.html
             - index.less
          	 - index.js
     - common  公共文件
		 - src/common/env.js            环境配置
		 - src/common/ajax.js           接口管理
		 - src/common/store.js          状态管理
		 - src/common/common.js         公共js
		 - src/common/common.less       公共、组件 样式
		 - src/common/tool.less         less工具样式
		 - src/common/tool.js           js工具函数
		 - src/common/registerHelper.js handlebars自定义Helper
 - static  静态资源
	- i18n    国际化-语言包
	- 其他...

在线预览：
 - http://123.57.178.145:5007/multi_page/index.html
试用账号：
 - 账号：multi_page
 - 密码：123456


