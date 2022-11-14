<template>
    <div class="main">
        <section class="header">
            <div class="header-main">
                <div class="header-img-container">
                    <el-upload class="profile-upload" :before-upload="beforeProfileUpload" :show-file-list="false"
                        :disabled="!btnVisible" :on-success="profileUpload" accept=".png,.jpg,.jpeg"
                        :action="'https://kotokawa-akira-mywife.site/web/api/account/upLoadProfile/' + user.id">
                        <el-image fit="cover" draggable="false"
                            :src="'https://kotokawa-akira-mywife.site/web/api/account/getProfile/' + user.id" alt="">
                            <template #error>
                                <img src="https://kotokawa-akira-mywife.site/web/api/account/getProfile/000" alt="">
                            </template>
                        </el-image>
                    </el-upload>
                </div>
                <div class="header-info">
                    <div style="font-size:28px">{{ user.name }}</div>
                    <div style="font-size:14px">UID: {{ user.id }}</div>
                </div>
                <div v-if="btnVisible">
                    <div class="change-btn" @click="changeName">修改用户名</div>
                    <div class="change-btn" @click="changePassword">修改密码</div>
                </div>
            </div>
        </section>
        <section class="middle">
            <div class="menu">
                <div :class="{ 'menu-btn-active': btn_isActive_collection, 'menu-btn': true }" @click="collectionBtn">收藏
                </div>
                <div :class="{ 'menu-btn-active': btn_isActive_myupload, 'menu-btn': true }" @click="myUploadBtn">我的上传
                </div>
                <div :class="{ 'menu-btn-active': btn_isActive_upload, 'menu-btn': true }" @click="uploadBtn"
                    v-if="btnVisible">上传</div>
            </div>
            <div class="show-option">
                <transition name="into" appear mode="out-in">
                    <component :is="componentId" :user="user" :btnVisible="btnVisible"></component>
                </transition>
            </div>
        </section>
    </div>
</template>
<script>
import { ElUpload, ElMessageBox } from 'element-plus'
import CollectionView from './CollectionView.vue'
import UploadView from './UploadView.vue'
import MyUpload from './MyUpload.vue'
import getCookie from '../lib/getInCookie'
export default {
    props: ['user', 'profile', 'isLogin'],
    components: {
        ElUpload,
        CollectionView,
        UploadView,
        MyUpload,
    },
    data() {
        return {
            btn_isActive_collection: true,
            btn_isActive_upload: false,
            btn_isActive_myupload: false,
            componentId: "CollectionView",
            btnVisible: true,
        }
    },
    watch: {
        isLogin() {
            this.btnVisible = this.isLogin;
        }
    },
    methods: {
        beforeProfileUpload(rawFile) {
            if (!this.btnVisible) return;
            if (rawFile.type != 'image/jpeg' && rawFile.type != 'image/png') {
                ElMessageBox.alert('只能上传 <b style="color:var(--ava)">png、jpg</b> 格式的图片', '提示', { dangerouslyUseHTMLString: true, confirmButtonText: "确定" });
                return false;
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessageBox.alert('图片大小不能超过 <b style="color:var(--ava)">2MB</b> ', '提示', { dangerouslyUseHTMLString: true, confirmButtonText: "确定" });
                return false
            }
            return true
        },
        profileUpload() {
            // this.$parent.getProfile();
            window.location.reload();
        },
        collectionBtn() {
            this.btn_isActive_collection = true;
            this.btn_isActive_myupload = false;
            this.btn_isActive_upload = false;
            this.componentId = 'CollectionView';
        },
        uploadBtn() {
            this.btn_isActive_collection = false;
            this.btn_isActive_myupload = false;
            this.btn_isActive_upload = true;
            this.componentId = 'UploadView';
        },
        myUploadBtn() {
            this.btn_isActive_collection = false;
            this.btn_isActive_myupload = true;
            this.btn_isActive_upload = false;
            this.componentId = 'MyUpload';
        },
        getPathUid() {
            let sps = window.location.pathname.split("/");
            return sps[sps.length - 1];
        },
        isMaster() {
            let uid = getCookie("uid");
            let path_uid = this.getPathUid();
            if (uid == "" || path_uid == "") return false;
            return uid == path_uid;
        },
        changeName() {
            ElMessageBox.prompt("新用户名", "更改用户名", {
                confirmButtonText: "就是这个",
                cancelButtonText: "别了吧"
            }).then(res => {
                if (res.value == "" || res.value == null)
                    ElMessageBox.alert("新用户名不能为空", { cancelButtonText: "好的" });
                else
                    fetch('https://kotokawa-akira-mywife.site/web/api/account/change', {
                        method: 'post',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ uid: this.user.id, newName: res.value })
                    }).then(result => {
                        return result.json();
                    }).then(data => {
                        if (data.success == "true")
                            window.location.reload();
                        else ElMessageBox.alert("更改失败", { confirmButtonText: "怎么会这样" })
                    })
            }).catch(() => { })
        },
        changePassword() {
            ElMessageBox.prompt("旧密码", "验证", {
                confirmButtonText: "就是这个",
                cancelButtonText: "还是算了",
                inputType: "password"
            }).then(res => {
                if (res.value == "" || res.value == null)
                    ElMessageBox.alert("密码不能为空", { cancelButtonText: "好的" });
                else
                    ElMessageBox.prompt("新密码", "更新", {
                        confirmButtonText: "确定",
                        cancelButtonText: "算了",
                        inputType: "password"
                    }).then(resp => {
                        if (resp.value == "" || resp.value == null)
                            ElMessageBox.alert("密码不能为空", { cancelButtonText: "好的" });
                        else
                            fetch('https://kotokawa-akira-mywife.site/web/api/account/change', {
                                method: 'post',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ uid: "10063301", newPassword: resp.value, password: res.value })
                            }).then(result => {
                                return result.json();
                            }).then(data => {
                                if (data.success == "true")
                                    ElMessageBox.alert("密码已更改", { confirmButtonText: "很好" })
                                else if (data.reason == "PasswordIncorrect")
                                    ElMessageBox.alert("更改失败,原密码错误", { confirmButtonText: "确定" })
                                else ElMessageBox.alert("更改失败", { confirmButtonText: "出了什么问题" })
                            })
                    }).catch(() => { })
            }).catch(() => { })
        }
    },
    created() {
        this.btnVisible = this.isLogin;
    }
}
</script>
<style lang="css">
.into-enter-active,
.into-leave-active {
    transition: all .3s ease;
}

