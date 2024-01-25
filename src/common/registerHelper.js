
//时间
Handlebars.registerHelper('help_time', function(time, options) {
    // time=time.replace(/-/g, '/');
    var myDate = new Date();
    var timestamp = new Date(time);
    myDate=myDate.getTime();
    timestamp=timestamp.getTime();
    var date3=myDate-timestamp;
    var days=Math.floor(date3/(24*3600*1000));
    var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000));
    var leve=date3%(3600*1000);
    var minu=Math.floor(leve/(60*1000));
    if(days==0&&hours != 0) {
        return hours+"小时前";
    } else if(hours==0){
        if(minu==0){
            return Math.floor(leve/1000)+"秒前";
        }else{
            return minu+"分钟前";
        }
    } else if(days>10){
        var data = new Date(time);
        return data.getFullYear()+"-"+parseInt(data.getMonth()+1)+"-"+data.getDate();
    } else {
        return days + "天前";
    }
});

//时间
Handlebars.registerHelper('help_formatdate', function(time,format, options) {
    //示例：
    //"yyyy年MM月dd日"
    //"MM/dd/yyyy"
    //"yyyyMMdd"
    //"yyyy-MM-dd hh:mm:ss"
    let date = new Date(time)
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
});

//加法
Handlebars.registerHelper('jiacount', function(v1,v2, options) {
    return parseFloat(v1)+parseFloat(v2);
});
//等于
Handlebars.registerHelper('equal', function(v1,v2, options) {
    if(v1 == v2) {
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
});
//不等于
Handlebars.registerHelper('budeng', function(v1,v2, options) {
    if(v1 != v2) {
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
});
//大于等于
Handlebars.registerHelper('GreaterthanorEqualto', function(v1,v2, options) {
    if(v1  >= v2) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});
//小于
Handlebars.registerHelper('Lessthan', function(v1,v2, options) {
    if(v1  < v2) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});
