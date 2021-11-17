<template lang="pug">
header
  .headSection
    .titleBannersItem
      .titleLogo
        img(src="../assets/Shapes@2x.png" alt="Logo")
      span Website Redesign
      button.buttons.bannerBut ···
    header-titlebanner
    - const dataRoute = {'Tasks': '/Tasks', 'Kanban': '/Kanban', 'Activity': '/Activity', 'Calendar': '/Calendar', 'Files': '/Files'}
  nav
    each path, name in dataRoute
      router-link.links.linkPassive(to=`${path}` active-class="linkActive")=`${name}`
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderTitlebanner from '../components/HeaderTitlebanner.vue'

export default defineComponent({
  name: 'TheHeader',
  components: {
    HeaderTitlebanner
  }
})
</script>

<style lang="scss">
$d8: #d8d8d8;

@mixin WH($width, $height) {
  width: $width;
  height: $height;
}

nav {
  bottom: 0;
  padding-bottom: 1.4rem;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 13.6rem;
  background-color: #fff;
}

.bannerBut {
  background: #eaeaea;
  color: $d8;
  font-size: 2rem;
  @include WH(3rem, 3rem);
  margin-left: 1.1rem;
  &:hover {
    background-color: $d8;
    color: #aaa;
  }
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
  transition: 0.3s;
  &:hover {
    opacity: 0.4;
  }
}

.titleBannersItem {
  display: flex;
  align-items: center;
  span {
    font-size: 4.3rem;
  }
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

@media screen and (max-width: 1200px) {
  .headSection {
    flex-direction: column;
    align-items: center;
  }
  header {
    height: 15rem;
  }
}
</style>
