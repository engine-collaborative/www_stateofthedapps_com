<template>
  <div class="DappDetailBodyContentDescription">
    <div
      class="description"
      v-html="$md.render(description)"/>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.DappDetailBodyContentDescription .description {
  ol,
  ol li {
    list-style-type: decimal;
  }
  ul,
  ul li {
    list-style-type: disc;
  }
  ul {
    padding-left: 1em;
    padding-bottom: 1rem;
  }
  ul li {
    margin-left: 1em;
  }
  p {
    margin: 0;
    margin-bottom: 1rem;
  }
  strong {
    font-weight: 700;
  }
  pre {
    white-space: pre-wrap;
  }
}
</style>

<style lang="scss" scoped>
.description {
  word-break: break-word;
  text-align: left;
  padding: 20px 10px 5px 10px;
  font-size: 1.2rem;
  line-height: 1.4;
  margin-top: 0;
  @include tweakpoint('min-width', 1000px) {
    padding: 0 10px 5px 10px;
  }
}
</style>
