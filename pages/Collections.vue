<template>
  <div class="page">
    <div class="hero-wrapper">
      <h1 class="title-1">Curated Collections</h1>
      <p class="description">Explore our handpicked groupings of the best DApps on the market.</p>
    </div>
    <CollectionList/>
  </div>
</template>

<script>
import CollectionList from '~/components/CollectionList'

export default {
  components: {
    CollectionList
  }
}
</script>

<style lang="scss" scoped>
.description {
  margin-top: 0.5rem;
  text-align: center;
}

.hero-wrapper {
  @include margin-wrapper-main;
  padding: 3rem 0 2rem;
}

.title-1 {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}
</style>
