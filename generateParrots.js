"use strict"

const fs = require('fs')
const GIFEncoder = require('gifencoder')
const Canvas = require('canvas')
const Image = Canvas.Image
const countryColors = require('./data/countryColors.js').getAll()
const CONFIG = {
  source:   './framePngs/',
  destination:   './parrots/',
  gifFrames: [
    '0.png',
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png',

  ],
  gifSize: {
    w: 35,
    h: 25
  }
}

function renderParrot(colorObject, progress) {

  let encoder = new GIFEncoder(CONFIG.gifSize.w, CONFIG.gifSize.h)
  const {name, colors} = colorObject

  encoder.createReadStream()
    .pipe(fs.createWriteStream(`${CONFIG.destination}${name.toLowerCase().split(' ').join('-')}-parrot.gif`))

  encoder.start()
  encoder.setRepeat(0)
  encoder.setDelay(35)
  encoder.setQuality(10)
  encoder.setTransparent('#FFFFFF');

  for(var colorIndex = 0; colorIndex < colors.length; colorIndex++) {
    CONFIG.gifFrames.map((frame, frameIndex) => {
      let frameCanvas = new Canvas(CONFIG.gifSize.w, CONFIG.gifSize.h)
      let frameCtx = frameCanvas.getContext('2d');

      let buffer = new Canvas(CONFIG.gifSize.w, CONFIG.gifSize.h)
      let bufferCtx = buffer.getContext('2d')

      let img = new Canvas.Image
          img.src = fs.readFileSync(`${CONFIG.source}${frame}`);

      let imgOutline = new Image()
          imgOutline.src = fs.readFileSync(`${CONFIG.source}${frame.replace('.png', '_o.png')}`);

      bufferCtx.drawImage(img,0,0)

      bufferCtx.globalCompositeOperation = "source-atop"

      bufferCtx.globalAlpha = ((CONFIG.gifFrames.length - frameIndex) / CONFIG.gifFrames.length) - 0.2
      bufferCtx.fillStyle = colors[colorIndex]
      bufferCtx.fillRect(0,0, CONFIG.gifSize.w, CONFIG.gifSize.h)

      bufferCtx.globalAlpha = 1.2 - ((CONFIG.gifFrames.length - frameIndex) / CONFIG.gifFrames.length)

      bufferCtx.fillStyle = (colors[colorIndex+1] || colors[0])
      bufferCtx.fillRect(0,0,CONFIG.gifSize.w, CONFIG.gifSize.h)

      bufferCtx.drawImage(imgOutline,0,0)

      frameCtx.drawImage(buffer, 0,0);
      frameCtx.drawImage(imgOutline,0,0)

      encoder.addFrame(frameCtx);
    })
  }
  process.stdout.write("\r\x1b[K")
  process.stdout.write(`${progress+1} of ${countryColors.length} parrots generated [${colorObject.name}]`);
}

countryColors.map(renderParrot)
console.log('\ndone!');


