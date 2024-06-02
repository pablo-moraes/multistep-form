<script>
import MultiForm from '@/components/MultiForm.vue'

import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    MultiForm
  },
  data() {
    return {
      currentStep: 1
    }
  },
  methods: {
    setCurrentStep(step) {
      this.currentStep = step;
    }
  }
})
</script>

<template>
  <main class="wrapper">
    <aside class="side-nav">
      <ul class="nav-list">
        <li>
          <button tabindex="-1" :class="{ active: currentStep === 1 }">1</button>
          <div>
            <h2>STEP 1</h2>
            <h3>YOUR INFO</h3>
          </div>
        </li>

        <li>
          <button tabindex="-1" :class="{ active: currentStep === 2 }">2</button>
          <div>
            <h2>STEP 2</h2>
            <h3>SELECT PLAN</h3>
          </div>
        </li>

        <li>
          <button tabindex="-1" :class="{ active: currentStep === 3 }">3</button>
          <div>
            <h2>STEP 3</h2>
            <h3>ADD-ONS</h3>
          </div>
        </li>

        <li>
          <button tabindex="-1" :class="{ active: currentStep === 4 }">4</button>
          <div>
            <h2>STEP 4</h2>
            <h3>SUMMARY</h3>
          </div>
        </li>
      </ul>
    </aside>
    <MultiForm @current-step="setCurrentStep" />
  </main>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  background-color: $white;
  height: 100vh;
  width: 90vw;
  max-width: 940px;
  max-height: 600px;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 7px 7px 15px -3px rgba(0, 0, 0, 0.1);


  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    max-height: unset;
    flex-direction: column;
    padding: 0;
    background: transparent;
  }
}

.side-nav {
  width: 100%;
  max-width: 275px;
  height: 100%;
  max-height: 568px;
  background: no-repeat center/cover url('@/assets/images/bg-sidebar-desktop.svg');
  border-radius: 8px;
  padding: 1.2rem;

  .nav-list {
    list-style-type: none;

    li {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      padding: 1rem;

      button {
        width: 35px;
        height: 35px;
        font-size: 1rem;
        border-radius: 100%;
        border: 1px solid $magnolia;
        color: $magnolia;
        background-color: transparent;
        @include ubuntu-700;

        &.active {
          background-color: $light-blue;
          color: $marine-blue;
          border-color: $light-blue;
        }
      }

      h2 {
        @include ubuntu-300;
        font-size: 0.88rem;
        color: $light-gray;
      }

      h3 {
        @include ubuntu-500;
        font-size: 1rem;
        color: $magnolia;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    max-width: 100%;
    background: no-repeat center/cover url('@/assets/images/bg-sidebar-mobile.svg');
    max-height: 162px;
    border-radius: unset;

    & .nav-list {
      display: flex;
      justify-content: center;

      li {
        width: auto;

        div {
          display: none;
        }
      }
    }
  }
}
</style>
