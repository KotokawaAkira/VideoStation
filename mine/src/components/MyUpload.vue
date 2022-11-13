<template>
    <div class="my-upload-main">
        <div class="title">我的上传</div>
        <div class="my-upoad-show" v-loading="isLoading" element-loading-text="加载中">
            <div class="my-up-load-search">
                <input type="text" placeholder="搜索视频" v-model="keywords">
            </div>
            <div class="placeholder" v-if="isEmpty">没有更多了~</div>
            <div class="my-upload-ul" v-else>
                <div class="my-upload-li" v-for="(item, index) in selected.slice(
                    (this.currentPage - 1) * this.pageSize,
                    this.currentPage * this.pageSize
                )" :key="index">
                    <a :href="'https://kotokawa-akira-mywife.site/web/Video/' + item.id" target="_blank">
                        <div class="img-container">
                            <img draggable="false"
                                :src="'https://kotokawa-akira-mywife.site/web/image?filePath=%2Fopt%2FServer%2FvideoStation%2FvideoImg%2F' + item.id"
                                alt="">
                        </div>
                    </a>
                    <div class="item-info">
                        <div class="item-left">
                            <a style="width:100%" :href="'https://kotokawa-akira-mywife.site/web/Video/' + item.id"
                                target="_blank">
                                <div class="item-name" :title="item.title">
                                    {{ item.title }}
                                </div>
                            </a>
                            <div v-if="btnVisible" class="btn-delete" @click="deleteVideo(item.id)">
                                删除
                            </div>
                        </div>
                        <div class="item-time">
                            {{ item.time }}
                        </div>
                    </div>

                </div>
            </div>
            <div class="pagination">
                <el-pagination large layout="prev, pager, next" :page-size="pageSize" :total="list.length"
                    :hide-on-single-page="true" :current-page="currentPage" @current-change="currentChange" />
            </div>
        </div>
    </div>
</template>
<script>
import { ElPagination, ElMessage } from 'element-plus'
export default {
    props: ['btnVisible', 'user'],
    components: {
        ElPagination
    },
    data() {
        return {
            list: [],
            currentPage: 1,
            pageSize: 20,
            selectedList: [],
            keywords: '',
            isLoading: true,
        }
    },
    computed: {
        selected() {
            if (this.keywords == "") return this.list;
            return this.list.filter((item) => {
                return item.title.indexOf(this.keywords) != -1;
            });
        },
        isEmpty() {
            return this.list.length == 0;
        }
    },
    methods: {
        currentChange(value) {
            this.currentPage = value;
        },
        getMyUpload() {
            this.isLoading = true;
            let path_uid = this.$parent.getPathUid();
            fetch('https://kotokawa-akira-mywife.site/web/api/video/getByUp/' + path_uid, { method: 'get' })
                .then(res => {
                    return res.json();
                }).then(data => {
                    this.list = data;
                    this.isLoading = false;
                });
        },
        deleteVideo(id) {
            fetch('https://kotokawa-akira-mywife.site/web/api/video/delete', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id, uid: this.user.id }),
                credentials: "include"
            }).then(res => {
                return res.json();
            }).then(data => {
                if (data.success == 'true') {
                    ElMessage({
                        message: "删除成功",
                        type: "success"
                    });
                    this.getMyUpload();
                }
                else ElMessage.error("删除失败");
            });
        }
    },
    created() {
        this.getMyUpload();
    }
}
</script>
<style lang="css">
.my-upload-main {
    background-color: #fff;
}

.my-up-load-search {
    padding: 20px 20px 20px 0;
    display: flex;
    justify-content: flex-end;
}

.my-up-load-search input {
    outline: none;
    border: none;
    padding: 5px 10px 5px 10px;
    height: 30px;
    width: 200px;
    font-size: 18px;
    background-color: rgb(235, 235, 235);
    border-radius: 6px;
    transition: all .3s ease;
}

.my-up-load-search input:focus {
    width: 300px;
}

.my-upload-ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 10px;
}

.my-upload-li {
    width: 20%;
    box-sizing: border-box;
    padding: 5px;
}

.item-time {
    text-align: left;
    user-select: none;
    padding: 3px;
}

.pagination {
    margin: 0 auto;
    padding: 10px 5px 10px 5px;
}

.my-upoad-show {
    min-height: 500px;
}

.placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    height: 95%;
}

.item-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
}

.btn-delete {
    height: 100%;
    width: 30% !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid var(--line_regular);
    padding: 5px;
    cursor: pointer;
    user-select: none;
    transition: all .3s ease;
}

.item-left {
    display: flex;
    align-items: center;
    width: 100%;
}

.btn-delete:hover {
    border: 1px solid #f56c6c;
    color: #f56c6c;
}

@media screen and (max-width:550px) {
    .my-upload-li {
        width: 50%;
    }
}
</style>