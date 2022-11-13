<template>
  <NavigateView></NavigateView>
  <MainView :isLogin="isLogin" :user="user" :collection="collection"></MainView>
</template>

<script>
import NavigateView from './components/NavigateView.vue'
import MainView from './components/MainView.vue'
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
      collection: []
    }
  },
  watch: {
    isLogin(newValue) {
      if (newValue)
        this.getCollection();
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
              });
        });
    }
  },
  created() {
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
  -webkit-tap-highlight-color: transparent;
}

img {
  display: block;
}

a {
  color: unset;
  text-decoration: none;
}
</style>
