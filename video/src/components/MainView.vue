<template>
    <main class="view-main">
        <section class="video-header">
            <div class="video-info">
                <div class="video-info-title" :title="video.title">
                    {{ video.title }}
                </div>
                <div class="video-info-detail">
                    <div class="video-info-time">
                        <svg style="margin-right:8px" xmlns="http://www.w3.org/2000/svg" width="21" height="21"
                            viewBox="0 0 24 24">
                            <path
                                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z" />
                        </svg>
                        <span>
                            {{ video.time }}
                        </span>
                    </div>
                    <div class="video-info-playcount">
                        <svg style="margin-right:8px" xmlns="http://www.w3.org/2000/svg" width="21" height="21"
                            viewBox="0 0 24 24">
                            <path
                                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
                        </svg>
                        <span>{{ video.play }}</span>
                    </div>
                </div>
            </div>
            <div class="video-info-uper">
                <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + video.up" target="_blank">
                    <el-image fit="cover" draggable="false"
                        :src="'https://kotokawa-akira-mywife.site/web/api/account/getProfile/' + video.up" alt="">
                        <template #error>
                            <img style="width: 100%;height: 100%;object-fit: cover;"
                                src="https://kotokawa-akira-mywife.site/web/api/account/getProfile/000" alt="">
                        </template>
                    </el-image>
                </a>
                <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + video.up" target="_blank">
                    <div class="video-info-uper-name">
                        {{ uper.name }}
                    </div>
                </a>
            </div>
        </section>
        <section class="player-container">
            <div class="player" ref="player"></div>
        </section>
        <section class="lower-switcher">
            <div class="lower-switcher-btn" :class="{ 'lower-switcher-active': switcher_isActive }"
                @click="showComment">评论
            </div>
            <div class="lower-switcher-btn" :class="{ 'lower-switcher-active': !switcher_isActive }" @click="showMore">
                选集
            </div>
        </section>
        <section class="lower">
            <div class="lower-left" ref="lower_left">
                <div class="lower-left-options">
                    <div style="display: flex;justify-content: flex-start;align-items: center;height: 70px;">
                        <div class="lower-left-options-li lower-left-options-like" @click="btnLike">
                            <svg :class="{ 'btn-active': isLiked }" xmlns="http://www.w3.org/2000/svg" width="32"
                                height="32" viewBox="0 0 24 24">
                                <path
                                    d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z" />
                            </svg>
                            <span :class="{ 'btn-active': isLiked }">{{ video.like }}</span>
                        </div>
                        <div class="lower-left-options-li lower-left-options-collection" @click="btnCollection">
                            <svg :class="{ 'btn-active': isCollected }" xmlns="http://www.w3.org/2000/svg" width="32"
                                height="32" viewBox="0 0 24 24">
                                <path
                                    d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                            </svg>
                            <span :class="{ 'btn-active': isCollected }">{{ video.collection }}</span>
                        </div>
                    </div>
                    <div class="options-info">
                        <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + video.up" target="_blank">
                            <el-image fit="cover" draggable="false"
                                :src="'https://kotokawa-akira-mywife.site/web/api/account/getProfile/' + video.up"
                                alt="">
                                <template #error>
                                    <img style="width: 100%;height: 100%;object-fit: cover;"
                                        src="https://kotokawa-akira-mywife.site/web/api/account/getProfile/000" alt="">
                                </template>
                            </el-image>
                        </a>
                        <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + video.up" target="_blank">
                            <div class="options-img-name">{{ uper.name }}</div>
                        </a>
                    </div>
                </div>
                <div class="lower-left-summary">
                    <div style="padding:5px 0px 10px 0px;font-size: 16px;">简介</div>
                    <div class="lower-left-summary-text-container" ref="text_container">
                        <div class="lower-left-summary-text" ref="summary_text">
                            {{ video.summary }}
                        </div>
                    </div>
                    <span class="lower-left-summary-more" ref="summary_more" v-show="summary_show">
                        展开
                    </span>
                </div>
                <div class="lower-comments">
                    <div style="text-align:left;font-size: 26px;color: #000;">评论</div>
                    <ul>
                        <li class="lower-comments-li" v-for="(item, index) in comments" :key="item.time">
                            <div class="lower-comments-li-header">
                                <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + item.uid">
                                    <div class="lower-comments-li-img-container">
                                        <el-image fit="cover" draggable="false"
                                            :src="'https://kotokawa-akira-mywife.site/web/api/account/getProfile/' + item.uid"
                                            alt="">
                                            <template #error>
                                                <img style="width: 100%;height: 100%;object-fit: cover;"
                                                    src="https://kotokawa-akira-mywife.site/web/api/account/getProfile/000"
                                                    alt="">
                                            </template>
                                        </el-image>
                                    </div>
                                </a>
                                <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + item.uid">
                                    <div class="lower-comments-li-header-name">
                                        {{ item.userName }}
                                    </div>
                                </a>
                            </div>
                            <div class="lower-comments-li-text">
                                <div class="lower-comments-li-text-container">
                                    <div class="lower-comments-li-text-main">
                                        {{ item.text }}
                                    </div>
                                </div>
                                <div class="lower-comments-li-text-time">{{ item.time }}
                                    <span class="reply_btn" @click="replyBtn(item.uid, item.userName, index)">回复</span>
                                    <span class="lower-comments-li-text-more">
                                        展开
                                    </span>
                                </div>

                            </div>
                            <div class="lower-comments-li-reply">
                                <div class="lower-comments-li-reply-li" v-for="reply in item.commentList.slice(
                                    (this.currentPages[index] - 1) * this.pageSize,
                                    this.currentPages[index] * this.pageSize
                                )" :key="reply.time">
                                    <div class="lower-comments-li-header">
                                        <div style="width:40px;height:40px;border-radius: 20px;overflow: hidden;"
                                            class="lower-comments-li-img-container">
                                            <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + reply.uid">
                                                <el-image style="width:40px;height:40px;" fit="cover" draggable="false"
                                                    :src="'https://kotokawa-akira-mywife.site/web/api/account/getProfile/' + reply.uid"
                                                    alt="">
                                                    <template #error>
                                                        <img style="width: 40px;height: 40px;object-fit: cover;"
                                                            src="https://kotokawa-akira-mywife.site/web/api/account/getProfile/000"
                                                            alt="">
                                                    </template>
                                                </el-image>
                                            </a>
                                        </div>
                                        <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + reply.uid">
                                            <div style="font-size:18px" class="lower-comments-li-header-name">
                                                {{ reply.userName }}
                                            </div>
                                        </a>
                                    </div>
                                    <div class="lower-comments-li-text">
                                        <div class="lower-comments-li-text-container">
                                            <div class="lower-comments-li-text-main">
                                                {{ reply.text }}
                                            </div>
                                        </div>
                                        <div class="lower-comments-li-text-time">{{ reply.time }}
                                            <span class="reply_btn"
                                                @click="replyBtn(reply.uid, reply.userName, index)">回复</span>
                                            <span class="lower-comments-li-text-more">
                                                展开
                                            </span>
                                        </div>

                                    </div>
                                </div>
                                <div class="pagination">
                                    <el-pagination large layout="prev, pager, next" :page-size="pageSize"
                                        :total="item.commentList.length" :hide-on-single-page="true"
                                        :current-page="currentPages[index]"
                                        @current-change="(page) => currentChange(index, page)" />
                                </div>
                            </div>
                            <div class="lower-reply reply-li" style="position: unset;border-bottom: none;">
                                <div style="display:flex;justify-content:space-between;align-items: flex-start;">
                                    <div class="lower-reply-img-container">
                                        <el-image fit="cover" draggable="false"
                                            :src="'https://kotokawa-akira-mywife.site/web/api/account/getProfile/' + user.id"
                                            alt="">
                                            <template #error>
                                                <img src="https://kotokawa-akira-mywife.site/web/api/account/getProfile/000"
                                                    alt="">
                                            </template>
                                        </el-image>
                                    </div>
                                    <div class="lower-reply-input">
                                        <textarea autocomplete="false" rows="3" placeholder=""
                                            v-model="reply_list[index]"></textarea>
                                    </div>
                                </div>
                                <div class="lower-reply-submit" @click="replyForUser(item.userName, item.id, index)">
                                    发布
                                </div>
                            </div>
                        </li>
                        <li style="margin:30px 0 10px 0;width: 100%;text-align: center;display: block;">没有更多评论了~</li>
                    </ul>
                </div>
            </div>
            <div class="lower-more" ref="lower_more">
                <div class="video-change">
                    <div style="padding-top:10px;font-size:18px;font-weight:bold">视频选集</div>
                    <div class="video-change-ul">
                        <div v-for="(item, index) in videoList" :key="index" class="video-change-li"
                            @click="changeVideo(item, index)">
                            <span>
                                {{ item.split(".")[0] }}
                            </span>
                        </div>
                    </div>
                    <div class="add-video video-change-li" v-if="isUp" @click="selectFile">添加视频</div>
                </div>
                <div class="more">

                </div>
            </div>
        </section>
        <transition name="fade" appear>
            <section class="lower-reply bottom_reply" v-show="reply_show">
                <div style="display:flex;justify-content:space-between;align-items: flex-start;">
                    <div class="lower-reply-img-container">
                        <el-image fit="cover" draggable="false"
                            :src="'https://kotokawa-akira-mywife.site/web/api/account/getProfile/' + user.id" alt="">
                            <template #error>
                                <img src="https://kotokawa-akira-mywife.site/web/api/account/getProfile/000" alt="">
                            </template>
                        </el-image>
                    </div>
                    <div class="lower-reply-input">
                        <textarea autocomplete="false" rows="3" placeholder="发条评论吧~" v-model="replyVideo"></textarea>
                    </div>
                </div>
                <div class="lower-reply-submit" @click="replyForVideo">
                    发布
                </div>
            </section>
        </transition>
        <transition name="fade" appear>
            <div class="backTop" v-show="reply_show">
                <BackTop></BackTop>
            </div>
        </transition>
    </main>
    <div>
        <el-dialog v-model="dialogVisible" title="添加到收藏夹" width="20%" center>
            <div style="display:flex;flex-direction:column;justify-content:flex-start;align-items: center;">
                <div class="dialog-collection-ul">
                    <div class="dialog-collection-li" v-for="item in collection" :key="item.name"
                        @click="addCollection(item.name)">
                        {{ item.name }}
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addNewCollection">新建</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="showUpLoad" title="上传" width="350px" :before-close="handleClose">
            <div class="progress-outer">
                <div style="margin-bottom:15px">{{ progress }}%</div>
                <div class="progress-inner" ref="progress_inner"></div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="handleClose">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import Dplayer from 'dplayer'
