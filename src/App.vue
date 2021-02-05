<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Presetation />
  </div>
</template>

<script>
import Presetation from './components/patterns/Presetation/Presetation'


export default {
  name: 'App',
  components: {
    Presetation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
