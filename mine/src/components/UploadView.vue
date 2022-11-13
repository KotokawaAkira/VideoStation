<template>
    <div class="upload-show">
        <div class="title">上传</div>
        <div class="upload-main">
            <div class="upload-main-body">
                <div class="upload-body-left">
                    <div class="container" @click="selectImgFile">
                        <img ref="upload_img" draggable="false" src="" alt="" v-show="isShowImg">
                        <div v-show="!isShowImg">点击选择封面</div>
                    </div>
                    <div class="container" @click="selectVideoFile">
                        <div ref="video_name" class="video_name">点击选择视频</div>
                    </div>
                </div>
                <div class="upload-info">
                    <input class="uload-input" type="text" placeholder="视频标题" v-model="title_text">
                    <textarea placeholder="视频简介" class="summary" v-model="summary_text"></textarea>
                </div>
            </div>
            <div class="submit">
                <div class="upload-btn" @click="clear">清空</div>
                <div class="upload-btn" @click="submit">提交</div>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" title="上传" width="350px" :before-close="handleClose">
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
import { ElMessageBox, ElDialog, ElButton, ElNotification } from 'element-plus';
export default {
    props: ['user'],
    components: {
        ElDialog, ElButton
    },
    data() {
        return {
            img_file: document.createElement("input"),
            video_file: document.createElement("input"),
            title_text: '',
            img: "",
            video: "",
            summary_text: '',
            isShowImg: false,
            btnAvailable: false,
            dialogVisible: false,
            progress: 0,
            loader: {},
            upload_id: ''
        }
    },
    watch: {
        video(value) {
            if (value == "") {
                this.$refs.video_name.title = "";
                this.$refs.video_name.innerText = "点击选择视频";
            } else {
                this.$refs.video_name.title = value.name;
                this.$refs.video_name.innerText = value.name;
            }
            if (this.title_text != "" && this.img != "" && this.video != "" && this.summary_text != "")
                this.btnAvailable = true;
            else this.btnAvailable = false;
        },
        img(value) {
            if (value == "") {
                this.isShowImg = false;
            } else {
                let url = URL.createObjectURL(this.img_file.files[0]);
                this.$refs.upload_img.src = url;
                this.isShowImg = true;
            }
            if (this.title_text != "" && this.img != "" && this.video != "" && this.summary_text != "")
                this.btnAvailable = true;
            else this.btnAvailable = false;
        },
        title_text() {
            if (this.title_text != "" && this.img != "" && this.video != "" && this.summary_text != "")
                this.btnAvailable = true;
            else this.btnAvailable = false;
        },
        summary_text() {
            if (this.title_text != "" && this.img != "" && this.video != "" && this.summary_text != "")
                this.btnAvailable = true;
            else this.btnAvailable = false;
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
                this.dialogVisible = false;
                this.progress = 0;
                this.loader.abort();
                this.deleteVideo(this.upload_id);
            }).catch(() => { });
        },
        initFiles() {
            this.img_file.accept = ".png , .jpg , .jpeg";
            this.img_file.type = "file";
            this.video_file.type = "file";
            this.video_file.accept = ".mp4 , .ogg";
        },
        selectImgFile() {
            this.img_file.click();
        },
        selectVideoFile() {
            this.video_file.click();
        },
        clear() {
            this.title_text = "";
            this.summary_text = "";
            this.video = "";
            this.img = "";
        },
        uploadImg(id) {
            const xhr = new XMLHttpRequest();
            xhr.open('post', 'https://kotokawa-akira-mywife.site/web/api/video/uploadVideoImg/' + id);
            const data = new FormData();
            data.append("videoImg", this.img);
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState == xhr.DONE && xhr.status == 200) {
                    this.uploadVideo(id);
                }
            })
            xhr.send(data);
        },
        uploadVideo(id) {
            this.dialogVisible = true;
            const xhr = new XMLHttpRequest();
            this.loader = xhr;
            xhr.open('post', 'https://kotokawa-akira-mywife.site/web/api/video/uploadVideo/' + id);
            const data = new FormData();
            data.append("video", this.video);
            xhr.upload.addEventListener("progress", (e) => {
                let num = e.loaded * 100 / e.total;
                this.progress = num.toFixed(2);
            });
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState == xhr.DONE && xhr.status == 200) {
                    this.upload_id = "";
                    ElNotification({
                        title: "上传完毕",
                        message: '<b style="color:var(--ava)">' + this.title_text + "</b>" + "  上传完毕",
                        duration: 0,
                        dangerouslyUseHTMLString: true
                    });
                    this.dialogVisible = false;
                    this.clear();
                }
            });
            xhr.send(data);
        },
        beforeImgUpload(rawFile) {
            if (rawFile.type != 'image/jpeg' && rawFile.type != 'image/png') {
                ElMessageBox.alert('只能上传 <b style="color:var(--ava)">jpg、png</b> 格式的图片', '提示', { dangerouslyUseHTMLString: true, confirmButtonText: "确定" });
                return false;
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessageBox.alert('图片大小不能超过 <b style="color:var(--ava)">2MB</b> ', '提示', { dangerouslyUseHTMLString: true, confirmButtonText: "确定" });
                return false
            }
            return true
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
            }).then(() => {
                this.upload_id = "";
            });
        },
        submit() {
            if (this.btnAvailable) {
                this.btnAvailable = false;
                fetch('https://kotokawa-akira-mywife.site/web/api/video/addVideo', {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ title: this.title_text, summary: this.summary_text, up: this.user.id }),
                    credentials: "include"
                }).then(res => {
                    return res.json();
                }).then(data => {
                    if (data.success == "true") {
                        this.upload_id = data.id;
                        this.uploadImg(data.id);
                    }
                    else if (data.reason == "WordsForbidden") {
                        ElMessageBox.alert("标题或简介包含敏感词汇！", "提示", { confirmButtonText: '确定' });
                    }
                })
            } else ElMessageBox.alert("请填写信息！", "提示", { confirmButtonText: '确定' });

        }
    },
    created() {
        this.initFiles();
    },
    mounted() {
        this.img_file.addEventListener("change", () => {
            if (this.img_file.files.length == 0) {
                //this.selectImgFile = false;
                //this.img = "";
            }
            else {
                let can = this.beforeImgUpload(this.img_file.files[0])
                if (can)
                    this.img = this.img_file.files[0];
            }
        });
        this.video_file.addEventListener("change", () => {
            if (this.video_file.files.length == 0) {
                //this.video = "";
            }
            else {
                let can = this.beforeVideoUpload(this.video_file.files[0]);
                if (can)
                    this.video = this.video_file.files[0];
            }
        });
    }
}
</script>
<style lang="css">
.upload-main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.upload-show {
    background-color: #fff;
    padding: 10px;
}

