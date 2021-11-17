<template lang="pug">
.content.containerCol
  div.containerRow
    img(src="img/message.png")
    div
      p.caption 404:
      p.infoText Sorry, but view!{' '}
        span.pathText {{this.$route.path}}
        |  is not found!
      p.infoText This page coming in short time.
  p Go to!{' '}
    router-link.goLink(to="/")  Home
</template>

<style lang="scss" scoped>
$titleColor: #1c9acc;

@mixin textStyle($fontSize, $marginLeft) {
  font-size: $fontSize;
  font-weight: bold;
  margin: 0.3rem 0 0.3rem $marginLeft;
}

p {
   @include textStyle(1rem, 2rem);
   margin-top: 1rem;
}

.caption {
    @include textStyle(3rem, 2rem);
    color: $titleColor;
}

.containerCol {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.containerRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.goLink {
    @include textStyle(1rem, 0.1rem);
    color: $titleColor;
}

.infoText {
    @include textStyle(1.2rem, 2rem);
    color: #999;
}

.pathText {
    @include textStyle(1.2rem, 0.1rem);
    color: $titleColor;
}
</style>
