<template>
    <nav>
        <div ref="top_bar" id="top_bar">
            <div ref="nav_bar" class="nav-bar">
                <a href="https://kotokawa-akira-mywife.site/videoStation/home">
                    <div ref="icon" class="icon">
                        <svg style="transition:all .3s ease" ref="home_icon" xmlns="http://www.w3.org/2000/svg"
                            width="32" height="32" viewBox="0 0 24 24">
                            <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" />
                        </svg>
                        <span>首页</span>
                    </div>
                </a>
                <div class="search-bar">
                    <div ref="search_container" class="search-container">
                        <input ref="search_input" type="text" v-model="search_text" autocomplete="false"
                            placeholder="type here to search" />
                        <div class="btn-clear">
                            <svg ref="clear" id="clear" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round"
                                stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
                            </svg>
                        </div>
                    </div>
                    <div class="btn-submit" @click="goSearch">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path
                                d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
                        </svg>
                    </div>
                </div>
                <div class="mine">
                    <el-popover placement="bottom" :width="130" trigger="hover">
                        <template #reference>
                            <div style="color:#fff;height:100%;width:100%;background-color:var(--ava);font-size:20px;display:flex;align-items: center;justify-content: center;"
                                v-if="!isLogin">登录</div>
                            <img draggable="false" v-else class="img_profile" :src="profile" alt="">
                        </template>
                        <template v-if="isLogin" #default>
                            <div class="mine-detail-name">
                                {{ user.name }}
                            </div>
                            <div class="mine-detail">
                                <div class="mine-detail-li" @click="goMine">
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                                        clip-rule="evenodd">
                                        <path
                                            d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
                                    </svg>
                                    <div style="padding-left:10px">
                                        <span>个人中心</span>
                                    </div>
                                </div>
                                <div class="mine-detail-li" @click="logout">
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                                        clip-rule="evenodd">
                                        <path
                                            d="M11 21h8.033v-2l1-1v4h-9.033v2l-10-3v-18l10-3v2h9.033v5l-1-1v-3h-8.033v18zm-1 1.656v-21.312l-8 2.4v16.512l8 2.4zm11.086-10.656l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z" />
                                    </svg>
                                    <span style="padding-left:10px">退出登录</span>
                                </div>
                            </div>
                        </template>
                        <template v-else #default>
                            <div class="mine-detail" style="height:unset">
                                <div class="mine-detail-tips">登录以获取服务</div>
                                <a href="https://kotokawa-akira-mywife.site/videoStation/login">
                                    <div class="mine-detail-li-login">
                                        立即登录
                                    </div>
                                </a>
                            </div>
                        </template>
                    </el-popover>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import { ElPopover } from 'element-plus';
