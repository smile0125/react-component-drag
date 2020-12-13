const ScrollData = () => {
    const event = window.event;
    const scrollTop = event.target.scrollTop;//滚动的距离--》滚动条距离顶部的距离
    const clientHeight = event.target.clientHeight;//可是区域的高度
    const scrollHeight = event.target.scrollHeight;//页面的实际总高度

    if ((scrollTop + clientHeight >= scrollHeight-10)) {
        return true;
    } else {
        return false;
    }
};
export default ScrollData;