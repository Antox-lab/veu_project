<template lang="pug">
.toolBar
  .toolLogo
    img(src="../assets/Logo@3x.svg" alt="Logo")
    span PROJECTUS
    button.searchBtn
      img(src="../assets/Search@3x.svg" alt="Search")
  sidebar-active-user(:userName="items.name" :userStatus="items.status" :userPhoto="items.photo")
  sidebar-tasks-status
  .toolMenu
    h1#menuCaption MENU
    .menuContent
      a.menuLink(href="#") Home
      a.menuLink(href="#") My Tasks
      .notificationConteiner
        a.menuLink(href="#") Notification
        #notificationCount {{$store.state.sidebar.notificationCount}}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import SidebarActiveUser from './SidebarActiveUser.vue'
import SidebarTasksStatus from './SidebarTasksStatus.vue'
import { ILayout } from '../types/layout.interfaces'

export default defineComponent({
  name: 'TheSidebar',
  components: {
    SidebarActiveUser,
    SidebarTasksStatus
  },
  setup () {
    const store = useStore()
    const items = ref(store.state.sidebar.dataApp as ILayout)

    return {
      items
    }
  }
})
</script>

<style lang="scss">
$interval: 0.3s;

@mixin flexible() {
  display: flex;
  align-items: center;
}

.menuContent {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  transition: $interval + 0.2s;
  opacity: 1;
}

.menuLink {
  font-size: 1.4rem;
  color: #fff;
  text-decoration: none;
  margin: 1.2rem 0;
}

.notificationConteiner {
  @include flexible();
  flex-direction: row;
}

.searchBtn {
  cursor: pointer;
  width: 1.6rem;
  height: 1.6rem;
  border: none;
  padding: 0;
  background-color: #000;
}

#menuCaption {
  font-size: 1.2rem;
  cursor: pointer;
  color: #878787;
  transition: $interval;
  &:hover {
    color: #c0c0c0;
  }
}

#notificationCount {
  @include flexible();
  justify-content: center;
  font-size: 1.3rem;
  color: #131313;
  margin-left: 1rem;
  background-color: #ffc200;
  border-radius: 1rem;
  width: 1.9rem;
  height: 1.9rem;
}
</style>
