<template>
    <div class="collection-mian" v-loading="isLoading" element-loading-text="加载中">
        <div class="title">我的收藏</div>
        <div v-if="isEmpty">
            <div class="collections" v-for="(item, index) in collection" :key="item.name">
                <div class="btn-name" style="font-size:26px;text-align:left;padding:0 25px 0 25px">
                    <div class="collection-name" @click="btnVisible && rename(item.name)">{{ item.name }}</div>
                    <div class="visible-switch" v-if="btnVisible">
                        <div>
                            <svg style="fill:rgb(180,180,180)" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24">
                                <path
                                    d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z" />
                            </svg>
                        </div>
                        <el-switch v-model="item.visible" class="mt-2" style="margin-left: 24px" inline-prompt
                            @change="setVisible(item)" />
                    </div>
                </div>
                <ul class="collection-ul">
                    <li class="collection-li" v-for="video in item.videos.slice(
                        (this.currentPages[index] - 1) * this.pageSize,
                        this.currentPages[index] * this.pageSize
                    )" :key="video.id">
                        <div class="collection-li-inner">
                            <a :href="'https://kotokawa-akira-mywife.site/web/Video/' + video.id" target="_blank">
                                <div class="img-container">
                                    <img draggable="false"
                                        :src="'https://kotokawa-akira-mywife.site/web/image?filePath=%2Fopt%2FServer%2FvideoStation%2FvideoImg%2F' + video.id"
                                        alt="">
                                </div>
                            </a>
                            <div class="inner-options">
                                <a style="width:100%" :href="'https://kotokawa-akira-mywife.site/web/Video/' + video.id"
                                    target="_blank">
                                    <div class="item-name" :title="video.title">{{ video.title }}</div>
                                </a>
                                <div class="options btn-delete-collection" v-if="btnVisible"
                                    @click="removeCollection(item.name, video.id)">
                                    删除
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="pagination">
                    <el-pagination large layout="prev, pager, next" :page-size="pageSize" :total="item.videos.length"
                        :hide-on-single-page="true" :current-page="currentPages[index]"
                        @current-change="(page) => currentChange(index, page)" />
                </div>
            </div>
        </div>
        <div v-else class="empty">
            收藏夹为空~
        </div>
    </div>
</template>
<script>
import { ElMessage, ElMessageBox, ElPagination, ElSwitch } from 'element-plus';
export default {
    components: {
        ElPagination, ElSwitch
    },
    props: ['user', 'btnVisible'],
    data() {
        return {
            isLoading: true,
            collection: [],
            pageSize: 10,
            currentPages: []
        }
    },
    computed: {
        isEmpty() {
            if (this.collection.length == 0)
                return false;
            else return true
        }
    },
    watch: {
        collection(value) {
            for (let i = 0; i < value.length; i++) {
                this.currentPages.push(1);
            }
            this.$nextTick(() => {
                this.setBtnAvailable(this.btnVisible);
            });
        },
    },
    methods: {
        getCollection() {
            this.isLoading = true;
            fetch('https://kotokawa-akira-mywife.site/web/api/collection/getCollectionByUid/' + this.user.id, { method: 'get', credentials: 'include' })
                .then(res => {
                    return res.json();
                }).then(data => {
                    this.collection = data;
                    this.isLoading = false;
                });
        },
        removeCollection(Name, videoid) {
            ElMessageBox.confirm('从收藏夹删除？', '提示', {
                confirmButtonText: "确定",
                cancelButtonText: '取消'
            }).then(() => {
                fetch('https://kotokawa-akira-mywife.site/web/api/collection/removeFromCollection', {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: this.user.id, name: Name, videoId: videoid }),
                    credentials: "include"
                }).then(res => {
                    return res.json();
                }).then(data => {
                    if (data.success == 'true')
                        ElMessage({
                            message: "成功移除收藏夹",
                            type: 'success'
                        });
                    this.getCollection();
                });
            }).catch(() => { });
        },
        rename(oldName) {
            ElMessageBox.prompt(null, "重命名收藏夹", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '收藏夹名',
                inputValue: oldName
            }).then(res => {
                if (res.value.includes(":")) {
                    ElMessageBox.alert("由于系统设计，不能输入 ':' 字符","错误",{
                        confirmButtonText:"确定",
                        type:"error"
                    });
                    return;
                }
                fetch('https://kotokawa-akira-mywife.site/web/api/collection/renameCollection', {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: this.user.id, name: oldName, newName: res.value }),
                    credentials: "include"
                }).then(res => {
                    return res.json();
                }).then(data => {
                    if (data.success == 'true') {
                        ElMessage({
                            message: "成功重命名",
                            type: 'success'
                        });
                        this.getCollection();
                    } else if (data.reason == "KeyExists") ElMessageBox.alert("收藏夹已存在!", "提示", {
                        confirmButtonText: "确定"
                    });
                });
            }).catch(() => { });
        },
        setVisible(item) {
            fetch('https://kotokawa-akira-mywife.site/web/api/collection/setVisible', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: this.user.id, name: item.name, visible: item.visible }),
                credentials: "include"
            }).then(res => {
                return res.json();
            })
        },
        currentChange(index, value) {
            this.currentPages[index] = value;
        },
        setBtnAvailable(value) {
            let name = document.querySelectorAll(".btn-name");
            name.forEach(el => {
                let span = el.querySelector(".collection-name");
                if (value) {
                    span.title = "点击更改收藏夹名称";
                } else {
                    span.title = "";
                    span.firstChild.style.cursor = "auto";
                    span.onclick = () => { };
                }
            });
        }
    },
    created() {
        this.getCollection();
    },
}
</script>
<style lang="css">
.btn-name {
    display: flex;
    justify-content: space-between;
    justify-items: center;
}

.visible-switch {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.visible-switch .el-switch {
    --el-switch-on-color: #9ac8e2;
}

.collection-mian {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    min-height: 700px;
}

.collections {
    width: 100%;
    border-bottom: 1px solid var(--line_regular);
    padding-top: 15px;
}

.collection-ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px;
    margin: 10px 0 10px 0;
    box-sizing: border-box;
    background-color: #fff;
}

.collection-li {
    box-sizing: border-box;
    width: 20%;
    padding: 10px;
}

.collection-li-inner {
    border-radius: 6px;

    /* height: 180px; */
    width: 100%;
    transition: all .3s ease;
}



.img-container {
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
    border-radius: 6px;
}

.img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
}

.options {
    width: 30%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    border-radius: 6px;
    border: 1px solid var(--line_regular);
    transition: all .3s ease;
}

.collections span {
    cursor: pointer;
}

.options:hover {
    border: 1px solid #f56c6c;
    color: #f56c6c;
}

.item-name {
    width: 100%;
    height: 50px !important;
    padding: 3px;
    box-sizing: border-box;
    text-align: left;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    word-wrap: break-word;
    height: 100%;
    font-size: 17px;
    cursor: pointer;
    transition: color .3s ease;
}

.empty {
    font-size: 35px;
    margin-top: 50px;
}

.item-name:hover {
    color: var(--ava)
}

.inner-options {
    padding: 5px 5px 5px 0;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pagination {
    padding: 10px 0 10px 0;
}

.el-pagination {
    justify-content: center;
}

@media screen and (max-width:550px) {
    .collection-li {
        width: 50%;
    }
}
</style>