.upload-main-body {
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
}

.uload-input {
    outline: none;
    border: 1px solid var(--line_regular);
    padding: 10px;
    font-size: 22px;
    height: 30px;
    border-radius: 6px;
    transition: all .3s ease;
    width: 300px;
    margin-bottom: 30px;
}

.uload-input:focus {
    border: 1px solid var(--ava);
}

.container {
    width: 200px;
    aspect-ratio: 16/9;
    border-radius: 6px;
    border: 1px dashed var(--line_regular);
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .3s ease;
}

.container:nth-child(1) {
    margin-bottom: 30px;
}

.container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.summary {
    outline: none;
    border: 1px solid var(--line_regular);
    height: 200px;
    width: 300px;
    max-height: 300px;
    padding: 10px;
    font-size: 18px;
    border-radius: 6px;
    border: 1px solid var(--line_regular);
    resize: none;
    transition: all .3s ease;
}

.summary:focus {
    border: 1px solid var(--ava);
}

.upload-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.container:hover {
    border: 1px dashed var(--ava);
}

.video_name {
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    word-wrap: break-word;
}

.submit {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    padding: 15px 5px 15px 5px;
}

.upload-btn {
    border-radius: 6px;
    border: 1px solid var(--line_regular);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 50px;
    cursor: pointer;
    padding: 5px;
    transition: all .3s ease;
}

.upload-btn:nth-child(1) {
    margin-right: 20px;
}

.upload-btn:hover {
    color: var(--ava);
    border: 1px solid var(--ava);

}

.el-dialog {
    margin: 0 !important;
    position: absolute;
    height: 250px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.el-dialog__body {
    padding: 10px 20px 30px 20px !important;
}

.progress-outer {
    width: 100%;
    height: 20px;
}

.progress-inner {
    width: 0%;
    height: 100%;
    background-color: var(--ava);
    border: 1px solid var(--line_regular);
}

@media screen and (max-width:550px) {
    .uload-input {
        width: 150px !important;
    }

    .summary {
        width: 150px !important;
    }

    .upload-main {
        width: 100%;
    }

    .container {
        width: 150px;
    }

    .upload-body-left {
        margin-right: 20px;
        margin-left: 20px;
    }

    .upload-main-body {
        width: 100%;
    }
}
</style>