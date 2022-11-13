<template>
    <main class="main-view" v-loading="isLoading" element-loading-text="加载中">
        <section v-if="type == 'videos'">
            <div class="videos">
                <ul v-show="!isVideosEmpty">
                    <li v-for="(item, index) in videosChange" :key="index">
                        <div class="border-container">
                            <div class="img-container">
                                <a :href="'https://kotokawa-akira-mywife.site/web/Video/' + item.id" target="_blank"
                                    :title="item.title">
                                    <img :src="'https://kotokawa-akira-mywife.site/web/image?filePath=%2Fopt%2FServer%2FvideoStation%2FvideoImg%2F' + item.id"
                                        alt="" loading="lazy">
                                </a>
                            </div>
                            <a :href="'https://kotokawa-akira-mywife.site/web/Video/' + item.id" target="_blank"
                                :title="item.title">
                                <div class="main-recommend-li-title">
                                    {{ item.title }}
                                </div>
                            </a>
                            <div class="main-recommend-li-detail-container">
                                <div class="main-recommend-li-detail" :title="item.upName">
                                    <div class="upName_span">
                                        {{ item.upName }}
                                    </div>
                                </div>
                                <div class="main-recommend-li-detail">
                                    <div class="main-recommend-li-detail-play">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
                                        </svg>

                                        <span>
                                            {{ item.play }}
                                        </span>
                                    </div>
                                    <div class="main-recommend-li-detail-play">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z" />
                                        </svg>
                                        <span>{{ item.time.slice(0, 10) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-show="isVideosEmpty" class="Empty">
                    <div>没有数据了~</div>
                </div>
            </div>
            <div class="pagination_container">
                <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="videos.length"
                    :hide-on-single-page="true" :current-page="currentPage" @current-change="currentChange" />
            </div>
        </section>
        <section v-else>
            <div class="users">
                <ul v-show="!isUsersEmpty">
                    <li v-for="(item, index) in usersChange" :key="index">
                        <div class="users-img">
                            <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + item.id">
                                <el-image fit="cover" draggable="false"
                                    :src="'https://kotokawa-akira-mywife.site/web/api/account/getProfile/' + item.id"
                                    alt="">
                                    <template #error>
                                        <img src="https://kotokawa-akira-mywife.site/web/api/account/getProfile/000"
                                            alt="">
                                    </template>
                                </el-image>
                            </a>
                        </div>
                        <div class="users-id">
                            <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + item.id">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm0 13.5c0 .276-.224.5-.5.5h-19c-.276 0-.5-.224-.5-.5v-6.5h20v6.5zm0-9.5h-20v-1.5c0-.276.224-.5.5-.5h19c.276 0 .5.224.5.5v1.5zm-9 6h-9v-1h9v1zm-3 2h-6v-1h6v1zm10-2h-3v-1h3v1z" />
                                </svg>
                                {{ item.id }}
                            </a>
                        </div>
                        <div class="users-name" :title="item.name">
                            <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + item.id">
                                {{ item.name }}
                            </a>
                        </div>
                    </li>
                </ul>
                <div v-show="isUsersEmpty" class="Empty">
                    <div>没有数据了~</div>
                </div>
            </div>
            <div class="pagination_container">
                <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="users.length"
                    :hide-on-single-page="true" :current-page="currentPage" @current-change="currentChange" />
            </div>
        </section>

        <transition name="backtopShow" appear>
            <div class="aside" v-show="backtop_show">
                <BackTop height="50" width="50"></BackTop>
            </div>
        </transition>
    </main>
</template>
<script>
import BackTop from './BackTop.vue'
import { ElPagination } from 'element-plus'
import bus from '../bus/bus'
export default {
    components: {
        BackTop,
        ElPagination
    },
    data() {
        return {
            isLoading: true,
            type: 'videos',
            videos: [],
            users: [],
            backtop_show: false,
            currentPage: 1,
            currentPage_users: 1,
            pageSize: 20,
            rank: "play",
            params: ''
        }
    },
    watch: {
        type(newValue) {
            if (newValue == "videos") {
                this.isLoading = true;
                this.currentPage = 1;
                this.users = [];
                this.getVideos();
            } else {
                this.isLoading = true;
                this.currentPage = 1;
                this.videos = [];
                this.getUsers();
            }
        },
        rank(newValue) {
            if (newValue == "play")
                this.videos = this.rankByPlay(this.videos);
            else
                this.videos = this.rankByTime(this.videos);
            this.currentPage = 1;
        }
    },
    computed: {
        videosChange() {
            return this.videos.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
            );
        },
        usersChange() {
            return this.users.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
            );
        },
        isUsersEmpty() {
            return this.users.length == 0;
        },
        isVideosEmpty() {
            return this.videos.length == 0;
        }
    },
    methods: {
        getParams(name) {
            let pa = window.location.href.split("?");
            if (pa.length <= 1) return "";
            let params = new URLSearchParams(pa[1]);
            return params.get(name);
        },
        scrollListener() {
            window.addEventListener("scroll", () => {
                if (document.documentElement.scrollTop > 64)
                    this.backtop_show = true;
                else
                    this.backtop_show = false;
            });
        },
        currentChange(currentPage) {
            this.currentPage = currentPage;
            window.scrollTo(0, 0);
        },
        rankByPlay(arr) {
            for (let i = 0; i < arr.length; i++) {
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i].play < arr[j].play) {
                        [arr[i], arr[j]] = [arr[j], arr[i]]
                    } else if (arr[i].play == arr[j].play && arr[i].size < arr[j].size) {
                        [arr[i], arr[j]] = [arr[j], arr[i]]
                    }
                }
            }
            return arr
        },
        rankByTime(arr) {
            for (let i = 0; i < arr.length; i++) {
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i].time_long < arr[j].time_long) {
                        [arr[i], arr[j]] = [arr[j], arr[i]]
                    } else if (arr[i].time_long == arr[j].time_long && arr[i].size < arr[j].size) {
                        [arr[i], arr[j]] = [arr[j], arr[i]]
                    }
                }
            }
            return arr
        },
        getVideoSimulator() {
            setTimeout(() => {
                for (let i = 0; i < 42; i++) {
                    this.videos.push({ id: 10063301, title: (i + 1) + "这是一段测试文字（标题），可能会溢出，边框，但是别担心，溢出部分会被省略", time: "2022-10-01 14:00:00", upName: "Kirara测试的文字不拥挤与jashdkasdhjkdjkashkjdashjkashs", play: 10000 + i, time_long: 100 - i })
                }
                this.isLoading = false;
            }, 1000)
        },
        getUserSimulator() {
            setTimeout(() => {
                for (let i = 0; i < 42; i++) {
                    this.users.push({ id: 10063301, name: "奥斯卡级到" });
                }
                this.isLoading = false;
            }, 1000)
        },
        getVideos() {
            console.log(this.params);
            fetch('https://kotokawa-akira-mywife.site/web/api/video/search?keywords=' + this.params, {
                method: 'get',
                headers: {
                    "Content-Type": "text/html;charset=utf-8"
                }
            }).then(res => {
                return res.json();
            }).then(data => {
                this.videos = data;
                this.isLoading = false;
            });
        },
        getUsers() {
            fetch('https://kotokawa-akira-mywife.site/web/api/account/userSearch?keywords=' + this.params, { method: 'get' })
                .then(res => {
                    return res.json();
                }).then(data => {
                    this.users = data;
                    this.isLoading = false;
                });
        }
    },
    created() {
        this.params = this.getParams("keywords")

        this.getVideos();
        bus.on("typeChange", (value) => {
            this.type = value;
        });
        bus.on("rankChange", (value) => {
            this.rank = value;
        });
    },
    mounted() {
        this.scrollListener();

    }
}
</script>
<style lang="css">
.main-recommend-li-title {
    height: 54px;
}
.border-container {
    padding: 5px;
    border: 1px solid transparent;
    border-radius: 6px;
    transition: all .3s ease;
}

