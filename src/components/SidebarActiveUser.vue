<template lang="pug">
.toolUser
    img#userPhoto(:src="userPhoto" alt="ActiveUser")
    .toolUserName
      h1#userName {{ userName }}
      h2#userStatus {{ userStatus }}
    button.buttons.userBut ···
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarActiveUser',
  props: {
    userName: String,
    userStatus: String,
    userPhoto: String
  }
})
</script>

<style lang="scss">
$white: #fff;

@mixin WH($width, $height) {
  width: $width;
  height: $height;
}

.userBut {
  color: #d8d8d8;
  font-size: 2.4rem;
  @include WH(3rem, 3rem);
  background-color: #000;
  &:hover {
    color: $white;
  }
}

#userName {
  color: $white;
  font-size: 1.4rem;
  padding-bottom: 0.2rem;
}

#userStatus {
  color: #9b9b9b;
  font-size: 1.2rem;
}

#userPhoto {
  @include WH(4.8rem, 4.8rem);
}
</style>
