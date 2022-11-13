<template>
  <NavigateView></NavigateView>
  <MainView :user="user" :profile="profile" :isLogin="isLogin"></MainView>
</template>

<script>
import NavigateView from './components/NavigateView.vue'
import MainView from './components/MainView.vue'
import { ajax } from './lib/ajax.js'
export default {
  name: 'App',
  components: {
    NavigateView,
    MainView
  },
  data() {
    return {
      isLogin: false,
      user: {},
      collection: [],
      profile: 'https://kotokawa-akira-mywife.site/web/api/account/getProfile/000',
      mine: {}
    }
  },
  watch: {
    isLogin(newValue) {
      if (newValue) {
        this.getCollection();
        this.getProfile();
      }
    }
  },
  methods: {
    getCollection() {
      fetch('https://kotokawa-akira-mywife.site/web/api/collection/getCollectionByUid/' + this.user.id, { method: 'get' })
        .then(res => {
          return res.json();
        }).then(data => {
          this.collection = data;
        });
    },
    getProfile() {
      ajax({
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
    getPathUid() {
      let sps = window.location.pathname.split("/");
      return sps[sps.length - 1];
    },
    getAccount(id) {
      fetch('https://kotokawa-akira-mywife.site/web/api/account/selectOneById/' + id, { method: "get" })
        .then(res => {
          return res.json();
        }).then(data => {
          this.user = data;
          this.getProfile();
          document.title = this.user.name + "的主页";
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
                this.mine = data;
                let path_uid = this.getPathUid();
                if (path_uid == data.id)
                  this.isLogin = true;
              });
        });
    }
  },
  created() {
    this.user['id'] = this.getPathUid();
    this.getAccount(this.getPathUid());
    this.getLoginInfo();
  }
}
</script>

<style>
:root {
  --ava: #9AC8E2;
  --line_regular: #E3E5E7;
  --bg_regular: #F1F2F3;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;
  background-color: var(--bg_regular);
  -webkit-tap-highlight-color: transparent;
}

img {
  display: block;
}

a {
  color: unset;
  text-decoration: none;
}

.title {
  font-size: 30px;
  padding: 20px 0 20px 0;
  font-weight: 600;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}
</style>
