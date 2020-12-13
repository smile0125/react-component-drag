import titleArr from './titleList.jsx';
const SetTitle = () => {
    const hash = window.location.hash.split('?')[0];
    return titleArr[hash] ? titleArr[hash] : 'HONG';
}

export default SetTitle;
