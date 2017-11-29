import generateRandomSeed from '~/helpers/functions'
import { browseCategoryOptions } from '~/helpers/constants'
import { browseRefineOptions } from '~/helpers/constants'
import axios from '~/helpers/axios'

const randomSeed = generateRandomSeed()

function initialQuery () {
  return {
    category: browseCategoryOptions[0],
    limit: 50,
    offset: 0,
    refine: browseRefineOptions[0],
    seed: randomSeed,
    tags: [],
    text: ''
  }
}

const actions = {
  fetchItems: ({ commit, state }) => {
    commit('UPDATE_LOADING_STATUS', true)
    axios
      .get('dapps', {
        params: state.query
      })
      .then(response => {
        commit('SET_ITEMS', response)
        commit('UPDATE_LOADING_STATUS', false)
      })
  },
  incrementOffsetQuery: ({ commit }) => {
    commit('INCREMENT_OFFSET_QUERY')
  },
  setCategoryQuery: ({ commit }, value) => {
    commit('SET_CATEGORY_QUERY', value)
  },
  setRefineQuery: ({ commit }, value) => {
    commit('SET_REFINE_QUERY', value)
  },
  addTagToQuery: ({ commit }, value) => {
    commit('ADD_TAG_TO_QUERY', value)
  },
  removeLastTagFromQuery: ({ commit }) => {
    commit('REMOVE_LAST_TAG_FROM_QUERY')
  },
  removeTagsQuery: ({ commit }, index) => {
    commit('REMOVE_TAG_FROM_QUERY', index)
  },
  resetQuery ({ commit }) {
    commit('RESET_QUERY')
  },
  setTextQuery: ({ commit }, value) => {
    commit('SET_TEXT_QUERY', value)
  },
  setActiveItemIndex: ({ commit }, index) => {
    commit('SET_ACTIVE_ITEM_INDEX', index)
  },
  setFriendlyQuery: ({ commit }, params) => {
    commit('SET_FRIENDLY_QUERY', params)
  },
  setFriendlyUrl: ({ commit }) => {
    commit('SET_FRIENDLY_URL')
  }
  toggleBrowseDropdown: ({ commit }, type) => {
    commit('TOGGLE_BROWSE_DROPDOWN', type)
  }
}

const getters = {
  activeItemIndex: state => {
    return state.activeItemIndex
  },
  categoryDropdownIsActive: state => {
    return state.browse.category.isActive
  },
  categoryQuery: state => {
    return state.query.category
  },
  friendlyUrl: state => {
    return state.friendlyUrl
  },
  items: state => {
    return state.items
  },
  itemsCount: state => {
    return state.items.length
  },
  limitQuery: state => {
    return state.query.limit
  },
  loading: state => {
    return state.loading
  },
  categoryDropdownIsActive: state => {
    return state.browse.refine.isActive
  },
  refineQuery: state => {
    return state.query.refine
  },
  paginationOffset: state => {
    return state.pagination.offset
  },
  paginationTotalCount: state => {
    return state.pagination.totalCount
  },
  tagsQuery: state => {
    return state.query.tags
  },
  textQuery: state => {
    return state.query.text
  }
}

const mutations = {
  SET_ITEMS (state, response) {
    state.pagination.totalCount = Number(response.headers['x-pagination-count'])
    state.pagination.offset = Number(response.headers['x-pagination-offset'])
    if (state.pagination.offset === 0) {
      state.items = response.data
    } else {
      let items = state.items.concat(response.data)
      state.items = items
    }
    state.query.offset = 0
  },
  TOGGLE_BROWSE_DROPDOWN (state, type) {
    state.browse[type].isActive = !state.browse[type].isActive
  }
  INCREMENT_OFFSET_QUERY (state) {
    state.query.offset = state.pagination.offset + state.query.limit
  },
  SET_CATEGORY_QUERY (state, value) {
    var options = browseCategoryOptions || []
    if (options.indexOf(value) !== -1) {
      state.query.category = value
    } else {
      state.query.category = options[0]
    }
  },
  SET_REFINE_QUERY (state, value) {
    state.query.refine = value
  },
  ADD_TAG_TO_QUERY (state, value) {
    state.query.tags.push(value)
  },
  REMOVE_LAST_TAG_FROM_QUERY (state) {
    state.query.tags.pop()
  },
  REMOVE_TAG_FROM_QUERY (state, index) {
    state.query.tags.splice(index, 1)
  },
  RESET_QUERY (state) {
    state.query = initialQuery()
  },
  SET_ACTIVE_ITEM_INDEX (state, index) {
    state.activeItemIndex = index
  },
  SET_FRIENDLY_QUERY (state, params) {
    var tags = params.tags
    var category = params.category
    if (tags !== undefined) {
      tags = tags.split('+').slice(0, 3).map(decodeURIComponent)
      state.query.tags = tags
    }
    if (category !== undefined) {
      state.query.category = category
    }
  },
  SET_FRIENDLY_URL (state) {
    var browseCategoryOptions = browseCategoryOptions || []
    var tags = state.query.tags.filter(entry => entry.trim() !== '') || []
    var category = state.query.category
    var url = '/'
    if (tags.length > 0) {
      tags = tags.map(encodeURIComponent)
      tags = tags.join('+')
      url = url + 'tagged/' + tags + '/'
    }
    if (category !== browseCategoryOptions[0] && category !== 'most-relevant') {
      url = url + 'tab/' + encodeURIComponent(category)
    }
    state.friendlyUrl = url
    window.history.replaceState({}, '', url)
  },
  SET_TEXT_QUERY (state, value) {
    state.query.text = value
  },
  UPDATE_LOADING_STATUS (state, value) {
    state.loading = value
  }
}

const state = {
  activeItemIndex: -1,
  browse: {
    category: {
      isActive: false
    },
    refine: {
      isActive: false
    }
  }
  friendlyUrl: '/',
  items: [],
  loading: true,
  pagination: {
    offset: 0,
    totalCount: 0
  },
  query: query()
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
