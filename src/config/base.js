'use strict'

import MobileDetect from 'mobile-detect'

const md = new MobileDetect(window.navigator.userAgent)

// Settings configured here will be merged into the final config object.
export default {
  ACCOUNT_KEY: process.env.ACCOUNT_KEY,
  BOT_ACCOUNT_KEY: process.env.BOT_ACCOUNT_KEY,
  BOT_ENDPOINT: process.env.BOT_ENDPOINT,
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
  SERVICES_CHECK_URL: process.env.SERVICES_CHECK_URL,
  KEYWORDS: ['operatore'],
  // Set to 'docked' or 'normal' for docked or normal mode respectively
  THEME: md.mobile() ? 'docked' : 'normal'
}
