<template>
    <section class="options">
        <div class="type-container">
            <div class="options-li type">
                <div class="type-li type-video" ref="type_video" @click="searchVideo">视频</div>
                <div class="type-li type-user" ref="type_user" @click="searchUser">用户</div>
            </div>
            <div ref="indicator" class="indicator">
                <div ref="indicator_inner" class="indicator-inner"></div>
            </div>
        </div>

        <div class="options-li rank" v-show="rank_show">
            <div class="rank-li rank-play" :class="{'btn-active-color':isActive}" @click="rankPlay">
                ↑点击量
            </div>
            <div class="rank-li rank-time" :class="{'btn-active-color':!isActive}" @click="rankTime">
                ↑投稿时间
            </div>
        </div>
    </section>
</template>
<script>
import bus from '../bus/bus';
export default {
    data() {
        return {
            isActive: true,
            rank_show:true
        }
    },
    methods: {
        searchVideo() {
            this.rank_show = true;
            this.isActive = true;
            this.$refs.indicator_inner.style.left = this.$refs.type_video.offsetLeft - this.$refs.indicator.offsetLeft + 'px';
            bus.emit("typeChange","videos");
        },
        searchUser() {
            this.rank_show = false;
            this.$refs.indicator_inner.style.left = this.$refs.type_user.offsetLeft - this.$refs.indicator.offsetLeft + 'px';
            bus.emit("typeChange","user");
        },
        rankPlay(){
            this.isActive=true;
            bus.emit("rankChange","play");
        },
        rankTime(){
            this.isActive=false;
            bus.emit("rankChange","time");
        }
    },
}
</script>
<style lang="css">
.options {
    margin: 0 auto;
    width: 80%;
    padding: 40px 0 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 20px;
    white-space: nowrap;
    user-select: none;
}

.options-li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 80px;
}

.type-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.indicator {
    padding-top: 2px;
    height: 3px;
    width: 100%;
    position: relative;
}

.indicator-inner {
    position: absolute;
    left: 0;
    width: 40px;
    height: 100%;
    background-color: var(--ava);
    transition: all .3s ease;
}

.type-li {
    margin-right: 15px;
    transition: color .3s ease;
    cursor: pointer;
}

.type-li:hover {
    color: var(--ava)
}

.rank-li {
    margin-right: 15px;
    transition: color .3s ease;
    cursor: pointer;
}

.rank-li:hover {
    color: var(--ava);
}

.btn-active-color {
    color: var(--ava);
}

@media screen and (max-width:550px) {
    .options {
        font-size: 18px;
        width:auto;
    }
}
</style>