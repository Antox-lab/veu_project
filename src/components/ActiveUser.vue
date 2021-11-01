<template>
  <div class="toolUser">
    <img id="userPhoto" :src=userPhoto alt="ActiveUser" />
    <div class="toolUserName">
      <h1 id="userName">{{ userName }}</h1>
      <h2 id="userStatus">{{ userStatus }}</h2>
    </div>
    <button class="buttons userBut">···</button>
  </div>
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
