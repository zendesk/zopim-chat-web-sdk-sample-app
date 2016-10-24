'use strict';

import baseConfig from './base';

let config = {
  ENV: 'dist'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
