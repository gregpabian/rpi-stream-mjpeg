const sc = require('subcommander');
// camera options
sc.option('blueBalance', {
    abbr: 'bb',
    desc: 'Blue Balance'
  })
  .option('brightness', {
    abbr: 'b',
    desc: 'Brightness'
  })
  .option('colorEffects', {
    abbr: 'ce',
    desc: 'Color Effects'
  })
  .option('contrast', {
    abbr: 'c',
    desc: 'Contrast'
  })
  .option('height', {
    abbr: 'H',
    desc: 'Height'
  })
  .option('horizontalFlip', {
    abbr: 'hf',
    desc: 'Horizontal Flip'
  })
  .option('powerLineFrequency', {
    abbr: 'plf',
    desc: 'Power Line Frequency'
  })
  .option('redBalance', {
    abbr: 'rb',
    desc: 'Red Balance'
  })
  .option('rotate', {
    abbr: 'r',
    desc: 'Rotate'
  })
  .option('saturation', {
    abbr: 's',
    desc: 'Saturation'
  })
  .option('sharpness', {
    abbr: 'S',
    desc: 'Sharpness'
  })
  .option('verticalFlip', {
    abbr: 'vf',
    desc: 'Vertical Flip'
  })
  .option('width', {
    abbr: 'w',
    desc: 'Width'
  })
  // server options
  .option('address', {
    abbr: 'a',
    desc: 'Server Address',
    default: '0.0.0.0'
  })
  .option('port', {
    abbr: 'p',
    desc: 'Server Port',
    default: 8080
  })

let options = sc.parse();

module.exports = options;