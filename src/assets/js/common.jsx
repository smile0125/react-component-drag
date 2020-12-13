export const GetQueryString = (search, name) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let params = search.substr(1).match(reg);
    if (params != null) {
        return unescape(params[2])
    }
};

export const SetCookie = (name, value) => {
    let now = new Date();
    let time = now.getTime();

    // Valid for 2 hours
    time += 3600 * 1000 * 2;
    now.setTime(time);
    document.cookie = name + "=" + escape(value) + '; expires=' + now.toUTCString() + ';path=/';
};

export const GetCookie = (name) => {
    let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    // if(name === 'token' && !arr){
    //     if(window.location.hash === '#/login'){
    //         console.log('login')
    //     }else{
    //         window.location.href = `http://wx.fnying.com/ahino/index_login.php?url=${encodeURIComponent(window.location.href)}`;
    //     }
    // }
    if (arr != null) {
        return unescape(arr[2])
    } else {
        return null;
    }
};

export const DelCookie = (name) => {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = GetCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ';path=/';
};


//节流函数
export const Throttling = (fn, delay) => {
    let lastTime = 0;
    return (event) => {
        event.persist && event.persist();  //保留对事件的引用
        const nowTime = Date.now();
        if (nowTime - lastTime > delay) {
            console.log('时间到');
            fn.call(this);
            lastTime = nowTime
        } else {
            console.log('在等等');
        }
    }
};

//防抖函数
export const debounce = (fn, delay) => {
    let timer = null;
    return (event) => {
        clearTimeout(timer);
        event.persist && event.persist();  //保留对事件的引用
        timer = setTimeout(() => {
            fn();
        }, delay)
    }
};