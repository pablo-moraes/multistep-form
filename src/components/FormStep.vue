<script>
export default {
  props: {
    step: String,
    current: Number,
    title: String,
    description: String
  },
}
</script>

<template>
  <section v-if="step == current" class="form-step-section">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <slot></slot>
    <footer class="step-pagination">
      <a class="btn-prev" @click="$emit('prev')" v-if="step != 1"> Go back </a>

      <button type="button" class="btn-next" :class="{'btn-confirm': current > 3}" @click="$emit('next')">{{ current <=
          3 ? 'Next Step' : 'Confirm' }}</button>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
.form-step-section {
  position: relative;
  height: 100%;

  h1 {
    @include ubuntu-700;
    color: $marine-blue;
    font-size: 2rem;
  }

  p {
    @include ubuntu-300;
    color: $cool-gray;
    margin-bottom: 2rem;
  }
}

.step-pagination {
  width: 100%;
  display: flex;
  position: absolute;
  justify-content: flex-end;
  bottom: 1.5rem;

  &:has(.btn-prev) {
    justify-content: space-between;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 1.1rem;
    background-color: $white;

    button {
      float: right;
    }
  }
}

.btn-prev,
.btn-next,
.btn-confirm {
  padding: 1rem;
  width: 125px;
  cursor: pointer;
}

.btn-next,
.btn-confirm {
  background-color: $marine-blue;
  color: $white;
  border-radius: 8px;
  border: none;
}

.btn-confirm {
  background-color: $purplish-blue;
  border: none;

  &:hover {
    opacity: 0.8;
  }
}

.btn-prev {
  border: none;
  background: transparent;
  color: $cool-gray;

  &:hover {
    color: $marine-blue;
  }
}
</style>
