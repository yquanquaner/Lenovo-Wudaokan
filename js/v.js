// (function(w) {
//     var vp = document.createElement("meta");
//     vp.setAttribute("name", "viewport");
//     vp.setAttribute("content", "width=" + (/ip(?=od|ad|hone)/i.test(navigator.userAgent) ? w : w + ",target-densitydpi=" + (750 / (navigator.appVersion.indexOf("GT-I9100G") > -1 ? 375 : screen.width) * devicePixelRatio * 160)) + ",user-scalable=no");
//     document.getElementsByTagName("head")[0].appendChild(vp);
//     console.log("shipei")
// })(375);
//-***************判断微信************************
function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
//-***************获取url参数************************

function getquest(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
//-***************获取cookie************************

function getCookie(objName) {
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName)
            return unescape(temp[1]);
    }
}
//-***************添加cookie************************

function addCookie(objName, objValue, objHours) {
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) {
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}
//-***************范围随机数************************
// min :最小值
// max :最大值+1

function getRandoms(min, max) { //1-10:1,11
    return Math.floor(min + Math.random() * (max - min));
}

//-***************获取当前日期 以“-”连接************************
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function checkMobile(s) {
    var regu = /^[1][3-9][0-9]{9}$/;
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}

function trim(str) {
    str = str.replace(/^(\s|\u00A0)+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}

function isChinese(s) {
    var ret = true;
    for (var i = 0; i < s.length; i++)
        ret = ret && (s.charCodeAt(i) >= 10000);
    return ret;
}

function str8(strs) {
    var para = strs;
    para.length;
    var len = 0;
    for (var i = 0; i < para.length; i++) {
        var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if (reg.test(para)) {
            len += 2;
        } else {
            len += 1;
        }
    }
    var str = strs;
    if (len > 8) {
        strs = cutstr(str, 8);
    }
    return strs;
}

function cutstr(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
}
//获取字符串中字符长度
String.prototype.gblen = function() {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
};

//-***************获取url参数************************

function getQueryString(key) {
    // 获取参数        
    var url = window.location.search;
    // 正则筛选地址栏        
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    // 匹配目标参数       
    var result = url.substr(1).match(reg);
    //返回参数值        
    return result ? decodeURIComponent(result[2]) : null;
}

//******************获取字符串中字符长度*******************
String.prototype.gblen = function() {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
};

//****************按照字符截取字符串/中英混排***************
//参数  1. 目标字符串  2. 截取长度
function getSub(str, n) {
    var r = /[^\x00-\xff]/g;
    if (str.replace(r, "mm").length <= n) {
        return str;
    }
    var m = Math.floor(n / 2);
    for (var i = m; i < str.length; i++) {
        if (str.substr(0, i).replace(r, "mm").length >= n) {
            return str.substr(0, i);
        }
    }
    return str;
};


//******************倒计时类************/
// 15秒倒计时类
function CoolDown() {
    this.i = 5;
    this.sel = $('.time_font');
    this.isOver = false;
    this.timer = null;
}

CoolDown.prototype.play = function(num, callback) {
    var _this = this;
    console.log("计时开始");
    _this.sel.html(num);
    _this.i = num;
    _this.nnm = num;
    _this.isOver = false;
    _this.run();
    _this.callback = callback;
};

CoolDown.prototype.reset = function() {
    var _this = this;

    _this.i = _this.nnm;
    _this.sel.html(_this.nnm);
    clearTimeout(_this.timer);
    _this.timer = null;
};

CoolDown.prototype.run = function() {
    var _this = this;
    console.log("!");
    if (_this.i > 0) {
        _this.i--;
        _this.i < 10 ? _this.sel.html(_this.i + "s") : _this.sel.html(_this.i + "s");

        _this.timer = setTimeout(function() {
            _this.run();
        }, 1000);
    } else {
        _this.over();
    }
};

CoolDown.prototype.over = function(fn) {
    console.log('计时结束');
    var _this = this;
    // _this.reset();
    _this.isOver = true;
    _this.callback();
};
//****************获取当前时间***************
//例子 new Date().Format("yyyy-MM-dd HH:mm:ss")
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//******************获取时间差可选择以什么单位显示************/
//例子 var sytime = GetDateDiff(starttime, nowtime, "second");
//例子 GetDateDiff(new Date().Format("yyyy-MM-dd HH:mm:ss"), "2019-08-30 00:47:01", "second")
function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime); //开始时间
    var eTime = new Date(endTime); //结束时间
    //作为除数的数字
    var timeType = 1;
    switch (diffType) {
        case "second":
            timeType = 1000;
            break;
        case "minute":
            timeType = 1000 * 60;
            break;
        case "hour":
            timeType = 1000 * 3600;
            break;
        case "day":
            timeType = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
}
// ********************input框落下页面回位*******************
function temporaryRepair() {
    var currentPosition, timer;
    var speed = 1; //页面滚动距离
    timer = setInterval(function() {
        currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
        currentPosition -= speed;
        window.scrollTo(0, currentPosition); //页面向上滚动
        currentPosition += speed; //speed变量
        window.scrollTo(0, currentPosition); //页面向下滚动
        clearInterval(timer);
    }, 1);
}
//**************************提示窗***************************
function infoframeDom(font) {
    ctoast({
        content: font,
        duration: 1000,
        onHide: function onHide() {
            console.log("已关闭")
        }
    })
}
//***********************随机抽取字符串内元素*********************** */
function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

var telRegex = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;



//判断变量是否为空

function isEmpty(v) {
    switch (typeof v) {
        case 'undefined':
            return true;
        case 'string':
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
            break;
        case 'boolean':
            if (!v) return true;
            break;
        case 'number':
            if (0 === v || isNaN(v)) return true;
            break;
        case 'object':
            if (null === v || v.length === 0) return true;
            for (var i in v) {
                return false;
            }
            return true;
    }
    return false;
}


// isEmpty()              //true
// isEmpty([])            //true
// isEmpty({})            //true
// isEmpty(0)             //true
// isEmpty(Number("abc")) //true
// isEmpty("")            //true
// isEmpty("   ")         //true
// isEmpty(false)         //true
// isEmpty(null)          //true
// isEmpty(undefined)     //true