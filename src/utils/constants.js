import arcadeIcon from '@/assets/images/icon-arcade.svg'
import advancedIcon from '@/assets/images/icon-advanced.svg'
import proIcon from '@/assets/images/icon-pro.svg'

export const personal_info = {
  name: {
    value: '',
    error: '',
    verified: null
  },
  email: {
    value: '',
    error: '',
    verified: null
  },
  phone: {
    value: '',
    error: '',
    verified: null
  }
}

export const plans = {
  options: [
    {
      name: 'Arcade',
      icon: arcadeIcon,
      price_yearly: 90,
      price_monthly: 9
    },
    {
      name: 'Advanced',
      icon: advancedIcon,
      price_yearly: 120,
      price_monthly: 12
    },
    {
      name: 'Pro',
      icon: proIcon,
      price_yearly: 150,
      price_monthly: 15
    }
  ],
  billing_type: 'monthly'
}

export const addons = {
  options: [
    {
      title: 'Online Service',
      description: 'Access to multiplayer games',
      price_monthly: 1,
      price_yearly: 10
    },
    {
      title: 'Larger Storage',
      description: 'Extra 1TB of cloud save',
      price_monthly: 2,
      price_yearly: 20
    },
    {
      title: 'Customizable Profile',
      description: 'Custom theme on your profile',
      price_monthly: 2,
      price_yearly: 20
    }
  ],
  selected_services: []
}
