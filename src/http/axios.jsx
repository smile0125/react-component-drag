import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const baseUrl = "http://bot_api.fnying.com";

export const axiosGet = (api_url, api_data, suc_func, error_func) => {
    const url = baseUrl + api_url;
    const params = api_data || {};
    axios.get(url, {
        params: params,
    }).then(res => {
        if (!res.data.errcode) {
            let res = {
                "errcode": -1,
                "errmsg": '系统异常，请稍候再试'
            };
            error_func(res);
        } else if (res.data.errcode !== 0) {
            error_func(res.data);
        } else {
            suc_func(res.data);
        }
    }).catch(error => {
        error_func(error);
    })
};

export const axiosPost = (api_url, api_data, suc_func, error_func, progress_func) => {
    const url = baseUrl + api_url;
    const params = api_data || {};
    axios.post(url, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: e => {
            let loaded = e.loaded;
            let total = e.total;
            progress_func(loaded, total);
        }
    })
        .then(res => {
            if (!res.data.errcode) {
                let res = {
                    "errcode": -1,
                    "errmsg": '系统异常，请稍候再试'
                };
                error_func(res);
            } else if (res.data.errcode != 0) {
                error_func(res.data);
            } else {
                suc_func(res.data);
            }
        })
        .catch(error => {
            error_func(error);
        })
};

export const ajax = (url, params = {}, type = 'GET') => {
    return new Promise((resolve, reject) => {
        let promise;
        if (type === "GET") {
            promise = axios.get(baseUrl + url, {params: params});
        } else {
            promise = axios.post(baseUrl + url, params)
        }
        promise.then(res => {//请求成功
            resolve(res);
        }).catch(res => {//请求失败
            console.log(res);
        })
    })
};