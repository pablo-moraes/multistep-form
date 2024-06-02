<script>
import { formatted_price } from '@/utils/helper';

export default {
    props: {
        step: Number,
        selectedPlan: Object,
        plans: Object,
        isMonthly: Boolean,
        addons: Object
    },
    computed: {
        plan() {
            const { position } = this.selectedPlan
            return this.plans.options[position] ?? {}
        },
        plan_billing() {
            return this.isMonthly ? 'Monthly' : 'Yearly'
        },
        price() {
            return this.isMonthly ? this.plan.price_monthly : this.plan.price_yearly
        },
        addons_price() {
            const type = this.isMonthly ? 'price_monthly' : 'price_yearly'
            return this.addons.reduce((acc, current) => acc + current[type], 0)
        },
        total_price() {
            return this.selectedPlan.price + this.addons_price
        }
    },
    methods: {
        formattedPrice(pricing) {
            return formatted_price(this.isMonthly, pricing)
        }
    }
}
</script>
<template>
    <section>
        <div class="bundle-container">
            <div class="selected-plan">
                <div class="title">
                    <h3>
                        {{ plan.name }}
                        ({{ plan_billing }})
                    </h3>
                    <a href="#" @click="$emit('handlePlans')">Change</a>
                </div>
                <p class="price"><strong>{{ formattedPrice(price) }}</strong></p>
            </div>

            <div class="selected-addons">
                <div class="addon-item" v-for="(addon, index) in addons" :key="index">
                    <p>{{ addon.title }}</p>
                    <p class="price">{{ formattedPrice(addon) }}</p>
                </div>
            </div>
        </div>
        <footer>
            <p>Total {{ isMonthly ? '(per month)' : '(per year)' }}</p>
            <p class="total"><strong>{{ formattedPrice(total_price) }}</strong></p>
        </footer>
    </section>
</template>
<style lang="scss" scoped>
.bundle-container {
    border-radius: 8px;
    background-color: $alabaster;
    padding: 1.5rem;
    margin-bottom: 1rem;
}

.selected-plan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid $light-gray;
    margin-bottom: 1rem;

    h3 {
        color: $marine-blue;
        font-size: 1.1rem;
        @include ubuntu-500;
    }

    a {
        font-size: .88rem;
        color: $cool-gray;

        &:hover {
            color: $purplish-blue;
        }
    }

    .price {
        color: $marine-blue;
        font-size: 1rem;
        @include ubuntu-700;
    }

    @media only screen and (max-width: 440px) {
        h3 {
            font-size: 1rem;
        }

        .price {
            font-size: .8rem;
        }
    }
}

.addon-item {
    display: flex;
    justify-content: space-between;
    padding: .35rem 0;
    color: $cool-gray;
    @include ubuntu-300;

    .price {
        color: $marine-blue;
    }

    @media only screen and (max-widtH: 440px) {
        font-size: .9rem;
    }
}

footer {
    margin-inline: 1.2rem;
    display: flex;
    justify-content: space-between;

    p:first-child {
        font-size: .9rem;
        color: $cool-gray;
    }

    .total {
        font-size: 1.2rem;
        color: $purplish-blue;

        @media only screen and (max-width: 440px) {
            font-size: 1rem;
        }
    }
}
</style>