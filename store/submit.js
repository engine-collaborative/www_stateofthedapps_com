import axios from '~/plugins/axios'

function initialState () {
  return {
    errorFields: [
      'author',
      'description',
      'email',
      'license',
      'name',
      'status',
      'tags',
      'teaser',
      'acceptedTerms',
      'website'
    ],
    errors: {
      additionalAuthors: [],
      author: [],
      dappUrl: [],
      description: [],
      email: [],
      kovan: [],
      license: [],
      logo: [],
      mainnet: [],
      name: [],
      rinkeby: [],
      ropsten: [],
      tags: [],
      teaser: [],
      acceptedTerms: [],
      website: []
    },
    fields: {
      additionalAuthors: '',
      author: '',
      dappUrl: '',
      description: '',
      contracts: {
        mainnet: { address: '' },
        ropsten: { address: '' },
        kovan: { address: '' },
        rinkeby: { address: '' }
      },
      email: '',
      joinSlack: true,
      license: '',
      logo: '',
      name: '',
      social: {
        facebook: { url: '' },
        twitter: { url: '' },
        github: { url: '' },
        reddit: { url: '' },
        slack: { url: '' },
        blog: { url: '' },
        other: { url: '' },
        wiki: { url: '' }
      },
      status: '',
      subscribeNewsletter: true,
      tags: [],
      teaser: '',
      acceptedTerms: false,
      website: ''
    },
    tagsQuery: '',
    tagsResults: [],
    warnings: {
      teaser: []
    }
  }
}

export const state = () => {
  return initialState()
}

export const mutations = {
  addErrorField (state, field) {
    const index = state.errorFields.indexOf(field)
    if (index > -1) {
      state.errorFields.splice(index, 1)
    }
    state.errorFields.push(field)
  },
  addTag (state, value) {
    if (state.fields.tags.indexOf(value) === -1) {
      state.fields.tags.push(value)
    }
    if (state.fields.tags.length > 0) {
      const index = state.errorFields.indexOf('tags')
      if (index > -1) {
        state.errorFields.splice(index, 1)
      }
    }
  },
  removeErrorField (state, field) {
    const index = state.errorFields.indexOf(field)
    if (index > -1) {
      state.errorFields.splice(index, 1)
    }
  },
  removeTag (state, index) {
    state.fields.tags.splice(index, 1)
    let errorIndex = state.errorFields.indexOf('tags')
    if (state.fields.tags.length > 0) {
      if (errorIndex > 0) {
        state.errorFields.splice(errorIndex, 1)
      }
    } else {
      if (errorIndex < 0) {
        state.errorFields.push('tags')
      }
    }
  },
  reset (state) {
    Object.assign(state, initialState())
  },
  resetTagsResults (state) {
    state.tagsResults = []
    state.tagsQuery = ''
  },
  selectTag (state, index) {
    if (state.fields.tags.indexOf(state.tagsResults[index]) === -1) {
      state.fields.tags.push(state.tagsResults[index])
    }
    if (state.fields.tags.length > 0) {
      const index = state.errorFields.indexOf('tags')
      if (index > -1) {
        state.errorFields.splice(index, 1)
      }
    }
    state.tagsResults.splice(index, 1)
  },
  setTagsResults (state, items) {
    state.tagsResults = items
  },
  toggleCheckbox (state, field) {
    state.fields[field] = !state.fields[field]
  },
  updateContract (state, field) {
    state.fields.contracts[field.name]['address'] = field.value
  },
  updateErrors (state, errors) {
    state.errors[errors.field] = errors.data
  },
  updateField (state, field) {
    state.fields[field.name] = field.value
  },
  updateSocial (state, field) {
    state.fields.social[field.name]['url'] = field.value
  },
  updateStatus (state, value) {
    const index = state.errorFields.indexOf('status')
    if (index > -1) {
      state.errorFields.splice(index, 1)
    }
    state.fields.status = value
  },
  updateTagsQuery (state, value) {
    state.tagsQuery = value
  },
  updateWarnings (state, warnings) {
    state.warnings[warnings.field] = warnings.data
  }
}

