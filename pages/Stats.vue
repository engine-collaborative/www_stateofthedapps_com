<template>
  <div class="page">
    <div class="hero-wrapper">
      <PageHeading :title="$t('TheStats.title')"/>
      <p class="description">{{ $t('TheStats.description') }}</p>
      <!-- <p class="button-wrapper">
        <nuxt-link to="/stats/request">
          <BaseButton :text="$t('TheStats.askUs')"/>
        </nuxt-link>
      </p> -->
      <TheStats
        :growth-data="growth"
        :stat-categories="stats.categories"
        :stat-dapp-contract-count="stats.dappContractCount"
        :stat-dapp-count="stats.dappCount"
        :stat-dapp-dau="stats.dappDau"
        :stat-dapp-usd-vol24-hr="stats.dappUSDVol24Hr"
        :stat-dapp-tx24-hr="stats.dappTx24Hr"
        :stat-platforms="stats.platforms"
        :stat-statuses="stats.statuses"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { openIntercom } from '@/helpers/mixins'
import BaseButton from '@/components/BaseButton'
import PageHeading from '@/components/PageHeading'
import TheStats from '@/components/TheStats'

export default {
  components: {
    BaseButton,
    PageHeading,
    TheStats
  },
  mixins: [openIntercom],
  data() {
    return {
      growth: [],
      stats: {}
    }
  },
  asyncData({ app, params, error }) {
    let statsDefault = app.$axios.get('stats')
    let statsGrowth = app.$axios.get('stats/growth', {
      params: {
        category: params.category,
        platform: params.platform
      }
    })
    return Promise.all([statsDefault, statsGrowth])
      .then(([resStatsDefault, resStatsGrowth]) => {
        return {
          stats: resStatsDefault.data,
          growth: resStatsGrowth.data
        }
      })
      .catch(e => {
        error({ statusCode: 404 })
      })
  },
  computed: {
    ...mapGetters(['statDappCount'])
  },
  head() {
    return {
      title: 'State of the DApps — DApp Statistics',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Total DApps, Daily Active Users, DApps by Category and more...'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding-bottom: 50px;
}

.button-wrapper {
  text-align: center;
}

.description {
  margin: 0.5rem auto 0 auto;
  text-align: center;
  max-width: 400px;
}

.hero-wrapper {
  @include margin-wrapper-main;
  padding: 0 0 2rem;
}
</style>
