// require modules
const v4l2camera = require('v4l2camera');
// image settings to v4l2 control mapping
const optionMap = {
  blueBalance: 'Blue Balance',
  brightness: 'Brightness',
  colorEffects: 'Color Effects',
  contrast: 'Contrast',
  horizontalFlip: 'Horizontal Flip',
  powerLineFrequency: 'Power Line Frequency',
  redBalance: 'Red Balance',
  rotate: 'Rotate',
  saturation: 'Saturation',
  sharpness: 'Sharpness',
  verticalFlip: 'Vertical Flip'
};

class Camera {
  constructor(options) {
    // instantiate v4l2 camera
    this.cam = new v4l2camera.Camera('/dev/video0');
    // we want the JPEG format, otherwise stop the script execution
    if (this.cam.configGet().formatName !== 'JPEG') {
      throw new Error('Unsupported camera format, JPEG needed');
      process.exit(1);
    }
    // configure image settings
    this.configure(options);
    // connect camera
    this.cam.start();
    // reference to helper promise
    this.capturePromise = null;
  }

  capture() {
    if (!this.capturePromise) {
      this.capturePromise = new Promise((resolve) => {
        this.cam.capture(() => {
          let frame = this.cam.frameRaw();

          resolve(frame);

          this.capturePromise = null;
        });
      });
    }

    return this.capturePromise;
  }

  configure(options) {
    // width and height is adjusted by updating the outut format
    if (options.width || options.height) {
      let format = this.cam.configGet();

      format.width = options.width || format.width;
      format.height = options.height || format.height;

      this.cam.configSet(format);
    }
    // the rest of options is updated via controls
    for (let option in optionMap) {
      this.cam.controlSet(
        this.cam.controls[optionMap[option]].id,
        option in options ? options[option] : this.cam.controls[optionMap[option]].default
      );
    }
  }

  destroy() {
    this.cam.stop(() => {});
  }
}

module.exports = Camera;
