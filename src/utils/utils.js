import store from '@/store'
export const dateFormat = function (time, fmt) {
    time = time instanceof Date ?  time : new Date(time);
    var o = {
        "M+": time.getMonth() + 1, //月份 
        "d+": time.getDate(), //日 
        "h+": time.getHours(), //小时 
        "m+": time.getMinutes(), //分 
        "s+": time.getSeconds(), //秒 
        "q+": Math.floor((time.getMonth() + 3) / 3), // 季度
        "S": time.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
}
export function timeAgo(time) {
    // var currentTime = store.getters.getServerTime(2);
    var currentTime = new Date();
    var dateTime = time.toString().replace(/-/g, "/").replace(/\.[\d]+$/,'');
    var d_day = new Date(dateTime).getTime() || dateTime;
    var day = Math.abs(parseInt(((d_day - currentTime) / 1000 / 3600 / 24).toFixed(2)));
    var hour = Math.abs(parseInt(((d_day - currentTime) / 1000 / 3600).toFixed(2)));
    var minutes = Math.abs(parseInt(((d_day - currentTime) / 1000 / 60).toFixed(2)));
    var seconds = Math.abs(parseInt(((d_day - currentTime) / 1000).toFixed(2)));
    if (day > 367) {
        return parseInt(day / 365) + "年前".toString();
    } else if (day > 31) {
        return parseInt(day / 30) + "月前".toString();
    } else if (day >= 2) {
        return parseInt(day) + "天前".toString();
    } else if (day > 0 && day < 2) {
        return "昨天".toString();
    } else if (hour > 0 && hour < 24) {
        return parseInt(hour) + "小时前".toString();
    } else if (minutes > 0 && minutes < 60) {
        return parseInt(minutes) + "分钟前".toString();
    } else if (seconds > 0 && seconds < 60) {
        return parseInt(seconds) + "秒前".toString();
    } else if(seconds ==  0){
        return "刚刚";
    }
}
export const axios_dataToFormdata = function dataToFormdata(data = {}) {
    try {
        return Object.keys(data).reduce((t, el) => {
            var value = data[el];
            if ({}.toString.call(value) === '[object Object]') {
                value = JSON.stringify(value)
            }
            t.push(el + "=" + value);
            return t;
        }, []).join('&')
    } catch (e) {
        return ""
    }
}
export const axios_addToken = function addToken(config) {
    let token = store.getters.apptoken;
    if (config.data) {
        token && (config.data.token = token);
    } else {
        config.data = {
            token: token
        };
    }
    return config
}

export const importScript = function(url, callback){
    if(!url) return;
    var script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}
