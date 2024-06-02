<script>
import FormOverview from './FormOverview.vue'
import { defineComponent } from 'vue'
import { validEmail, isEmpty, allFieldsVerified } from '@/utils/validation'

import PlanCard from './PlanCard.vue'
import FormStep from './FormStep.vue'

import { plans, personal_info, addons } from '@/utils/constants'

export default defineComponent({
  components: {
    FormStep, PlanCard,
    FormOverview,
  },
  emits: ['current-step'],
  data() {
    return {
      currentStep: 1,
      personal_info: personal_info,
      plans: plans,
      addons: addons,
      selectedPlan: {},
      switchState: false,
      finished: false
    }
  },
  watch: {
    currentStep(step) {
      this.$emit('current-step', step)
    },
    switchState(active) {
      this.plans.billing_type = active ? 'yearly' : 'monthly';
    },
    'plans.billing_type': function (billing) {
      // If the billing type change, send new values to selected plan.
      if (Object.keys(this.selectedPlan).length !== 0) {
        const { position } = this.selectedPlan
        this.selectedPlan.price = this.plans.options[position][`price_${billing}`]
      }
    },
  },
  methods: {
    validPersonalForm() {
      const personal_info = this.personal_info

      Object.keys(personal_info).forEach((fieldName) => {
        const { value } = personal_info[fieldName];

        let message = ''
        let verified = true

        if (isEmpty(value)) {
          message = 'This field is required.'
          verified = false
        }

        if (fieldName == 'email' && !validEmail(personal_info[fieldName].value)) {
          verified = false
          message = 'This email is not valid.'
        }

        this.updateFieldState(fieldName, verified, message);
      })

      return allFieldsVerified(personal_info);
    },

    updateFieldState(field, isVerified, message) {
      this.personal_info[field].verified = isVerified
      this.personal_info[field].error = message
    },

    nextStep() {
      switch (this.currentStep) {
        case 1:
          if (this.validPersonalForm()) {
            this.next()
          }
          break
        case 2:
          if (this.selectedPlan.price) {
            this.next()
          }
          break
        case 3:
          if (this.addons.selected_services.length > 0) {
            this.next()
          }
          break
        default:
          this.next();
          this.finished = true;
      }
    },
    next() {
      this.currentStep++;
    },
    previousStep() {
      this.currentStep -= 1
    },
    backToPlans() {
      this.currentStep = 2;
    },
    changePlan(plan) {
      this.selectedPlan = plan
    },
    addonPrice(addon) {
      if (this.switchState) {
        return `+$${addon.price_yearly}/yr`
      }

      return `+$${addon.price_monthly}/mo`
    }
  }
})
</script>