import { ElPagination, ElMessageBox, ElImage, ElNotification } from 'element-plus';
import BackTop from './BackTop.vue';
export default {
    props: ['isLogin', 'user', 'collection'],
    components: {
        ElPagination,
        BackTop,
        ElImage
    },
    data() {
        return {
            video: {},
            uper: {},
            player: {},
            videoList: [],
            now: 0,
            summary_show: false,
            comments: [],
            pageSize: 3,
            currentPages: [],
            reply_show: false,
            reply_list: [],
            replyVideo: '',
            userNames: [],
            isCollected: false,
            isLiked: false,
            isCenter: true,
            dialogVisible: false,
            switcher_isActive: true,
            newCollection: '',
            profile: 'https://kotokawa-akira-mywife.site/web/api/account/getProfile/000',
            profiles: [],
            isUp: false,
            showUpLoad: false,
            loader: {},
            progress: 0,
            file: document.createElement("input"),
            video_file: null
        }
    },
    watch: {
        video(value) {
            document.title = value.title;
            this.getUper(value.up);
            this.getVideoList();
            this.getComments(value.id);
            this.getProfile();
            //设置简介 等待页面渲染
            this.$nextTick(() => {
                if (this.$refs.summary_text.offsetHeight > 55) {
                    this.summary_show = true;
                    this.$refs.summary_more.addEventListener("click", () => {
                        if (this.$refs.text_container.offsetHeight > 55) {
                            this.$refs.summary_more.innerText = "展开";
                            this.$refs.text_container.style.height = "50px";
                        } else {
                            this.$refs.summary_more.innerText = "收起";
                            this.$refs.text_container.style.height = "auto";
                        }
                    });
                }
            });
        },
        comments() {
            for (let i = 0; i < this.comments.length; i++) {
                this.currentPages.push(1);
            }
            this.$nextTick(() => {
                let comments = document.querySelectorAll(".lower-comments-li-text");
                comments.forEach(el => {
                    let text = el.querySelector(".lower-comments-li-text-main");
                    if (text.offsetHeight > 55) {
                        let btn_show = el.querySelector(".lower-comments-li-text-more");
                        let container = el.querySelector(".lower-comments-li-text-container")
                        btn_show.style.display = "unset"
                        btn_show.onclick = () => {
                            if (container.offsetHeight > 55) {
                                btn_show.innerText = "展开";
                                container.style.maxHeight = "55px";
                            } else {
                                btn_show.innerText = "收起";
                                container.style.maxHeight = "none";
                            }
                        }
                    }
                    this.reply_list.push('');
                    this.userNames.push('');
                });
            });
        },
        collection(value) {
            this.isCollected = this.judgeIsCollected(value);
        },
        progress(value) {
            this.$refs.progress_inner.style.width = value + "%";
        }
    },
    methods: {
        handleClose() {
            ElMessageBox.confirm("确定关闭上传窗口吗? 将会停止上传!", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                this.showUpLoad = false;
                this.progress = 0;
                this.loader.abort();
                this.video_file = null;
            }).catch(() => { });
        },
        selectFile() {
            this.file.click();
        },
        beforeVideoUpload(rawFile) {
            if (rawFile.type != 'video/mp4' && rawFile.type != 'video/ogg') {
                ElMessageBox.alert('只能上传 <b style="color:var(--ava)">mp4、ogg</b> 格式的视频', '提示', { dangerouslyUseHTMLString: true, confirmButtonText: "确定" });
                return false;
            } else if (rawFile.size / 1024 / 1024 > 500) {
                ElMessageBox.alert('视频大小不能超过 <b style="color:var(--ava)">500MB</b> ', '提示', { dangerouslyUseHTMLString: true, confirmButtonText: "确定" });
                return false
            }
            return true
        },
        uploadVideo(id) {
            this.showUpLoad = true;
            const xhr = new XMLHttpRequest();
            this.loader = xhr;
            xhr.open('post', 'https://kotokawa-akira-mywife.site/web/api/video/uploadVideo/' + id);
            const data = new FormData();
            data.append("video", this.video_file);
            xhr.upload.addEventListener("progress", (e) => {
                let num = e.loaded * 100 / e.total;
                this.progress = num.toFixed(2);
            });
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState == xhr.DONE && xhr.status == 200) {
                    this.upload_id = "";
                    ElNotification({
                        title: "上传完毕",
                        message: "上传完毕",
                        duration: 0,
                        dangerouslyUseHTMLString: true
                    });
                    this.showUpLoad = false;
                    this.progress = 0;
                    this.clear();
                }
            });
            xhr.send(data);
        },
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
        getProfile() {
            this.ajax({
                method: 'get',
                url: 'https://kotokawa-akira-mywife.site/web/api/account/getProfile/' + this.video.up,
                responseType: 'blob'
            }, (res) => {
                if (res.type != "image/png") return;
                let profile_blob = res;
                this.profile = URL.createObjectURL(profile_blob);
            });
        },
        getVideoId() {
            let sps = window.location.pathname.split("/");
            return sps[sps.length - 1];
        },
        getVideoInfo() {
            fetch('https://kotokawa-akira-mywife.site/web/api/video/information/' + this.getVideoId(), {
                method: "get"
            }).then(res => {
                return res.json();
            }).then(data => {
                this.video = data;
            });
        },
        getUper(id) {
            fetch('https://kotokawa-akira-mywife.site/web/api/account/selectOneById/' + id, {
                method: "get"
            }).then(res => {
                return res.json();
            }).then(data => {
                this.uper = data;
                if (this.video.up === this.user.id)
                    this.isUp = true;
            });
        },
        getVideoList() {
            fetch('https://kotokawa-akira-mywife.site/web/api/video/videoList/' + this.getVideoId(), {
                method: 'get',
                headers: {
                    "Origin": "https://kotokawa-akira-mywife.site"
                }
            }).then(res => {
                return res.json();
            }).then(data => {
                this.videoList = data;
                this.$nextTick(() => {
                    this.player.video.src = "https://kotokawa-akira-mywife.site/web/api/video/" + this.video.id + "/" + data[0];
                    this.now = 0;
                    let list = document.querySelectorAll(".video-change-li");
                    list[0].style.color = 'var(--ava)';
                });
            });
        },
        changeVideo(file, index) {
            this.now = index;
            this.player.video.src = "https://kotokawa-akira-mywife.site/web/api/video/" + this.video.id + "/" + file;
            this.player.video.play();
            let list = document.querySelectorAll(".video-change-li");
            list.forEach(element => {
                element.style.color = 'unset';
            });
            list[index].style.color = 'var(--ava)';
        },
        getComments(id) {
            fetch('https://kotokawa-akira-mywife.site/web/api/comments/getComments/' + id, { method: 'get' })
                .then(res => {
                    return res.json();
                }).then(data => {
                    this.comments = data;
                });
        },
        currentChange(index, value) {
            this.currentPages[index] = value;
            this.$nextTick(() => {
                let comments = document.querySelectorAll(".lower-comments-li-text");
                comments.forEach(el => {
                    let text = el.querySelector(".lower-comments-li-text-main");
                    let btn_show = el.querySelector(".lower-comments-li-text-more");
                    let container = el.querySelector(".lower-comments-li-text-container")
                    btn_show.onclick = null;
                    if (text.offsetHeight > 55) {
                        btn_show.style.display = "unset"
                        btn_show.onclick = () => {
                            if (container.offsetHeight > 55) {
                                btn_show.innerText = "展开";
                                container.style.maxHeight = "55px";
                            } else {
                                btn_show.innerText = "收起";
                                container.style.maxHeight = "none";
                            }
                        }
                    } else {
                        btn_show.style.display = "none";
                    }
                });
            });
        },
        replyBtn(id, userName, index) {
            let reply_lis = document.querySelectorAll(".reply-li");
            reply_lis[index].style.setProperty("display", "flex", "important");
            let textarea = reply_lis[index].querySelector("textarea");
            textarea.placeholder = `@${userName} | uid:${id}`;
            this.userNames[index] = userName;
        },
        replyForVideo() {
            if (!this.isLogin) {
                ElMessageBox.alert('登录后即可发布评论', '提示', {
                    confirmButtonText: "确定"
                });
                return;
            }
            if (this.replyVideo == "") return;
            this.addComment(this.video.id, this.user.id, this.user.name, this.replyVideo);
            this.replyVideo = "";
        },
        replyForUser(userName, commentId, index) {
            if (!this.isLogin) {
                ElMessageBox.alert('登录后即可回复', '提示', {
                    confirmButtonText: "确定"
                });
                return;
            }
            if (this.reply_list[index] == '') return;
            let text = '';
            if (userName == this.userNames[index])
                text = this.reply_list[index];
            else
                text = `@${this.userNames[index]} ` + this.reply_list[index];
            this.addComment(commentId, this.user.id, this.user.name, text);
            this.reply_list[index] = "";
        },
        addComment(forid, uId, userName, text) {
            fetch('https://kotokawa-akira-mywife.site/web/api/comments/addComment', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    forId: forid,
                    uid: uId,
                    text: text,
                    userName: userName
                }),
                credentials: "include"
            }).then(res => {
                return res.json();
            }).then(data => {
                if (data.success == "true") {
                    ElMessageBox.alert('发布成功!');
                    this.getComments(this.video.id);
                } else if (data.reason == "WordsForbidden")
                    ElMessageBox.alert('评论包含敏感词汇!', '提示', {
                        confirmButtonText: "确定"
                    });
            });
        },
        judgeIsCollected(collection) {
            return collection.some(el => {
                return el.videos.some(video => {
                    return video.id == this.video.id;
                });
            })
        },
        btnLike() {
            this.btnLikeClick(!this.isLiked);
            this.isLiked = !this.isLiked;
        },
        btnLikeClick(isLiked) {
            let path = 'addLike';
            if (!isLiked) path = 'disLike';
            fetch('https://kotokawa-akira-mywife.site/web/api/video/' + path + '/' + this.video.id, { method: "get" })
                .then(res => {
                    return res.json();
                }).then(data => {
                    this.video.like = data;
                });
        },
        btnCollection() {
            if (!this.isLogin) {
                ElMessageBox.alert('登录后即可加入收藏', '提示', {
                    confirmButtonText: "确定"
                });
                return;
            }
            if (this.isCollected) {
                let Name = '';
                this.collection.some(el => {
                    return el.videos.some(video => {
                        if (video.id == this.video.id) Name = el.name;
                        return video.id == this.video.id;
                    });
                });
                fetch('https://kotokawa-akira-mywife.site/web/api/collection/removeFromCollection', {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: this.user.id, name: Name, videoId: this.video.id }),
                    credentials: "include"
                }).then(res => {
                    return res.json();
                }).then(data => {
                    if (data.success == "true") {
                        this.video.collection -= 1;
                        this.isCollected = false;
                    }
                });
            } else this.dialogVisible = true;
        },
        addCollection(Name) {
            fetch('https://kotokawa-akira-mywife.site/web/api/collection/addToCollection', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: this.user.id, name: Name, videoId: this.video.id }),
                credentials: "include"
            }).then(res => {
                return res.json();
            }).then(data => {
                if (data.success == "true") {
                    this.$parent.getCollection();
                    this.video.collection += 1;
                }
            });
            this.dialogVisible = false;
        },
        showComment() {
            this.switcher_isActive = true;
            this.$refs.lower_left.style.display = "block";
            this.$refs.lower_more.style.display = "none";
        },
        showMore() {
            this.switcher_isActive = false;
            this.$refs.lower_left.style.display = "none";
            this.$refs.lower_more.style.display = "block";
        },
        addNewCollection() {
            ElMessageBox.prompt(null, '添加到新建收藏夹', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '收藏夹名'
            }).then(msg => {
                if (msg.value == "" || msg.value == null) {
                    ElMessageBox.alert("文件名不能为空!");
                    return;
                }
                this.addCollection(msg.value);
            }).catch(() => { });
        },
    },
    created() {
        this.getVideoInfo();
        this.file.type = "file";
    },
    mounted() {
        const player = new Dplayer({
            container: this.$refs.player,
            video: {
                url: ""
            },
            theme: "#9AC8E2",
            danmaku: {
                api: "https://kotokawa-akira-mywife.site/web/api/comments/getDanmaku/",
                id: this.getVideoId()
            }
        });
        this.player = player;
        this.player.on("ended", () => {
            if (this.now !== this.videoList.length - 1) {
                const next = this.now + 1;
                this.changeVideo(this.videoList[next], next);
            }
        })
        window.addEventListener("scroll", () => {
            if (document.documentElement.scrollTop > 380) {
                this.reply_show = true;
            } else this.reply_show = false;
        });

        this.file.addEventListener("change", () => {
            let can = this.beforeVideoUpload(this.file.files[0]);
            if (can) {
                this.video_file = this.file.files[0];
                this.uploadVideo(this.video.id);
            }
        });
    }
}
</script>
<style lang="css">
.dialog-collection-ul {
    max-height: 300px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}

