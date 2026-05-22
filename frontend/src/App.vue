<template>
  <div id="app">
    <router-view />
    <FloatingAgent />
  </div>
</template>

<script>
import FloatingAgent from './components/FloatingAgent.vue'

export default {
  name: 'App',
  components: { FloatingAgent },
  mounted() {
    const savedTheme = (() => { try { return localStorage.getItem('theme') } catch (e) { return null } })()
    const html = document.documentElement
    if (savedTheme === 'dark') {
      html.setAttribute('data-theme', 'Dark')
      html.classList.add('Dark')
    } else if (savedTheme === 'light') {
      html.removeAttribute('data-theme')
      html.classList.remove('Dark')
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans SC', sans-serif;
}

#app {
  min-height: 100vh;
}
</style>