.border-container:hover {
    border: 1px solid var(--ava);
}
.Empty {
    min-height: 780px !important;
    font-size: 30px;
}

.Empty div {
    margin-top: 50px;
}

.users {
    padding-top: 20px;
    width: 80%;
    margin: 0 auto;
}

.users ul {
    margin: 0;
    padding: 0;
    min-height: 780px !important;
    height: auto;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    height: auto;
}

.users li {
    list-style: none;
    display: flex;
    width: 20%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
}

.users-name {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.main-view section {
    width: 100%;
}

.main-view .videos ul {
    margin: 0;
    padding: 0;
    min-height: 780px !important;
    height: auto;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    height: auto;
}

.main-view .videos li {
    aspect-ratio: 16/11;
    width: 20%;
    padding: 20px 10px 20px 10px;
    box-sizing: border-box;
}

.main-view .videos li img {
    object-fit: cover;
    aspect-ratio: 16/9;
    width: 100%;
    cursor: pointer;
}

.img-container {
    border-radius: 6px;
    overflow: hidden;
}

.main-view {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.main-view .videos {
    padding-top: 20px;
    width: 80%;
    margin: 0 auto;
}


.main-recommend-li-title {
    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 20px;
    text-align: left;
    transition: color .3s ease;
    cursor: pointer;
    color: #000;
}

.main-recommend-li-detail {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    width: 53%;
    justify-content: flex-start;
    align-items: flex-start;
    color: rgb(129, 129, 129);
    transition: color .3s ease;
    cursor: pointer;
    text-align: left;
}

.upName_span {
    text-align: left;
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    word-wrap: break-word;
}

.main-recommend-li-detail svg {
    fill: rgb(129, 129, 129);
    transition: fill .3s ease;
}

.main-recommend-li-detail-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 5px;
}

.main-recommend-li-detail-container span {
    padding-top: 2.5px;
}

.main-recommend-li-detail-play {
    padding-right: 5px;
}

.main-recommend-li-detail:hover {
    color: var(--ava);
}

.main-recommend-li-detail:hover svg {
    fill: var(--ava);
}

.main-recommend-li-title:hover {
    color: var(--ava);
}

.loadmore {
    font-size: 25px;
    padding: 5px 0px 20px 0px;
}

.aside {
    position: fixed;
    right: 50px;
    bottom: 50px;
}

.backtopShow-enter-active,
.backtopShow-leave-active {
    transition: all .3s ease;
}

.backtopShow-enter-from,
.backtopShow-leave-to {
    opacity: 0.0 !important;
}

.backtopShow-enter-to,
.backtopShow-leave-from {
    opacity: 1.0 !important;
}

.pagination_container {
    width: 80%;
    margin: 0 auto;
    padding: 15px 0 25px 0;
}

.el-pagination {
    justify-content: center;
}

.users-img {
    height: 100px;
    width: 100px;
    border-radius: 50px;
    overflow: hidden;
}

.users-img img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.users a {
    transition: all .3s ease;
}

.users a svg {
    transition: all .3s ease;
}

.users-id a:hover svg {
    fill: var(--ava);
}

.users a:hover {
    color: var(--ava)
}

.el-image {
    width: 100% !important;
    height: 100% !important;
}

@media screen and (max-width:550px) {
    .main-view .videos ul {
        height: auto !important;
    }

    .main-view .videos {
        width: 100%;
    }

    .main-view li {
        width: 50% !important;
        padding: 10px;
    }

    .aside {
        bottom: 65px;
        right: 30px;
    }

    .users {
        width: 100%;
    }

    .users ul {
        height: auto !important;
    }

    .main-recommend-li-detail {
        font-size: 14px !important;
    }

    .main-recommend-li-detail span {
        font-size: 10px !important;
        margin-left: 5px;
    }

    .main-recommend-li-detail svg {
        height: 10px;
        width: 10px;
    }

    .main-recommend-li-title {
        font-size: 14px !important;
        height: 35px !important;
    }
}
</style>