<template lang="pug">
#main
  button.sidebarButton(@click="sidebarShow = !sidebarShow") {{sidebarButtonCaption}}
  the-sidebar(:class="{sidebarShow: sidebarShow}")
  .contentBar
    the-header
    router-view
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import TheSidebar from './components/TheSidebar.vue'
import TheHeader from './components/TheHeader.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    TheSidebar,
    TheHeader
  },
  setup () {
    const sidebarShow = ref(true)
    const sidebarButtonCaption = ref('▼')
    const store = useStore()

    const loadData = localStorage.getItem('data')
    if (loadData) {
      store.dispatch('getDataStorage')
    } else {
      store.dispatch('getData')
    }

    watch(() => sidebarShow.value, () => {
      sidebarShow.value ? sidebarButtonCaption.value = '▼' : sidebarButtonCaption.value = '▲'
    })

    return {
      sidebarShow,
      sidebarButtonCaption
    }
  }
})
</script>

<style lang="scss">
$black: #000;
$white: #fff;
$eee: #eeebe5;

@mixin flexible() {
  display: flex;
  align-items: center;
}

@mixin WH($width, $height) {
  width: $width;
  height: $height;
}

html {
  font-size: 10px;
  font-family: Helvetica;
}

h1,
h2 {
  margin: 0;
  padding: 0;
}

body {
  padding: 0;
  margin: 0;
  background: $black;
}

#main {
  display: flex;
  justify-content: center;
  background-color: $black;
}

/* Classes */
.buttons {
  font-weight: bold;
  border-radius: 1.5rem;
  text-align: center;
  transition: 0.3s;
  border: none;
  cursor: pointer;
  padding: 0;
}

.buttonShare {
  background: #eaeaea;
  color: $black;
  padding: 0.5rem 1.5rem;
  font-size: 1.9rem;
  margin: auto 1.5rem;
  &:hover {
    background: #f7f7f7;
  }
}

.buttonChat {
  background: #fff8dd;
  color: #ffc200;
  padding: 0.5rem 1.5rem;
  font-size: 1.9rem;
  margin: auto 3rem auto 0;
  &:hover {
    background: #f7f7f7;
  }
}

.content {
  margin: 3rem auto;
  @include WH(73rem, 59.1rem);
  background-color: $white;
  border-radius: 0.8rem;
  overflow-y: auto;
}

.contentBar {
  background-color: $eee;
  @include WH(100%, 100%);
}

.messageOutpost {
  @include flexible();
  padding: 2.6rem 3rem;
  margin: -1rem 0 3rem 9rem;
  font-size: 1.5rem;
  background-color: #f7f6f3;
  border-radius: 1rem;
  width: 46rem;
}

.messageSection {
  @include flexible();
  flex-direction: row;
  padding: 0 3rem 3rem 3rem;
}

.outpostImages {
  @include WH(10rem, 10rem);
  padding-right: 1rem;
}

.pointerCursor {
  cursor: pointer;
}

.sidebarButton {
  margin: 0;
  padding: 0.2rem;
  width: 100%;
  display: none;
  border: none;
  background-color: $eee;
  color: gray;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
  }
}

.toolBar {
  display: flex;
  flex-direction: column;
  background-color: $black;
  @include WH(30rem, 100%);
}

.toolLogo {
  @include flexible();
  height: 8.4rem;
  margin-left: 3rem;
  span {
    font-size: 1.6rem;
    color: $white;
    padding-left: 1.3rem;
    padding-right: 8rem;
    line-height: 2.4rem;
  }
}

.toolMenu {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-left: 3rem;
}

.toolUser {
  @include flexible();
  height: 8rem;
  margin-left: 3rem;
}

.toolInfo {
  @include flexible();
  flex-direction: row;
  height: 8rem;
  padding-left: 3rem;
}

.toolUserName {
  display: flex;
  flex-direction: column;
  margin-left: 1.3rem;
  width: 14rem;
}

.toolUserInfo {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.visibled {
  opacity: 0;
  visibility: hidden;
}

.sidebarShow {
  display: block;
}

//Responsive
@media screen and (max-width: 992px) {
  #main {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .contentBar {
    width: 100%;
  }
  .sidebarButton {
    display: inline-block;
  }
  .sidebarShow {
    display: none;
}
}

@media screen and (max-width: 768px) {
  .content {
    width: 90%;
    padding-bottom: 2em;
  }
  .messageOutpost {
    width: 50%;
  }
  .outpostImages {
    width: 15%;
    height: 15%;
  }
}

@media screen and (max-width: 576px) {
  .content {
    height: 100%;
  }
}
</style>
