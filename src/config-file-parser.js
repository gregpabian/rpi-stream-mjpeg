const defaultConfig = {
  address: '0.0.0.0',
  port: 8080
};

let config;

try {
  config = require('../camera-config.json');
} catch (e) {
  config = {};
}

module.exports = Object.assign({}, defaultConfig, config);