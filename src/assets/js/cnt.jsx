import { GetCookie, SetCookie } from './common.jsx';
import { CntGetApi } from '../../http/http.jsx';
const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
const UUID = GetCookie('UUID');
const UUIDFun = (len, radix) => {
    let chars = CHARS, uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        let r;

        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

const openCntFun = (UUID) => {
    const ref = window.location.host;
    const url = window.location.host;
    const params = {
        referrer: ref,
        url: url,
        uuid: UUID,
    }
    CntGetApi(params, res => {

    }, res => {

    })
}

export const Cnt = () => {
    if (!UUID) {
        const UUID = UUIDFun();
        SetCookie('UUID', UUID);
        openCntFun(UUID);
    } else {
        const UUID = GetCookie('UUID');
        openCntFun(UUID);
    }
}