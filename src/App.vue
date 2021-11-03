<template lang="pug">
#main
  .toolBar
    .toolLogo
      img(src="./assets/Logo@3x.svg" alt="Logo")
      span PROJECTUS
      button.searchBtn
        img(src="./assets/Search@3x.svg" alt="Search")
    ActiveUser(:userName="items.name" :userStatus="items.status" :userPhoto="items.photo")
    TasksStatus
    .toolMenu
      h1#menuCaption(onclick="setMenuContentVisible()") MENU
      .menuContent
        a.menuLink(href="#") Home
        a.menuLink(href="#") My Tasks
        .notificationConteiner
          a.menuLink(href="#") Notification
          #notificationCount {{notificationCount}}
  .contentBar
    header
      .headSection
        .titleBannersItem
          .titleLogo
            img(src="./assets/Shapes@2x.png" alt="Logo")
          span Website Redesign
          button.buttons.bannerBut ···
        TitleBanner
        - const dataRoute = {'Tasks': '/', 'Kanban': '/Kanban', 'Activity': '/Activity', 'Calendar': '/Calendar', 'Files': '/Files'}
      nav
        each path, name in dataRoute
          router-link.links.linkPassive(to=`${path}` active-class="linkActive")=`${name}`
    router-view(@sendIndex="notificationCount = $event")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ActiveUser from './components/ActiveUser.vue'
import TasksStatus from './components/TasksStatus.vue'
import TitleBanner from './components/TitleBanner.vue'
import { IApp, INotification } from './types/app.interfaces'

const dataApp: IApp = {
  name: 'Jane',
  status: 'Owner',
  photo: 'img/user_active.png'
}

const dataCount: INotification = {
  notificationCount: 0
}

export default defineComponent({
  name: 'App',
  components: {
    ActiveUser,
    TasksStatus,
    TitleBanner
  },
  data () {
    return {
      items: dataApp,
      notificationCount: dataCount.notificationCount
    }
  }
})
</script>

<style lang="scss">
$black: #000;
$white: #fff;
$d8: #d8d8d8;
$ea: #eaeaea;
$c13: #131313;
$interval: 0.3s;

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

header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 13.6rem;
  background-color: $white;
}

#main {
  display: flex;
  justify-content: center;
  background-color: $black;
}

nav {
  bottom: 0;
  padding-bottom: 1.4rem;
}
/* Classes */
.buttons {
  font-weight: bold;
  border-radius: 1.5rem;
  text-align: center;
  transition: $interval;
  border: none;
  cursor: pointer;
  padding: 0;
}

.bannerBut {
  background: $ea;
  color: $d8;
  font-size: 2rem;
  @include WH(3rem, 3rem);
  margin-left: 1.1rem;
  &:hover {
    background-color: $d8;
    color: #aaa;
  }
}

.buttonShare {
  background: $ea;
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
}

.contentBar {
  background-color: #eeebe5;
  @include WH(100%, 100%);
}

.headSection {
  display: flex;
  justify-content: space-between;
  padding-top: 3.5rem;
}

.links {
  font-size: 1.6rem;
  font-weight: bold;
  color: #131313;
  text-decoration: none;
  margin: 0 0.2rem 0 3rem;
  padding-bottom: 1.1rem;
}

.linkActive {
  border-bottom: 0.3rem solid #ffc200;
}

.linkPassive {
  font-size: 1.6rem;
  opacity: 0.7;
  transition: $interval;
  &:hover {
    opacity: 0.4;
  }
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
  color: $white;
  text-decoration: none;
  margin: 1.2rem 0;
}

.messageIcon {
  @include WH(4rem, 4rem);
}

.messageSection {
  @include flexible();
  flex-direction: row;
  padding: 0 3rem 3rem 3rem;
}

.messageText {
  font-size: 1.6rem;
  color: $c13;
  line-height: 2rem;
  padding: 0 12.5rem 0 2rem;
  margin: 0;
  width: 42rem;
  cursor: pointer;
  transition: $interval;
  &:hover {
    color: #808080;
  }
}

.messageTime {
  font-size: 1.4rem;
  color: $c13;
  text-align: right;
  opacity: 0.7;
  width: 7rem;
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

.messageOutpostImages {
  display: flex;
  flex-direction: row;
  margin: -1rem 0 3rem 9rem;
}

.notificationConteiner {
  @include flexible();
  flex-direction: row;
}

.outpostImages {
  @include WH(10rem, 10rem);
  padding-right: 1rem;
}

.pointerCursor {
  cursor: pointer;
}

.searchBtn {
  cursor: pointer;
  width: 1.6rem;
  height: 1.6rem;
  border: none;
  padding: 0;
  background-color: $black;
}

.titleLogo {
  background-color: orange;
  height: 4rem;
  margin: 0 1.5rem 0 3rem;
  border-radius: 0.5rem;
  img {
    @include WH(100%, 100%);
  }
}

.titleBannersItem {
  @include flexible();
  span {
    font-size: 4.3rem;
  }
}

.titleButtons {
  background-color: #444;
}

.todayCaption {
  font-size: 1.4rem;
  color: $c13;
  padding: 3.5rem 0 3rem 3rem;
  opacity: 0.5;
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

.userBut {
  color: $d8;
  font-size: 2.4rem;
  @include WH(3rem, 3rem);
  background-color: $black;
  &:hover {
    color: $white;
  }
}

.usersIcon {
  @include WH(3rem, 3rem);
  padding-left: 0.5rem;
}

.visibled {
  opacity: 0;
  visibility: hidden;
}

/* Id */
#userName {
  color: $white;
  font-size: 1.4rem;
  padding-bottom: 0.2rem;
}

#complitedCount,
#openCount {
  color: #fff;
  font-size: 1.4rem;
  padding-bottom: 0.2rem;
}

#complitedStatus,
#openStatus {
  color: $white;
  opacity: 0.5;
  font-size: 1.2rem;
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
  color: $c13;
  margin-left: 1rem;
  background-color: #ffc200;
  border-radius: 1rem;
  @include WH(1.9rem, 1.9rem);
}

#userStatus {
  color: #9b9b9b;
  font-size: 1.2rem;
}

#userPhoto {
  @include WH(4.8rem, 4.8rem);
}

//Responsive

@media screen and (max-width: 1200px) {
  .headSection {
    flex-direction: column;
    align-items: center;
  }
  header {
    height: 15rem;
  }
}

@media screen and (max-width: 992px) {
  main {
    flex-direction: column-reverse;
    align-items: center;
    width: 100%;
  }
  .contentBar {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .content {
    width: 90%;
  }
  .messageOutpost {
    width: 50%;
  }
  .outpostImages {
    width: 20%;
    height: 20%;
  }
}

@media screen and (max-width: 576px) {
  .content {
    height: 100%;
    padding-bottom: 0.5rem;
  }
}
</style>
