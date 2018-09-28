'use strict'

import MobileDetect from 'mobile-detect'

const md = new MobileDetect(window.navigator.userAgent)

// Settings configured here will be merged into the final config object.
export default {
  ACCOUNT_KEY: process.env.ACCOUNT_KEY,
  BOT_ACCOUNT_KEY: process.env.BOT_ACCOUNT_KEY,
  BOT_ENDPOINT:
    'https://hypebotqna.azurewebsites.net/qnamaker/knowledgebases/6caa7eed-9b39-4033-8637-9028fec8751d/generateAnswer',
  EMAIL_ADDRESS: 'hello@hype.it',
  SERVICES_CHECK_URL: 'https://www.hype.it/api/rest/FREE/services',
  KEYWORDS: ['operatore'],
  // Set to 'docked' or 'normal' for docked or normal mode respectively
  THEME: md.mobile() ? 'docked' : 'normal'
}
