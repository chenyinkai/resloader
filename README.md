# resloader

[![Build Status](https://travis-ci.org/chenyinkai/resloader.svg?branch=master)](https://travis-ci.org/chenyinkai/resloader)
[![npm](https://img.shields.io/npm/v/resloader.svg)](https://www.npmjs.com/package/resloader)
[![npm](https://img.shields.io/npm/dt/resloader.svg)](https://www.npmjs.com/package/resloader)
[![npm](https://img.shields.io/npm/l/resloader.svg)](https://www.npmjs.com/package/resloader)
[![npm](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/standard/standard)

[English](https://github.com/chenyinkai/resloader)
[中文文档](https://github.com/chenyinkai/resloader/blob/master/READMECN.md)

### Overview

> A image preloaded plugin and can display the loaded image progress bar

[DEMO](https://chenyinkai.github.io/Pages/resloader/example/progress.html)

### Install

**Install resloader**

```sh
npm install resloader
```

**Import resloader**

ES6/commonjs import style is supported.

```js
// ES6
import resloader from 'resloader';

// commonjs
var resloader = require("resloader");
```

or link as a script in an html file.

```html
<script src="dist/resloader.js"></script>
```

### Usage

```js
// imageData expected a JSON
// url is required
let imageData = [{
    name: images1,
    url: imageUrl
},{
    name: images1,
    url: imageUrl
},{
    name: images1,
    url: imageUrl
}，{
    name: audio,
    url: audioUrl
}]
// or imageData can be an Array
let imageData = [imageUrl, imageUrl, imageUrl, audioUrl]

const options = {
    resources: imageData, //imageData expected a JSON or Array
    onStart: function(total) {
        console.log('onStart:' + total)
    },
    onProgress: function(currentIndex, total) {
        console.log('onProgress:' + currentIndex + '/' + total)
    },
    onComplete: function(total,result) {
        console.log('onComplete:' + total)
        console.log(result)
    }
}

resloader(options);
```

## options

| Option  | Description              | default        | type      | Function Params  Description      |
| ------- | ----------------------   | -----------    | --------- | ------------------------ |
| resources     | preload images/audio data | -      | JSON, Array    |           -              |
| onStart     | callback when  preload on started   | -      | Function    |           total: preload images total              |
| onProgress     | callback when  preload on loading      | -      | Function    |    currentIndex：loaded images number <br> total：preload images total              |
| onComplete     | callback when  preload on complete        | -      | Function    |    total: preload images total <br> result: preload images data(the same as resources)            |

### LICENSE

MIT@[chenyinkai](https://github.com/chenyinkai)