export const actions = {
  addErrorField ({ commit }, field) {
    commit('addErrorField', field)
  },
  addTag ({ commit }, value) {
    commit('addTag', value)
  },
  findTags: ({ commit, state }, value) => {
    axios
      .get('tags', { params: { query: value, excluded: state.fields.tags } })
      .then(response => {
        commit('setTagsResults', response.data)
      })
  },
  removeErrorField ({ commit }, field) {
    commit('removeErrorField', field)
  },
  removeTag ({ commit }, index) {
    commit('removeTag', index)
  },
  reset ({ commit }) {
    commit('reset')
  },
  resetTagsResults ({ commit }) {
    commit('resetTagsResults')
  },
  selectTag ({ commit }, index) {
    commit('selectTag', index)
  },
  toggleCheckbox ({ commit }, field) {
    commit('toggleCheckbox', field)
  },
  updateContract ({ commit }, field) {
    commit('updateContract', field)
  },
  updateErrors ({ commit }, errors) {
    commit('updateErrors', errors)
  },
  updateField ({ commit }, field) {
    commit('updateField', field)
  },
  updateSocial ({ commit }, field) {
    commit('updateSocial', field)
  },
  updateStatus ({ commit }, value) {
    commit('updateStatus', value)
  },
  updateTagsQuery ({ commit }, value) {
    commit('updateTagsQuery', value)
  },
  updateWarnings ({ commit }, warnings) {
    commit('updateWarnings', warnings)
  }
}

export const getters = {
  additionalAuthors: state => {
    return state.fields.additionalAuthors
  },
  additionalAuthorsErrors: state => {
    return state.errors.additionalAuthors
  },
  author: state => {
    return state.fields.author
  },
  authorErrors: state => {
    return state.errors.author
  },
  contracts: state => {
    return state.fields.contracts
  },
  dappUrl: state => {
    return state.fields.dappUrl
  },
  dappUrlErrors: state => {
    return state.errors.dappUrl
  },
  description: state => {
    return state.fields.description
  },
  descriptionErrors: state => {
    return state.errors.description
  },
  email: state => {
    return state.fields.email
  },
  emailErrors: state => {
    return state.errors.email
  },
  errorFields: state => {
    return state.errorFields
  },
  joinSlack: state => {
    return state.fields.joinSlack
  },
  kovanErrors: state => {
    return state.errors.kovan
  },
  license: state => {
    return state.fields.license
  },
  licenseErrors: state => {
    return state.errors.license
  },
  logo: state => {
    return state.fields.logo
  },
  logoErrors: state => {
    return state.errors.logo
  },
  mainnetErrors: state => {
    return state.errors.mainnet
  },
  name: state => {
    return state.fields.name
  },
  nameErrors: state => {
    return state.errors.name
  },
  rinkebyErrors: state => {
    return state.errors.rinkeby
  },
  ropstenErrors: state => {
    return state.errors.ropsten
  },
  selectedTags: state => {
    return state.fields.tags
  },
  socialBlog: state => {
    return state.fields.social.blog.url
  },
  socialFacebook: state => {
    return state.fields.social.facebook.url
  },
  socialGithub: state => {
    return state.fields.social.github.url
  },
  socialOther: state => {
    return state.fields.social.other.url
  },
  socialReddit: state => {
    return state.fields.social.reddit.url
  },
  socialSlack: state => {
    return state.fields.social.slack.url
  },
  socialTwitter: state => {
    return state.fields.social.twitter.url
  },
  socialWiki: state => {
    return state.fields.social.wiki.url
  },
  status: state => {
    return state.fields.status
  },
  subscribeNewsletter: state => {
    return state.fields.subscribeNewsletter
  },
  tagsQuery: state => {
    return state.tagsQuery
  },
  tagsResults: state => {
    return state.tagsResults
  },
  teaser: state => {
    return state.fields.teaser
  },
  teaserErrors: state => {
    return state.errors.teaser
  },
  teaserWarnings: state => {
    return state.warnings.teaser
  },
  acceptedTerms: state => {
    return state.fields.acceptedTerms
  },
  website: state => {
    return state.fields.website
  },
  websiteErrors: state => {
    return state.errors.website
  }
}
