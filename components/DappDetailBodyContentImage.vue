<template>
  <div class="DappDetailBodyContentImage">
    <div class="wrapper">
      <img 
        :src="productImage"
        :alt="title"
        class="image">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productImage: {
      type: String,
      required: true,
      default: ''
    },
    title: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  max-width: 100%;
  display: block;
  max-height: 630px;
  @include tweakpoint('min-width', 1000px) {
    border-radius: 4px;
  }
}

.wrapper {
  @include tweakpoint('min-width', 1000px) {
    margin: 0 10px;
    padding: 0 0 25px 0;
  }
}
</style>
