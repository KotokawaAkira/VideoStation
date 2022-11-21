<template>
  <NavigateView></NavigateView>
  <OptionView></OptionView>
  <MainView></MainView>
</template>

<script>
import NavigateView from './components/NavigateView.vue';
import MainView from './components/MainView.vue';
import OptionView from './components/OptionView.vue';
export default {
  name: 'App',
  components: {
    NavigateView,
    MainView,
    OptionView
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

a {
  color: unset;
  text-decoration: none;
}
</style>
