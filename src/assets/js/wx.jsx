import axios from 'axios';

export const wxConfig = (apilist) => {
    // 默认需要开通的微信权限
    apilist = apilist || [
        "onMenuShareAppMessage",
        "onMenuShareTimeline",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "getLocation",
        "chooseWXPay",
        "scanQRCode",
        "chooseImage",
        "previewImage",
        "uploadImage",
        "downloadImage"];

    axios.get('http://wx.fnying.com/js_sign.php', { params: { 'url': window.location.href } })
        .then(res => {
            const data = res.data;
            window.wx.config({
                debug: false,                   // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appid,          // 必填，企业号的唯一标识，此处填写企业号corpid
                timestamp: data.timestamp,  // 必填，生成签名的时间戳
                nonceStr: data.noncestr,    // 必填，生成签名的随机串
                signature: data.signature,  // 必填，签名，见附录1
                jsApiList: apilist              // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        }).catch(res => {
            console.log(res)
        })
}