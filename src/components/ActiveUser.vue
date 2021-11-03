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
  name: 'ActiveUser',
  props: {
    userName: String,
    userStatus: String,
    userPhoto: String
  }
})
</script>
