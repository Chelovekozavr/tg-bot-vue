export function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    let res = urlParams.get(param);
    
    if(res === 'true') {
        res = true;
    } else if (res === 'false') {
        res = false;
    }
    return res;
}
