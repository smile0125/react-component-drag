import { GetCookie, SetCookie } from './common.jsx';
import { GetPoolInfo } from '../../http/http.jsx';

export const GetGroupId = () => {
    const token = GetCookie('token');
    const params = { token: token };
    GetPoolInfo(params, res => {
        if (res.errcode == 0) {
            const group_id = res.rows[0].id;
            SetCookie('group_id', group_id);
        }
    }, res => {
        console.log(res);
    })
};