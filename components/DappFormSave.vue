<template>
  <div class="DappFormSave">
    <div class="profile-score-wrapper">
      <h3 class="profile-score-title">Current profile strength <span class="profile-score-title-pct">{{ Math.ceil(profileScore * 100) }}%</span></h3>
      <div class="profile-score-bar">
        <div
          :style="'width: ' + Math.ceil(profileScore * 100) + '%'"
          class="profile-score-bar-pct"/>
      </div>
      <p class="profile-score-note">
        Complete <template v-if="formType === 'edit'">this DApp's</template><template v-else>your</template> profile to boost <template v-if="formType === 'edit'">its</template><template v-else>your</template> rank
      </p>
    </div>
    <!--
    <div
      v-if="formType === 'new'"
      class="additional-comments">
      <label
        class="text-area-label"
        for="additionalComments">{{ $t('submitQuestion') }}</label>
      <textarea
        :value="additionalComments"
        :placeholder="$t('submitQuestionPlaceholder')"
        class="text-area"
        name="additionalComments"
        @input="updateAdditionalComments($event.target.value)"/>
    </div>
    -->
    <DappFormFieldsEmail
      :email="fields.email"
      :form-type="formType"
      :errors="errors.email"
      @updateErrors="updateErrors"
      @updateField="updateField"/>
    <div class="checkboxes">
      <div
        v-if="formType === 'new'"
        class="checkbox-field">
        <input
          id="subscribe-newsletter-checkbox"
          :checked="subscribeNewsletter"
          class="checkbox-input"
          type="checkbox"
          @click="updateNewsletter">
        <label
          class="checkbox-label"
          for="subscribe-newsletter-checkbox">Email me (very occasional) updates</label>
      </div>
      <div
        id="acceptedTermsField"
        class="checkbox-field">
        <input
          id="accepted-terms-checkbox"
          :checked="acceptedTerms"
          class="checkbox-input"
          type="checkbox"
          @click="updateAcceptedTerms">
        <label
          id="acceptedTerms"
          class="checkbox-label"
          for="accepted-terms-checkbox">I accept the&nbsp;<nuxt-link
            to="/terms"
            @click.native="$mixpanel.track('New DApp - Terms of Service')">Terms of Service</nuxt-link>&nbsp;<span class="required">(required)</span></label>
      </div>
      <p v-if="formType === 'new'">Submissions are free and typically processed by the next business day.</p>
    </div>
    <div class="submit-wrapper">
      <BasePopover
        v-on-clickaway="hideMissingFields"
        v-if="popoverIsActive && missingFields.length">
        <ul class="missing-fields-list">
          <li
            v-for="(field, index) in missingFields"
            :key="index"
            class="missing-fields-item">
            <span
              class="missing-fields-anchor"
              role="link"
              @click="goToField(field.anchor)">{{ field.label }}</span>
          </li>
        </ul>
      </BasePopover>
      <div
        v-if="(formType === 'edit' && !diffExists) || (errorFields.length > 0)"
        class="error-message-wrapper">
        <div v-if="formType === 'edit' && !diffExists">
          You must edit this DApp before submitting
        </div>
        <div
          v-else-if="errorFields.length > 0"
          class="has-missing-fields"
          @click="showMissingFields">
          {{ `${errorFields.length} ${$options.filters.pluralize('field', errorFields.length)} ${errorFields.length > 1 ? 'require' : 'requires' } your attention` }}
        </div>
      </div>
      <input
        v-if="(formType === 'edit' && !diffExists) || (errorFields.length > 0)"
        :value="'Submit'"
        class="submit"
        type="submit"
        @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true, errorFields })">
      <input
        v-else-if="sending"
        :value="'Please wait'"
        class="submit"
        type="submit"
        @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true })">
      <input
        v-else-if="errorFields.length === 0"
        :value="'Submit'"
        class="submit is-ready"
        type="submit"
        @click.prevent="submit">
      <input
        v-model="honeypot"
        type="text"
        class="yumyum">
    </div>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'
import {
  platformContractProps,
  platformContractPropNames,
  platformNetworkFullNameMap
} from '@/helpers/constants'
import DappFormFieldsEmail from './DappFormFieldsEmail.vue'
import BasePopover from './BasePopover'

