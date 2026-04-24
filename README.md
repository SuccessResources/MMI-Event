# MMI Event Landing Page

Millionaire Mind Intensive — 2026 World Tour landing page.

## Files

| File | Purpose |
|---|---|
| `index.html` | Main landing page with geo-detection, Stripe embedded checkout, dynamic trainer section |
| `choose-your-city.html` | City picker page — used in email campaigns to capture subscriber location |

## Setup

1. Add your Stripe publishable key in `index.html` → `STRIPE_PUBLISHABLE_KEY`
2. Add Stripe Buy Button IDs per event in the `EVENTS` array → `stripeButtonId`
3. Add your Zapier webhook URL in `choose-your-city.html` → `ZAPIER_WEBHOOK`
4. Update the `LANDING_PAGE` URL once your domain is live

## Deployment

Connected to Vercel — pushes to `main` deploy automatically.
