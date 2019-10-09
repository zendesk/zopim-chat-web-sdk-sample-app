'use strict';

import baseConfig from './base';

let config = {
  ENV: 'dev'
};

export default Object.freeze({
  ...baseConfig,
  ...config
});
