export interface SubscriptionPlan {
  id: number
  name: string
  tagline: string
  price: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
  current?: boolean
}