export default {
    components: {
        ElPopover
    },
    data() {
        return {
            search_text: "",
            scroll_top: 0,
            user: {},
            isLogin: false,
            profile: 'https://kotokawa-akira-mywife.site/web/api/account/getProfile/000'
        }
    },
    watch: {
        search_text(newValue) {
            if (newValue != "") {
                this.$refs.clear.style.display = "inline-block";
                this.$refs.clear.addEventListener("click", () => {
                    this.search_text = "";
                    this.$refs.search_input.focus();
                });
            }
            else
                this.$refs.clear.style.display = "none";
        },
        scroll_top(newValue, oldValue) {
            if (newValue < oldValue) {
                this.$refs.top_bar.style.top = "0";
            } else this.$refs.top_bar.style.top = "-64px";
        }
    },
    methods: {
        ajax(options, success, failure) {
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
        },
        search_adel() {
            this.$refs.search_input.addEventListener("focus", () => {
                this.$refs.search_container.style.backgroundColor = "#fff"
            });
            this.$refs.search_input.addEventListener("blur", () => {
                if (this.search_text != "")
                    this.$refs.search_container.style.backgroundColor = "#fff"
                else
                    this.$refs.search_container.style.backgroundColor = "var(--bg_regular)"
            });
        },
        scroll_adel() {
            window.addEventListener("scroll", () => {
                if (document.documentElement.scrollTop > 64) {
                    this.$refs.top_bar.style.position = "fixed";
                } else {
                    this.$refs.top_bar.style.top = "0";
                    this.$refs.top_bar.style.position = "unset";
                }
                this.scroll_top = document.documentElement.scrollTop;
            });
        },
        getCookie(cookie_name) {
            let value = '';
            let allcookies = document.cookie;
            //索引长度，开始索引的位置
            let cookie_pos = allcookies.indexOf(cookie_name);
            // 如果找到了索引，就代表cookie存在,否则不存在
            if (cookie_pos != -1) {
                // 把cookie_pos放在值的开始，只要给值加1即可
                //计算取cookie值得开始索引，加的1为“=”
                cookie_pos = cookie_pos + cookie_name.length + 1;
                //计算取cookie值得结束索引
                let cookie_end = allcookies.indexOf(";", cookie_pos);
                if (cookie_end == -1) {
                    cookie_end = allcookies.length;
                }
                //得到想要的cookie的值
                value = unescape(allcookies.substring(cookie_pos, cookie_end));
            }
            return value;
        },
        deleteCookie(name) {
            let exp = new Date();
            exp.setTime(exp.getTime() - 7);
            let cval = this.getCookie(name);
            if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
        },
        logout() {
            let uid = this.getCookie("uid");
            fetch('http://kotokawa-akira-mywife.site/web/api/account/logout/' + uid, { method: 'get' });
            this.deleteCookie("uid");
            this.deleteCookie("token");
            window.location.reload();
        },
        getProfile() {
            this.ajax({
                method: 'get',
                url: 'https://kotokawa-akira-mywife.site/web/api/account/getProfile/' + this.user.id,
                responseType: 'blob'
            }, (res) => {
                if (res.type != "image/png") return;
                let profile_blob = res;
                this.user['profile'] = URL.createObjectURL(profile_blob);
                this.profile = URL.createObjectURL(profile_blob);
            });
        },
        getLoginInfo() {
            fetch('https://kotokawa-akira-mywife.site/web/api/account/getLoginInfo', { method: 'get', credentials: 'include' })
                .then(res => {
                    return res.json();
                }).then(data => {
                    if (data.success == 'true')
                        fetch('https://kotokawa-akira-mywife.site/web/api/account/selectOneById/' + data.uid, { method: "get" })
                            .then(res => {
                                return res.json();
                            }).then(data => {
                                this.user = data;
                                this.isLogin = true;
                                this.getProfile();
                            });
                });
        },
        getParams(name) {
            let pa = window.location.href.split("?");
            if (pa.length <= 1) return "";
            let params = new URLSearchParams(pa[1]);
            return params.get(name);
        },
        goSearch() {
            window.location.href = 'https://kotokawa-akira-mywife.site/videoStation/search?keywords=' + this.search_text;
        },
        goMine() {
            window.open('https://kotokawa-akira-mywife.site/web/Mine/' + this.user.id);
        }
    },
    mounted() {
        this.search_adel();
        this.scroll_adel();
        this.getLoginInfo();

        let keywords = this.getParams("keywords");
        this.search_text = keywords;

        let go = (e) => {
            if (e.key == 'Enter') {
                this.goSearch();
            }
        }
        this.$refs.search_input.addEventListener("focus", () => {
            window.addEventListener("keydown", go);
        });
        this.$refs.search_input.addEventListener("blur", () => {
            window.removeEventListener("keydown", go);
        });
    }
}
</script>
<style lang="css">
nav {
    position: relative;
    height: 64px;
    display: block;
    z-index: 2001;
}

.nav-bar {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.icon {
    display: flex;
    height: 32px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .3s ease;
}

.icon:hover {
    color: var(--ava);
}

.icon:hover svg {
    fill: var(--ava);
}

.icon span {
    font-size: 25px;
}

.search-bar {
    display: flex;
    background-color: var(--bg_regular);
    border: 1px solid var(--line_regular);
    border-radius: 5px;
    padding: 5px;
    justify-content: space-between;
    align-items: center;
}

.search-container input {
    height: 32px;
    width: 300px;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 0 5px 0 10px;
    background-color: transparent;
}

.mine {
    height: 48px;
    width: 48px;
    overflow: hidden;
    border-radius: 24px;
    cursor: pointer;
}

.search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .3s ease;
    margin-right: 15px;
    border-radius: 5px;
}

.search-container:hover {
    background-color: #fff;
}

.btn-clear {
    height: 24px;
    width: 24px;
    display: inline-block;
}

#clear {
    cursor: pointer;
    display: none;
}

.btn-submit {
    cursor: pointer;
    height: 32px;
    width: 32px;
    display: flex;
    border-radius: 5px;
    border: 1px solid transparent;
    justify-content: center;
    align-items: center;
    transition: all .3s ease;
}

.btn-submit:hover {
    border: 1px solid var(--line_regular);
    background-color: #fff;
}

#top_bar {
    top: 0;
    width: 100%;
    height: 64px;
    transition: all .3s ease;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
    background-color: #fff;
}

.img_profile {
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.mine-detail {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.mine-detail-li {
    padding: 10px;
    display: flex;
    font-size: 18px;
    margin: 0 auto;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 8px;
    transition: background-color .3s ease;
}

.mine-detail-li:hover {
    border: 1px solid var(--line_regular);
    background-color: var(--bg_regular);
}

.mine-detail-li-login {
    padding: 10px;
    display: flex;
    font-size: 18px;
    margin: 0 auto;
    cursor: pointer;
    color: #fff;
    background-color: var(--ava);
    border-radius: 8px;
    border: 1px solid var(--line_regular);
}

.mine-detail-tips {
    padding: 10px 5px 10px 5px;
    margin: 0 auto;
}

.el-popover {
    padding: 8px 4px 8px 4px !important;
}

.mine-detail-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    color: var(--ava);
    font-weight: 700;
    font-size: 26px;
    width: 100%
}

@media screen and (max-width:550px) {
    .icon span {
        display: none;
    }

    .search-container input {
        width: 120px;
    }
}
</style>