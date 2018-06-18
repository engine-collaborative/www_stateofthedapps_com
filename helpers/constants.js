const dappCategoryTagsMap = Object.freeze({
  'energy': ['energy', 'solar', 'green'],
  'exchanges': ['exchange', 'exchanges', 'market', 'markets', 'marketplace'],
  'finance': ['audit', 'crowdfund', 'crowdfunding', 'crowdsourcing', 'derivative', 'finance', 'finances', 'money'],
  'gambling': ['casino', 'gamble', 'gambling', 'lottery', 'dice'],
  'games': ['boardgame', 'game', 'games', 'collectible', 'collectibles', 'video-games'],
  'health': ['health', 'medical', 'healthcare', 'fitness'],
  'insurance': ['insurance', 'claims'],
  'media': ['music', 'music-platform', 'video', 'photography', 'media', 'art'],
  'organizations': ['legal', 'dao', 'organization', 'management'],
  'relationships': ['marriage', 'nsfw', 'relationship', 'sexuality'],
  'supply-chain': ['provenance', 'supply', 'supply-chain'],
  'voting': ['vote', 'voting', 'poll', 'election']
})

const dappGameTag = 'game'

const dappListDefaultLimit = 50

const dappListDefaultSort = 'rank'

const dappListDefaultOrder = 'asc'

const dappPromotedSlots = 3

const dappSchema = Object.freeze({
  authors: [],
  badges: [],
  contracts: [],
  created: '',
  description: '',
  isNew: false,
  isNsfw: false,
  lastUpdated: '',
  license: '',
  logoUrl: '',
  name: '',
  nofollow: false,
  productImage: '',
  relatedDapps: [],
  sites: {
    websiteUrl: '',
    dappUrl: ''
  },
  slug: '',
  socials: [],
  sparklines: {
    transactions: [],
    users: []
  },
  stats: {
    'ctr': 0,
    'positive': 0,
    'negative': 0,
    'neutral': 0,
    'impressions': 0,
    'clicks': 0,
    'dau': 0,
    'mau': 0,
    'tx_1d': 0,
    'tx_30d': 0,
    'tx_7d': 0,
    'wau': 0,
    'qau': 0,
    'tx_90d': 0,
    'flagged': 0,
    'shared': 0,
    'suggested': 0,
    'contract_created': ''
  },
  status: '',
  tags: [],
  teaser: ''
})

const dappBadgeMap = Object.freeze({
  '0x': {
    component: 'SvgBadge0x',
    description: '0x protocol compatible'
  },
  'complete': {
    component: 'SvgBadgeComplete',
    description: 'Has a complete profile'
  },
  'consensys': {
    component: 'SvgBadgeConsensys',
    description: 'Part of <a href="https://new.consensys.net/" target="_blank">Consensys</a>'
  },
  'featured': {
    component: 'SvgBadgeFeatured',
    description: 'Currently featured'
  },
  'hot': {
    component: 'SvgBadgeHot',
    description: 'Currently hot'
  },
  'metamask': {
    component: 'SvgBadgeMetamask',
    description: 'Works with <a href="https://www.metamask.io" target="_blank">Metamask</a>'
  },
  'solidified': {
    component: 'SvgBadgeSolidified',
    description: 'Audited by <a href="https://solidified.io/" target="_blank">Solidified</a>'
  },
  'status-im': {
    component: 'SvgBadgeStatus',
    description: 'On <a href="https://status.im/" target="_blank">Status.im</a>'
  },
  'token': {
    component: 'SvgBadgeToken',
    description: 'Has a token'
  }
})

const dappSocialComponentMap = Object.freeze({
  'chat': 'SvgSocialChat',
  'blog': 'SvgSocialBlog',
  'facebook': 'SvgSocialFacebook',
  'github': 'SvgSocialGithub',
  'gitter': 'SvgSocialGitter',
  'reddit': 'SvgSocialReddit',
  'twitter': 'SvgSocialTwitter'
})

const dappStatuses = Object.freeze([
  'live',
  'beta',
  'prototype',
  'wip',
  'concept',
  'stealth',
  'abandoned'
])

const dappRefineStatusOptions = dappStatuses.slice()
dappRefineStatusOptions.unshift('any')

const dappRefineTabOptions = Object.freeze([
  'hot',
  'new',
  'most-viewed',
  'most-relevant'
])

const daysOfTheWeek = Object.freeze([
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
])

const eventCategories = Object.freeze([
  'conference',
  'crowdsale',
  'hackathon',
  'ico',
  'meetup',
  'release',
  'summit',
  'workshop'
])

const eventRefineCategoryOptions = eventCategories.slice()
eventRefineCategoryOptions.unshift('all')

const feedbackComponentMap = Object.freeze({
  'negative': 'SvgFeedbackNegative',
  'neutral': 'SvgFeedbackNeutral',
  'positive': 'SvgFeedbackPositive'
})

export {
  dappCategoryTagsMap,
  dappBadgeMap,
  dappGameTag,
  dappListDefaultLimit,
  dappListDefaultSort,
  dappListDefaultOrder,
  dappPromotedSlots,
  dappRefineStatusOptions,
  dappRefineTabOptions,
  dappSchema,
  dappSocialComponentMap,
  dappStatuses,
  daysOfTheWeek,
  eventCategories,
  eventRefineCategoryOptions,
  feedbackComponentMap
}
