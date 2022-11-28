<template>
    <main class="main-view">
        <section>
            <ul>
                <li v-for="(item, index) in videos" :key="index">
                    <div class="border-container">
                        <div class="img-container">
                            <a :href="'https://kotokawa-akira-mywife.site/web/Video/' + item.id" target="_blank">
                                <img :src="'https://kotokawa-akira-mywife.site/web/image?filePath=%2Fopt%2FServer%2FvideoStation%2FvideoImg%2F' + item.id"
                                    alt="" loading="lazy">
                            </a>
                        </div>
                        <a :href="'https://kotokawa-akira-mywife.site/web/Video/' + item.id" target="_blank">
                            <div class="main-recommend-li-title" :title="item.title">
                                {{ item.title }}
                            </div>
                        </a>
                        <div class="main-recommend-li-detail-container">
                            <div class="main-recommend-li-detail" :title="item.upName">
                                <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + item.up" target="_blank">
                                    <div class="upName_span">
                                        {{ item.upName }}
                                    </div>
                                </a>
                            </div>
                            <div style="width:47%" class="main-recommend-li-detail ">
                                <div class="main-recommend-li-detail-play">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                        <path
                                            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
                                    </svg>

                                    <span>
                                        {{ item.play }}
                                    </span>
                                </div>
                                <div class="main-recommend-li-detail-play">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
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
            <div class="loadmore" v-show="isLoading" ref="loadmore">正在加载···</div>
        </section>
        <transition name="backtopShow" appear>
            <div class="aside" v-show="backtop_show">
                <BackTop height="50" width="50"></BackTop>
            </div>
        </transition>
    </main>
    <div class="load-more" ref="load" @click="getVideos">
        <b>加载更多</b>
    </div>
</template>
<script>
import BackTop from './BackTop.vue'
export default {
    components: {
        BackTop
    },
    data() {
        return {
            videos: [],
            backtop_show: false,
            isLoading: false,
            lock: true
        }
    },
    methods: {
        getFirstVideos() {
            this.isLoading = true;
            fetch("https://kotokawa-akira-mywife.site/web/api/video/getVideos/10/?first=true", {
                method: 'get',
                credentials: 'include'
            }).then(res => {
                return res.json();
            }).then(data => {
                this.videos = data;
                this.isLoading = false;
            });
        },
        getVideos() {
            this.lock = false;
            this.$refs.loadmore.innerText = "正在加载···";
            this.isLoading = true;
            fetch("https://kotokawa-akira-mywife.site/web/api/video/getVideos/10/?first=false", {
                method: 'get',
                credentials: 'include'
            }).then(res => {
                return res.json();
            }).then(data => {
                this.isLoading = false;
                if (data.length != 0) {
                    this.$refs.loadmore.innerText = "";
                    data.forEach(element => {
                        this.videos.push(element);
                    });
                    this.lock = true;
                }
                else {
                    this.isLoading = true;
                    this.$refs.loadmore.innerText = "没有更多数据了···";
                    this.lock = false;
                }
            });
        },
        scrollListener() {
            window.addEventListener("scroll", () => {
                if (document.documentElement.scrollTop > 64)
                    this.backtop_show = true;
                else
                    this.backtop_show = false;
                if (document.documentElement.scrollTop > document.body.offsetHeight - window.innerHeight - 30) {
                    if (this.lock)
                        this.getVideos();
                }
            });
        }
    },
    created() {
        this.getFirstVideos();
    },
    mounted() {
        this.scrollListener();
        this.$refs.load.addEventListener("mousedown", () => {
            this.$refs.load.classList.add("btn-hold");
        });
        document.addEventListener("mouseup", () => {
            this.$refs.load.classList.remove("btn-hold");
        });
    }
}
</script>
<style lang="css">
.border-container {
    padding: 5px;
    border: 1px solid transparent;
    border-radius: 6px;
    transition: all .3s ease;
}

.border-container:hover {
    border: 1px solid var(--ava);
}

.load-more {
    display: flex;
    justify-content: center;
    align-items: center;
    writing-mode: tb;
    width: 38px;
    padding: 12px 5px 12px 5px;
    cursor: pointer;
    user-select: none;
    border-radius: 10px;
    border: 1px solid var(--line_regular);
    position: fixed;
    right: 30px;
    top: 40%;
    background-color: rgba(255, 255, 255, 0.6);
    transition: all .3s ease;
    letter-spacing: 2px;
}

.load-more:hover {
    background-color: rgb(225, 225, 225, 0.6);
}

.btn-hold {
    transform: scale(0.9);
}

.main-view ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    height: auto;
}

.main-view li {
    aspect-ratio: 16/11;
    width: 20%;
    padding: 5px;
    box-sizing: border-box;
}

.main-view li img {
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

.main-view section {
    padding-top: 20px;
    width: 80%;
}


.main-recommend-li-title {
    height: 54px;
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
    margin-left: 5px;
}

.main-recommend-li-detail-play {
    padding-right: 5px;
    white-space: nowrap;
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

@media screen and (max-width:550px) {
    .main-view section {
        width: 100%;
    }

    .main-view li {
        width: 50%;
        padding: 10px;
    }

    .aside {
        bottom: 65px;
        right: 30px;
    }

    .main-recommend-li-detail {
        font-size: 14px;
    }

    .main-recommend-li-detail span {
        font-size: 10px;
        margin-left: 5px;
    }

    .main-recommend-li-detail svg {
        height: 10px;
        width: 10px;
    }

    .main-recommend-li-title {
        font-size: 14px;
        height: 35px; 
    }

    .load-more {
        display: none;
    }

    .options-li {
        margin: 0 !important;
    }
}

@media screen and (550px<width<=800px) {
    .main-recommend-li-detail {
        font-size: 14px;
    }

    .main-recommend-li-detail span {
        font-size: 10px;
        margin-left: 5px;
    }

    .main-recommend-li-detail svg {
        height: 10px;
        width: 10px;
    }

    .main-recommend-li-title {
        font-size: 14px;
        height: 35px;
    }

    .main-view li {
        width: 33%;
    }
}
@media screen and (800px<width<=1100px) {
    .main-recommend-li-detail {
        font-size: 14px;
    }

    .main-recommend-li-detail span {
        font-size: 10px;
        margin-left: 5px;
    }

    .main-recommend-li-detail svg {
        height: 10px;
        width: 10px;
    }

    .main-recommend-li-title {
        font-size: 14px;
        height: 35px;
    }

    .main-view li {
        width: 25%;
    }
}
@media screen and (1100px<width<=1500px) {
    .main-recommend-li-detail {
        font-size: 16px;
    }

    .main-recommend-li-detail span {
        font-size: 12px;
        margin-left: 5px;
    }

    .main-recommend-li-detail svg {
        height: 12px;
        width: 12px;
    }

    .main-recommend-li-title {
        font-size: 16px;
        height: 40px;
    }
}
</style>