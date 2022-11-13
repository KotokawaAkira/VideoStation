function ajax(options, success, failure) {
    // 默认参数
    const defaultOptions = {
        url: "",
        method: "get",
        responseType: "text"
    };
    // 合并参数
    Object.assign(defaultOptions, options);
    // 创建xhr
    const xhr = new XMLHttpRequest();
    xhr.open(defaultOptions.method, defaultOptions.url);
    xhr.responseType = defaultOptions.responseType;
    // 设置header
    if (defaultOptions.header) {
        const header_keys = Object.keys(defaultOptions.header);
        const header_values = Object.values(defaultOptions.header);
        for (const index in header_keys) {
            xhr.setRequestHeader(header_keys[index], header_values[index]);
        }
    }
    // 处理回调
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == xhr.DONE) {
            if (xhr.status == 200)
                if (xhr.responseType == "blob")
                    success(xhr.response);
                else
                    success(xhr.responseText);
            else if (xhr.status >= 400 && failure) {
                failure({ statusCode: xhr.status, statusText: xhr.statusText });
            }
        }
    });
    // 发送请求
    if (defaultOptions.method == "post")
        xhr.send(JSON.stringify(defaultOptions.body));
    else
        xhr.send();
}
export { ajax };
