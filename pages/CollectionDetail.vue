<template>
  <div class="page">
    <CollectionLead 
      :description="collection.description"
      :curator="collection.curator"
      :link-text="collection.link.text"
      :link-url="collection.link.url"
      :name="collection.name"
    />
    <div class="dapp-wrapper">
      <DappCardList :dapps="collection.items"/>
    </div>
  </div>
</template>

<script>
import CollectionLead from '~/components/CollectionLead'
import DappCardList from '~/components/DappCardList'

export default {
  components: {
    CollectionLead,
    DappCardList
  },
  asyncData({ params, error, app }) {
    return app.$axios
      .get('collections/' + params.slug)
      .then(response => {
        const collection = response.data
        if (!Object.keys(collection).length > 0) {
          error({ statusCode: 404 })
        } else {
          return { collection }
        }
      })
      .catch(e => {
        error({ statusCode: 404 })
      })
  },
  head() {
    return {
      title: this.collection.name + ' — State of the DApps',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.collection.description
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.dapp-wrapper {
  @include margin-wrapper-main;
}
</style>
