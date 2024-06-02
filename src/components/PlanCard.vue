<script>
import { formatted_price } from '@/utils/helper';

export default {
  emits: ['click'],
  props: {
    index: Number,
    plan: Object,
    billing: String,
    checked: Boolean
  },
  data() {
    return {
      selected_service: null
    }
  },
  computed: {
    price() {
      return this.isMonthly ? this.plan.price_monthly : this.plan.price_yearly
    },
    isMonthly() {
      return this.billing == 'monthly'
    }
  },
  methods: {
    sendChange() {
      this.$emit('click', { price: this.price, position: this.index })
    },
    formattedPrice() {
      const isMonthly = this.billing == 'monthly'
      return formatted_price(isMonthly, this.price)
    }
  }
}
</script>

<template>
  <label :for="'checkPlan' + price">
    <input type="radio" name="plan" :id="'checkPlan' + price" @click="sendChange" :checked="checked" />
    <div class="card" :class="{'h-183': !isMonthly}">
      <img :src="plan.icon" :alt="plan.name + 'Plan'" class="card-icon" />

      <div class="card-info">
        <h4>{{ plan.name }}</h4>
        <p>{{ formattedPrice(price) }}</p>
        <p v-if="!isMonthly" class="discount-text">
          2 months free
        </p>
      </div>
    </div>
  </label>

</template>

<style lang="scss" scoped>
.card {
  position: relative;

  width: 140px;
  height: 160px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  padding: 1rem 0.9rem;
  border: 0.1rem solid $light-gray;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 100ms, border 100ms ease-in-out;
  position: relative;

  &.h-183 {
    height: 183px;
  }

  &:hover {
    background-color: $alabaster;
  }

  &-icon {
    max-width: 40px;
    min-width: 35px;
  }

  &-info {
    h4 {
      color: $marine-blue;
      font-size: 1rem;
    }

    p {
      color: $cool-gray;
      font-size: 0.95rem;

      &.discount-text {
        font-size: 0.9rem;
        color: $marine-blue;
        @include ubuntu-300;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    height: 100px;
    width: 100%;
  }
}

input {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

input[type='radio']:checked~.card {
  border-color: $purplish-blue;
  background-color: $magnolia;
}
</style>
