<template>
  <div class="RankingTableValuePct">
    <span
      v-if="value === null"
      class="value">-</span>
    <span
      v-else
      class="value">{{ Number(value || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }}</span>
    <span
      v-if="value_pct === null"
      class="pct">-</span>
    <span
      v-else
      :class="getValuePosNegClass(value_pct)"
      class="pct"><span v-if="value_pct > 0">+</span>{{ Number(value_pct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%</span>
  </div>
</template>

<script>
import { getValuePosNegClass } from '~/helpers/mixins'

export default {
  mixins: [getValuePosNegClass],
  props: {
    value: {
      type: Number,
      default: null
    },
    value_pct: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.RankingTableValuePct {
  display: flex;
  flex-direction: column;
  @include font-text-mono;
}

.pct {
  font-size: 0.9rem;
  &.is-positive {
    color: $color--positive;
  }
  &.is-negative {
    color: $color--negative;
  }
}

.value {
  font-size: 0.9rem;
}
</style>