export default {
  directives: {
    onClickaway: onClickaway
  },
  components: {
    BasePopover,
    DappFormFieldsEmail
  },
  props: {
    ...platformContractProps(),
    acceptedTerms: {
      type: Boolean,
      required: true,
      default: false
    },
    additionalComments: {
      type: String,
      required: true,
      default: ''
    },
    diffExists: {
      type: Boolean,
      required: true,
      default: false
    },
    errorFields: {
      type: Array,
      required: true,
      default: () => []
    },
    errors: {
      type: Object,
      required: true,
      default: () => ({})
    },
    fields: {
      type: Object,
      required: true,
      default: () => ({})
    },
    formType: {
      type: String,
      required: true,
      default: ''
    },
    profileScore: {
      type: Number,
      required: true,
      default: null
    },
    sending: {
      type: Boolean,
      required: true,
      default: false
    },
    subscribeNewsletter: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data: () => {
    return {
      popoverIsActive: false,
      profileScoreTimer: '',
      honeypot: null
    }
  },
  computed: {
    userEntryRoute() {
      return this.$store.getters['userEntryRoute']
    },
    missingFields() {
      const missingFields = []
      const errorFieldsToLabelsMap = {
        ...platformNetworkFullNameMap(),
        acceptedTerms: 'Accept the terms',
        authors: 'Authors',
        category: 'Category',
        dappUrl: 'DApp URL',
        description: 'Description',
        email: 'Email',
        name: 'DApp Name',
        platform: 'Platform',
        socialChat: 'Chat invitation URL',
        status: 'Status',
        tags: 'Tags',
        teaser: 'Headline',
        websiteUrl: 'Website URL'
      }
      this.errorFields.map(x => {
        missingFields.push({
          anchor: x,
          label: errorFieldsToLabelsMap[x]
        })
      })
      return missingFields
    }
  },
  watch: {
    fields: {
      handler(fields) {
        this.setProfileScore(fields)
        this.$emit('checkFormDiff')
      },
      deep: true
    }
  },
  methods: {
    goToField(anchor) {
      document.getElementById(anchor).scrollIntoView({ behavior: 'smooth' })
      const highlightEl = document.getElementById(anchor + 'Field')
      highlightEl.classList.add('is-highlighted')
      setTimeout(() => {
        highlightEl.classList.remove('is-highlighted')
      }, 4000)
      this.popoverIsActive = false
    },
    setProfileScore(fields) {
      clearTimeout(this.profileScoreTimer)
      this.profileScoreTimer = setTimeout(() => {
        // TODO clean this up
        const data = { fields }
        const propNames = platformContractPropNames()
        propNames.map(prop => {
          data.fields[prop] = this[prop]
        })
        this.$axios.$post('profile/score', data).then(response => {
          const score = response.score || 0
          this.$emit('setProfileScore', score)
        })
      }, 750)
    },
    hideMissingFields() {
      this.popoverIsActive = false
    },
    showMissingFields() {
      this.popoverIsActive = true
      this.$mixpanel.track('New DApp - Show Missing', {
        errorFields: this.errorFields
      })
    },
    submit() {
      if (this.honeypot === null) {
        const data = {
          fields: this.fields
        }
        if (typeof Intercom !== 'undefined') {
          data.visitorId = Intercom('getVisitorId')
        }
        const propNames = platformContractPropNames()
        propNames.map(prop => {
          data.fields[prop] = this[prop]
        })
        this.$emit('submit', data)
      }
    },
    updateAcceptedTerms() {
      this.$emit('updateCheckbox', 'acceptedTerms')
    },
    updateField(field, value) {
      this.$emit('updateField', field, value)
    },
    updateErrors(errors) {
      this.$emit('updateErrors', errors)
    },
    updateNewsletter() {
      this.$emit('updateCheckbox', 'subscribeNewsletter')
    },
    updateAdditionalComments(value) {
      this.$emit('updateField', 'additionalComments', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.DappFormSave {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 0 auto;
  margin-top: 1px;
  position: sticky;
  top: 10px;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-left: 0;
    margin-right: 0;
  }
}

.BasePopover {
  bottom: 100% !important;
  left: 50% !important;
  margin-left: -100px !important;
}

.attribution {
  margin: 0;
}

.checkboxes {
  margin: 12px auto 0;
  width: 300px;
  @include tweakpoint('min-width', 1000px) {
    margin-left: 0;
    margin-right: 0;
  }
}

.checkbox-field {
  margin-top: 9px;
  display: flex;
  @include highlight;
}

.checkbox-input {
  display: none;
  position: relative;
  &:checked + .checkbox-label:after {
    transform: scale(1);
  }
}

.checkbox-label {
  padding-left: 22px;
  position: relative;
  display: flex;
  &:before {
    cursor: pointer;
    content: '';
    display: block;
    width: 13px;
    height: 13px;
    border: 1px solid $color--black;
    position: absolute;
    top: 1px;
    left: 0;
  }
  &:after {
    cursor: pointer;
    content: '';
    display: block;
    background: $color--black;
    transition: transform 0.1s ease;
    transform: scale(0);
    width: 9px;
    height: 9px;
    position: absolute;
    top: 3px;
    left: 2px;
  }
}

.description {
  margin: 0;
  @include tweakpoint('min-width', 900px) {
    margin-top: 10px;
  }
}

.description-wrapper {
  flex-grow: 1;
}

.error-message-wrapper {
  position: relative;
  text-align: center;
  margin: 0 auto;
  width: 300px;
  padding: 10px;
  color: $color--white;
  background: rgba($color--black, 0.9);
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-left: 0;
    margin-right: 0;
  }
  & + .submit {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}

.submit-wrapper {
  position: relative;
  margin-top: 15px;
}

.has-missing-fields {
  text-decoration: underline;
  cursor: pointer;
}

.info {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  @include tweakpoint('min-width', 900px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
}

.missing-fields-anchor {
  display: block;
  cursor: pointer;
  text-decoration: underline;
  padding: 0.25rem 0;
}

.note {
  margin: 0;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.profile-score-bar {
  width: 100%;
  height: 15px;
  background: $color--white;
  box-shadow: 0 0 20px rgba($color--black, 0.05);
  border-radius: 20px;
  overflow: hidden;
}

.profile-score-bar-pct {
  height: 100%;
  background: $color--black;
  transition: all 0.2s ease;
}

.profile-score-note {
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 0.9rem;
}

.profile-score-title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.profile-score-title-pct {
  font-weight: normal;
  padding-left: 5px;
}

.profile-score-wrapper {
  width: 300px;
  margin: 0 auto;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-left: 0;
    margin-right: 0;
  }
}

.text-area::placeholder {
  color: darken($color--gray, 30%);
}

.text-area-label {
  display: block;
  padding-bottom: 5px;
}

.required {
  display: inline-block;
  padding-left: 2px;
  color: $color--medium-purple;
  font-weight: 600;
}

.submit {
  display: block;
  border-radius: 4px;
  margin: 0 auto;
  width: 300px;
  border: none;
  background: rgba($color--black, 0.1);
  color: rgba($color--black, 0.5);
  font-size: 1rem;
  font-weight: 600;
  padding: 15px;
  position: relative;
  transition: all 0.5s ease;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-left: 0;
    margin-right: 0;
  }
  &.is-ready {
    background: rgba($color--black, 1);
    box-shadow: 0 17px 70px rgba($color--black, 0.3);
    border-radius: 1000px;
    color: $color--gray;
    &:hover {
      cursor: pointer;
    }
    &:active {
      top: 1px;
    }
  }
}

.additional-comments {
  background: darken($color--gray, 4%);
  width: 300px;
  padding: 10px;
  margin: 15px auto 0 auto;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-left: 0;
    margin-right: 0;
  }
}

.title {
  margin: 0;
  font-size: 1.5rem;
}

.text-area {
  width: 100%;
  height: 60px;
  resize: none;
  padding: 10px;
  border: none;
  margin-top: 5px;
  box-shadow: 0 0 20px rgba($color--black, 0.05);
}

.url {
  width: 300px;
}

.yumyum {
  display: none;
}
</style>