<template>
  <div class="form-container">
    <!-- Step 1 -->
    <FormStep title="Personal info" description="Please provide your name, email address, and phone number." step="1"
      :current="currentStep" @next="nextStep" @prev="previousStep">
      <div class="personal-form" role="form" aria-label="Personal Info">
        <div class="form-input">
          <label for="nameInput">Name</label>

          <input type="text" v-model="personal_info.name.value" :class="{ error: !!personal_info.name.error }"
            id="nameInput" placeholder="e.g. Stephen King" />
          <p class="validation-error" v-show="!!personal_info.name.error">
            {{ personal_info.name.error }}
          </p>
        </div>

        <div class="form-input">
          <label for="mailInput">Email Address</label>
          <input type="mail" v-model="personal_info.email.value" :class="{ error: !!personal_info.email.error }"
            id="mailInput" placeholder="e.g. stephenking@lorem.com" />
          <p class="validation-error" v-show="!!personal_info.email.error">
            {{ personal_info.email.error }}
          </p>
        </div>

        <div class="form-input">
          <label for="phoneInput">Phone Number</label>
          <input type="text" v-model="personal_info.phone.value" :class="{ error: !!personal_info.phone.error }"
            id="phoneInput" placeholder="e.g. +1 234 567 890" />
          <p class="validation-error" v-show="!!personal_info.phone.error">
            {{ personal_info.phone.error }}
          </p>
        </div>
      </div>
    </FormStep>

    <!-- Step 2 -->
    <FormStep title="Select your plan" description="You have the option of monthly or yearly billing." step="2"
      :current="currentStep" @next="nextStep" @prev="previousStep">
      <div class="cards-row">
        <PlanCard v-for="(plan, index) in plans.options" :plan="plan" :index="index" :billing="plans.billing_type"
          :key="index" @click="changePlan" :checked="selectedPlan.position === index" />
      </div>


      <div class="billing">
        <span id="option1" class="billing-option" :class="{ active: !switchState }">Monthly</span>

        <label for="switch" :aria-checked="switchState" :aria-label="!switchState ? 'Monthly' : 'Yearly'"
          :aria-labelledby="!switchState ? 'option1' : 'option2'">

          <input type="checkbox" id="switch" role="switch" @click="switchState = !switchState">
          <span class="billing-slider"></span>

        </label>

        <span id="option2" class="billing-option" :class="{ active: switchState }">Yearly</span>
      </div>
    </FormStep>

    <!-- Step 3 -->
    <FormStep title="Pick add-ons" description="Add-ons help enhance your gaming experience." step="3"
      :current="currentStep" @next="nextStep" @prev="previousStep">

      <label :for="`addon-${index}`" class="checkbox-group" v-for="(addon, index) in addons.options" :key="index"
        :aria-label="addon.title">
        <input type="checkbox" v-model="addons.selected_services" :value="addon" :id="`addon-${index}`"
          class="addon-checkbox">
        <div class="addon-description">
          <h4>{{ addon.title }}</h4>
          <p>{{ addon.description }}</p>
        </div>
        <div class="addon-price">
          <p>
            {{ addonPrice(addon) }}
          </p>
        </div>
      </label>
    </FormStep>

    <!-- Step 4 -->
    <FormStep title="Finishing up" description="Double-check everything looks OK before confirming." step="4"
      :current="currentStep" @next="nextStep" @prev="previousStep">
      <FormOverview :step="currentStep" :selectedPlan="selectedPlan" :plans="plans" :addons="addons.selected_services"
        :isMonthly="!switchState" @handlePlans="backToPlans" />
    </FormStep>

    <section v-if="finished" class="acknowledge-container">
      <img src="../assets/images/icon-thank-you.svg" alt="This image is just a checkmark icon">
      <h1>Thank you!</h1>
      <p>
        Thanks for your subscription! We hope you have fun using our platform.
        If you ever need support, please feel free to email us at support@loremgamming.com.
      </p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.form-container {
  width: 100%;
  margin-top: 0.5rem;
  max-width: 455px;
  margin-inline: auto;
  font-family: $ubuntu;

  @media only screen and (max-width: 768px) {
    max-width: unset;
    width: 92%;
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: -65px;
    background-color: $white;

    &:has(.acknowledge-container) {
      height: 50%;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 968px) {
    margin-left: 1rem;
  }
}

.personal-form {
  display: flex;
  flex-direction: column;
  align-items: center;

  .form-input {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 450px;

    @media only screen and (max-width: 768px) {
      max-width: unset;
    }

    label,
    input {
      @include ubuntu-500;
      color: $marine-blue;
      font-size: 1rem;

      @media only screen and (max-width: 375px) {
        font-size: .95rem;
      }
    }

    label {
      margin-bottom: 0.2rem;
    }

    input {
      width: 100%;
      height: 48px;
      border-radius: 8px;
      border: 1px solid $light-gray;
      padding-inline: 0.8rem;
      margin-bottom: 0.8rem;

      &.error {
        border: 1px solid $straw-red;
      }

      &::placeholder {
        color: $cool-gray;
      }

      &:focus-visible {
        outline: 1px solid $purplish-blue;
      }
    }

    .validation-error {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      color: $straw-red;

      @media only screen and (max-width: 375px) {
        font-size: .8rem;
      }
    }
  }
}

.cards-row {
  display: flex;
  justify-content: center;
  gap: 1rem;


  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
}

.billing {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 50px;
  background-color: $alabaster;
  border-radius: 8px;
  margin-top: 2rem;

  label {
    width: 40px;
    height: 20px;
    background-color: $marine-blue;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
  }

  &-slider {
    position: absolute;
    top: 50%;
    left: 4px;
    transform: translateY(-50%);
    transition: left 300ms linear;

    width: 10px;
    height: 10px;
    background-color: $white;
    border-radius: 15px;
  }

  &-option {
    color: $cool-gray;

    &.active {
      color: $marine-blue;
    }
  }

  #switch {
    z-index: -1;
    opacity: 0;

    &:checked~.billing-slider {
      left: 26px;
    }
  }
}

.checkbox-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .8rem;
  border: 1px solid $light-gray;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;

  &:has(.addon-checkbox:checked) {
    background-color: $alabaster;
    border-width: 1.5px;
    border: 1px solid $purplish-blue;
  }

  &:hover {
    background-color: $alabaster;
  }
}

.addon-checkbox {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.25em;
  height: 1.25em;
  border: 1px solid $light-gray;
  border-radius: 4px;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  padding: .5rem;

  &:checked {
    color: $purplish-blue;
    background-color: $purplish-blue;
  }

  &::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    background-color: $white;
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  &:checked::before {
    transform: scale(1);
    background-color: $white;
  }
}


.addon-description {
  margin-right: auto;

  h4 {
    color: $marine-blue;
    font-size: 1rem;
  }

  p {
    color: $cool-gray;
    font-size: 0.8rem;
  }
}

.addon-price {
  justify-self: flex-end;
  color: $purplish-blue;
  font-size: 14px;
}

.acknowledge-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-align: center;

  h1 {
    color: $marine-blue;
  }

  p {
    max-width: 430px;
    color: $cool-gray;
  }
}
</style>