.into-enter-from {
    opacity: 0.0;
    transform: translate(0, 50px);
}

.into-enter-to {
    opacity: 1.0;
    transform: translate(0, 0);
}

.into-leave-to {
    opacity: 0.0;
    transform: translate(0, 0);
}

.into-leave-from {
    opacity: 1.0;
    transform: translate(0, 0);
}

.main {
    width: 80%;
    margin: 0 auto;
}

.header {
    width: 100%;
    aspect-ratio: 6/1;
    background-image: url('https://kotokawa-akira-mywife.site/web/image?filePath=%2Fimg%2FvideoStation%2Fbg2.png');
    background-repeat: no-repeat;
    background-position: left -450px;
    display: flex;
    align-items: flex-end;
}

.header-img-container {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    overflow: hidden;
}

.header-img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-upload {
    width: 100%;
    height: 100%;
}

.header-main {
    min-width: 200px;
    width: 500px;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.header-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 75%;
    color: #fff;
}

.header-info div:nth-child(1) {
    max-width: 300px;
}

.middle {
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 20px 0px 20px 0px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.menu {
    width: 15%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 10px 10px 10px 10px;
    user-select: none;
}

.menu-btn {
    margin: 5px 0 5px 0;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.0);
    font-size: 20px;
    cursor: pointer;
    transition: all .3s ease;
    padding: 5px 5px 5px 5px;
}

.menu-btn:hover {
    color: var(--ava);
    border: 1px solid var(--ava);
}

.menu-btn-active {
    color: var(--ava);
    border: 1px solid var(--ava);
}

.show-option {
    width: 85%;
    margin: 0 0 0 10px;
    box-sizing: border-box;
    background: #fff;
}

.el-upload {
    width: 100% !important;
    height: 100% !important;
}

.el-image {
    width: 100% !important;
    height: 100% !important;
}

.el-image__wrapper {
    width: 100% !important;
    height: 100% !important;
}

.change-btn {
    border-radius: 6px;
    border: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    cursor: pointer;
    transition: all .3s ease;
    user-select: none;
    padding: 0 5px 0 5px;
}

.change-btn:nth-child(1) {
    margin-bottom: 10px;
}

.change-btn:hover {
    color: var(--ava);
    border: 1px solid var(--ava);
    background-color: rgba(154, 200, 226, 0.2);
}

@media screen and (max-width:550px) {
    .main {
        width: 100%;
    }

    .middle {
        flex-direction: column;
        justify-content: flex-start;
    }

    .menu {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
    }

    .show-option {
        width: 100%;
        padding: 0;
    }

    .item-time {
        font-size: 14px !important;
    }

    .el-message-box {
        width: 80% !important
    }

    .header-info div:nth-child(1) {
        max-width: 150px;
    }
    .show-option{
        margin: 0;
        padding: 0 0 0 10px;
    }
}
</style>