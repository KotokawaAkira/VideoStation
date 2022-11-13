<template>
  <NavigateView :isLogin="isLogin" :user="user"></NavigateView>
  <div class="main-recommend-title">推荐</div>
  <MainView></MainView>

</template>

<script>
import MainView from './components/MainView.vue';
import NavigateView from './components/NavigateView.vue';

export default {
  name: 'App',
  components: {
    MainView,
    NavigateView,
    
  },
  data() {
    return {
      user:{name:"Kirara",uid:10063301},
      token: "",
      isLogin: true,
    }
  },
  methods: {
    getIsLogin() {
      fetch("http://127.0.0.1:9774/web/api/account/getLoginInfo", {
        method: 'get',
        credentials: "include"
      }).then(res => {
        return res.json();
      }).then(data => {
        if (data.success) {
          this.uid = Number.parseInt(data.uid);
          this.isLogin = true;
        }
      });
    }
  },
  created() {
    //this.getIsLogin();
  },

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
a{
  color:unset;
  text-decoration: none;
}
.main-recommend-title {
    text-align: left;
    font-size: 40px;
    padding: 20px 15px 0px 15px;
    width: 80%;
    margin: 0 auto;
}
</style>
