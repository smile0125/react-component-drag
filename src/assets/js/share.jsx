import { wxConfig } from './wx.jsx';

let ua = navigator.userAgent.toLowerCase();
let isWeixin = ua.indexOf('micromessenger') !== -1;

export const Share = () => {
    const share_title = document.getElementsByTagName("title")[0].innerText;
    const share_desc = document.getElementsByTagName("meta")["description"].content;
    const shareData = {
        // 分享标题
        title: share_title,
        // 分享描述
        desc: share_desc,
        // 分享链接
        link: window.location.href,
        // 分享图标
        imgUrl: 'http://www.fnying.com/h5/ccvt/common/img/ccvt.png',
        success: function () {
            console.log(this.link);
            console.log('分享成功');
        },
        cancel: function () {
            console.log(this.link);
            console.log('取消分享');
        }
    };

    if (isWeixin) {
        wxConfig();
        window.wx.ready(() => {
            window.wx.onMenuShareTimeline(shareData);//分享到朋友圈
            window.wx.onMenuShareAppMessage(shareData);//分享给好友
        })
    }
};