.dialog-collection-li {
    font-size: 18px;
    margin: 5px 0 5px 0;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid var(--line_regular);
    user-select: none;
    cursor: pointer;
    transition: all .3s ease;
}

.dialog-collection-li:hover {
    color: var(--ava);
    border: 1px solid var(--ava);
}

.backTop {
    position: fixed;
    width: 50px;
    height: 50px;
    right: 30px;
    bottom: 100px;
}

.lower ul {
    margin: 0;
    padding: 0;
}

.lower li {
    list-style: none;
}

.lower-comments {
    padding: 15px 0 15px 0;
    margin-bottom: 150px;
}

.lower-comments ul {
    width: 100%;
}

.lower-comments li {
    display: flex;

}

.player-container {
    width: 100%;
}

.player {
    aspect-ratio: 16/9;
    width: 80%;
    margin: 0 auto;
    box-shadow: 0px 0px 10px 1px rgb(225 225 225 / 80%);
}

.video-header {
    margin: 0 auto;
    padding: 40px 0 30px 0;
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
}

.video-info {
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.video-info-title {
    font-size: 25px;
    overflow: hidden;
    width: 100%;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-wrap: anywhere;
}

.video-info-detail {
    width: 100%;
    margin-top: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.video-info-time {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    margin-right: 20px;
}

.video-info-playcount {
    font-size: 18px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.video-info-uper {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.video-info-uper-img {
    aspect-ratio: 1/1;
    width: 70px;
    overflow: hidden;
    border-radius: 35px;
    margin-right: 20px;
}

.video-info-uper-img img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.video-info-uper-name {
    font-size: 30px;
}

.lower {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 auto;
    padding-top: 30px;
    user-select: none;
}

.lower-left {
    width: 65%;
}

.lower-more {
    width: 30%;
    margin: 5px 0 100px 0;
}

.video-change-ul::-webkit-scrollbar {
    width: 5px;
}

.video-change-ul::-webkit-scrollbar-button {
    opacity: 0.0;
}

.video-change-ul::-webkit-scrollbar-thumb {
    background-color: rgb(139, 139, 139, 0.0);
    border-radius: 3px;
}

.video-change-ul:hover::-webkit-scrollbar-thumb {
    background-color: rgb(139, 139, 139, 1.0);
}

.video-change {
    border-radius: 6px;
    border: 1px solid var(--line_regular);
    background-color: var(--bg_regular);
}

.video-change-ul {
    max-height: 200px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    transition: all .3s ease;
}

.video-change-li {
    text-align: left;
    padding: 5px 10px 5px 10px;
    margin: 5px;
    height: 30px;
    min-height: 30px;
    max-height: 30px;
    width: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 6px;
    border: 1px solid transparent;
    transition: all .3s ease;
    cursor: pointer;
}

.video-change-li span {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.video-change-li:hover {
    max-height: 200px;
    height: auto !important;
    white-space: unset;
    background: #fff;
    border: 1px solid var(--line_regular);
}

.video-change-li:hover span {
    overflow: unset;
    text-overflow: unset;
    white-space: pre-wrap;
}

.lower-left-options {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 15px 0 15px 0;
}

.lower-left-summary {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 20px;
    padding: 10px 0 10px 0;
    border-top: 1px solid var(--line_regular);
    border-bottom: 1px solid var(--line_regular);
}

.lower-left-summary-text {
    user-select: text;
    text-align: left;
    font-size: 17px;
    white-space: pre-wrap;
}

.lower-left-summary-text-container {
    overflow: hidden;
    height: 50px;
}

.lower-left-summary-more {
    font-size: 16px;
    transition: color .3s ease;
    user-select: none;
    cursor: pointer;
    margin-top: 10px;
    font-weight: bold;
}

.lower-left-summary-more:hover {
    color: var(--ava);
}

.lower-left-options-li {
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 24px;
    margin-right: 50px;
    transition: color .3s ease;
    cursor: pointer;
}

.lower-left-options-li svg {
    margin-right: 8px;
    transition: fill .3s ease;
}

.lower-left-options-li:hover {
    color: var(--ava);
}

.lower-left-options-li:hover svg {
    fill: var(--ava);
}

.lower-comments-li {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 20px 0 15px 0;
    border-bottom: 1px solid var(--line_regular);
}

.lower-comments-li-img-container {
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 35px;
    margin-right: 20px;
}

.lower-comments-li-img-container img {
    object-fit: cover;
    width: 100%;
}

.lower-comments-li-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
}

.lower-comments-li-header-name {
    text-align: left;
    font-size: 25px;
    user-select: text;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-wrap: anywhere;
}

.lower-comments-li-text {
    padding: 20px 0 0px 0;
    font-size: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
}

.lower-comments-li-text-main {
    text-align: left;
    user-select: text;
    color: #000;
}

.lower-comments-li-text-more {
    font-size: 16px;
    font-weight: bolder;
    margin: 10px 0 10px 10px;
    transition: color .3s ease;
    cursor: pointer;
    display: none;
}

.lower-comments-li-text-time {
    padding: 10px 0 0px 0;
}

.lower-comments-li-text-container {
    overflow: hidden;
    max-height: 55px;
}

.lower-comments-li-text-more:hover {
    color: var(--ava)
}

.lower-comments-li-reply {
    padding-left: 50px;
    width: 100%;
    box-sizing: border-box;
}

.lower-comments-li-reply-li {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 10px 0 10px 0;
}

.el-pager {
    width: unset !important;
}

.reply_btn {
    margin-left: 20px;
    color: #000;
    transition: color .3s ease;
    font-size: 16px;
    cursor: pointer;
}

.reply_btn:hover {
    color: var(--ava)
}

.reply-li {
    display: none !important;
}

.lower-reply-img-container {
    width: 70px;
    height: 70px;
    border-radius: 35px;
    overflow: hidden;
    margin-right: 30px;
}

.lower-reply img {
    width: 100%;
    height: 100%;
}

.lower-reply {
    border-top: 1px solid var(--line_regular);
    border-bottom: 1px solid var(--line_regular);
    position: fixed;
    bottom: 0;
    left: 10%;
    width: 800px;
    min-width: 400px;
    padding: 10px 0 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
}

.lower-reply-input textarea {
    outline: none;
    border: 1px solid var(--line_regular);
    width: 500px;
    height: 45px;
    font-family: inherit;
    line-height: 38px;
    color: #000;
    resize: none;
    transition: all .3s ease;
    font-size: 20px;
    line-height: 20px;
    padding: 10px;
}

.lower-reply-input textarea:focus {
    height: 120px;
}

.lower-reply-submit {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    aspect-ratio: 16/9;
    border-radius: 6px;
    background-color: var(--ava);
    color: #fff;
    transition: background-color .3s ease;
    cursor: pointer;
    user-select: none;
}

.lower-reply-submit:hover {
    background-color: #9AC8FF;
}

.fade-enter-active,
.fade-leave-active {
    transition: all .3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0.0 !important;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1.0 !important;
}

.btn-active {
    fill: var(--ava) !important;
    color: var(--ava) !important;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.lower-switcher {
    display: none;
    font-size: 20px;
    justify-content: space-around;
    align-items: center;
    padding: 15px 0px 15px 0;
    margin: 0 5px 0 5px;
    border-bottom: 1px solid var(--line_regular);
}

.lower-switcher-active {
    font-weight: 700;
    color: var(--ava);
}

.options-img-container {
    width: 50px;
    aspect-ratio: 1/1;
    margin-right: 10px;
    overflow: hidden;
    border-radius: 25px;
}

.options-img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.options-info {
    display: none;
    justify-content: flex-start;
    align-items: center;
    font-size: 20px;
}

.el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 !important;
}

.dialog-collection-ul::-webkit-scrollbar {
    width: 5px;
}

.dialog-collection-ul::-webkit-scrollbar-button {
    opacity: 0.0;
}

.dialog-collection-ul::-webkit-scrollbar-thumb {
    background-color: rgb(139, 139, 139, 0.0);
    border-radius: 3px;
}

.dialog-collection-ul:hover::-webkit-scrollbar-thumb {
    background-color: rgb(139, 139, 139, 1.0);
}


.el-dialog__body {
    padding: 5px 20px 5px 20px !important;
}

.el-image {
    height: 70px;
    width: 70px;
    overflow: hidden;
    border-radius: 35px;
}

.progress-outer {
    width: 100%;
    height: 60px;
}

.progress-inner {
    width: 0%;
    height: 20px;
    background-color: var(--ava);
    border: 1px solid var(--line_regular);
}

@media screen and (max-width:550px) {
    .lower-left-summary {
        font-size: 17px;
    }

    .lower-comments-li-text {
        font-size: 14px;
    }

    .video-header {
        width: 100%;
        padding: 40px 10px 30px 10px;
    }

    .video-info {
        width: 100%;
    }

    .player {
        width: 100%;
    }

    .video-info-uper {
        display: none;
    }

    .lower-comments-li {
        overflow: hidden;
    }

    .el-dialog {
        width: 80% !important;
    }

    .lower-reply {
        opacity: 1.0 !important;
        left: 0;
        width: 100vw;
    }

    .bottom_reply {
        display: flex !important;
    }

    .lower-reply-input textarea {
        width: 120px !important;
        font-size: 10px;
    }

    .lower {
        width: 100%;
        margin: 0;
        padding: 0 5px 0 5px;
        box-sizing: border-box;
    }

    .lower-reply textarea {
        width: 120px !important;
    }

    .lower-switcher {
        display: flex;
    }

    .lower-left {
        width: 100% !important;
    }

    .lower-more {
        width: 100% !important;
        display: none;
    }

    .reply-li {
        width: 100%;
    }

    .options-info {
        display: flex;
    }

    .lower-left-options-li {
        margin-right: 3px;
    }

    .el-message-box {
        width: 80% !important
    }

    .video-info-title {
        font-size: 18px !important;
    }

    .video-info-time {
        font-size: 15px !important;
    }

    .video-info-playcount {
        font-size: 15px !important;
    }
}
</style>