import React, {Component} from 'react';
import {Cell, CellBody, Form, Uploader, Gallery, GalleryDelete, Toast, Toptips} from "react-weui";
import {GetCookie} from "./common.jsx";
import {GetKeyCode, UploadImg} from "../../http/http.jsx";

class UploadImgClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qr_code_address: [],
            gallery: false,
            progress:'0%',
            showLoading: false,
            loadingText: '',
            showTopTips: false,
            topTipsType: 'warn',
            topTipsTimer: null,
            topTipsText: '',
            key_code: '',
            id: 1
        }
    }

    componentDidMount() {
        this.getKeyCodeFuc();
    }

    //获取key_code
    getKeyCodeFuc = () => {
        const token = GetCookie('token');
        const params = { token: token };
        GetKeyCode(params, res => {
            this.setState({ key_code: res.key_code })
        }, res => { });
    };

    //上传图片
    uploadImg = (file) => {
        const files = file.nativeFile;
        const { id } = this.state;
        if(id < 3){ this.setState({id: id + 1}) }
        let size = Math.floor(files.size / 1000);
        if(size >= 1000){
            this.setState({  showLoading: false, topTipsType: 'warn', showTopTips: true, topTipsText: '上传图片不能大于1M' });
            this.stopTopTips();
            return;
        }

        let formData = new FormData();
        formData.append("key_code", this.state.key_code);
        formData.append("file", files);

        let params = formData;

        this.setState({ showLoading: true });
        UploadImg(params, res => {
            if (res.errcode == 0) {
                const qr_code_address = this.state.qr_code_address;
                const fnGetUploadImg = this.props.fnGetUploadImg;
                qr_code_address.push({url: res.url});
                fnGetUploadImg(res.url, id);
                // qr_code_address[0].url = res.url;
                this.setState({ qr_code_address: qr_code_address, src: res.url, showLoading: false, topTipsType: 'primary', showTopTips: true, topTipsText: '上传成功' });
                this.stopTopTips();
            }
        }, res => {
            this.setState({ showLoading: false, topTipsType: 'warn', showTopTips: true, topTipsText: `上传失败 ${res.errmsg}` });
            this.stopTopTips();
        },(loaded,total) => {
            if(loaded !== total){
                let progress = Math.floor((loaded / total) * 100) + '%';
                this.setState(() => ({ progress: progress, loadingText: '上传中' }))
            }else{
                this.setState(() => ({ progress: '100%', loadingText: '处理中' }))
            }
        })
    };

    stopTopTips = () => {
        this.state.topTipsTimer = setTimeout(() => {
            this.setState({ showTopTips: false });
        }, 2000);
    };

    componentWillUnmount() {
        clearTimeout(this.state.toptTipsTimer)
    }

    renderGallery() {
        if (!this.state.gallery) return false;
        let srcs = this.state.qr_code_address.map(file => file.url);
        return (
            <Gallery
                src={srcs}
                show
                defaultIndex={this.state.gallery.id}
                onClick={e => {
                    //avoid click background item
                    e.preventDefault();
                    e.stopPropagation();
                    this.setState({ gallery: false })
                }}
            >

                <GalleryDelete onClick={(e, id) => {
                    this.setState({
                        qr_code_address: this.state.qr_code_address.filter((e, i) => i != id),
                        gallery: this.state.qr_code_address.length <= 1 ? true : false
                    })
                }} />

            </Gallery>
        )
    }

    render() {
        const { qr_code_address, progress, showLoading, loadingText, topTipsType, showTopTips, topTipsText } = this.state;
        return (
            <div>
                { showLoading ? <Toast icon="loading" show={showLoading}><span style={{color:'#fff'}}>{ loadingText }</span></Toast> : null }
                { showTopTips ? <Toptips type={ topTipsType } show={ showTopTips }> { topTipsText } </Toptips> : null }
                <Form>
                    <Cell>
                        <CellBody>
                            <Uploader
                                title={ this.props.title }
                                multiple={true}
                                capture={false}
                                maxCount={2}
                                files={qr_code_address}
                                onError={msg => alert(msg)}
                                onChange={this.uploadImg}

                                onFileClick={
                                    (e, file, i) => {
                                        console.log('file click', file, i);
                                        this.setState({
                                            gallery: {
                                                url: file.url,
                                                id: i
                                            }
                                        })
                                    }
                                }
                                lang={{
                                    maxError: maxCount => `最多上传 ${maxCount} 张图片`
                                }}
                            />
                        </CellBody>
                    </Cell>
                    <Cell>
                        <CellBody><p className='cus_progress_bar' style={{width:progress}}>{progress}</p></CellBody>
                    </Cell>
                </Form>
            </div>
        );
    }
}

export default UploadImgClass;