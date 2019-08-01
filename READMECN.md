# resloader

[![Build Status](https://travis-ci.org/chenyinkai/resloader.svg?branch=master)](https://travis-ci.org/chenyinkai/resloader)
[![npm](https://img.shields.io/npm/v/resloader.svg)](https://www.npmjs.com/package/resloader)
[![npm](https://img.shields.io/npm/dt/resloader.svg)](https://www.npmjs.com/package/resloader)
[![npm](https://img.shields.io/npm/l/resloader.svg)](https://www.npmjs.com/package/resloader)
[![npm](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/standard/standard)

[English](https://github.com/chenyinkai/resloader)
[中文文档](https://github.com/chenyinkai/resloader/blob/master/READMECN.md)

### Overview

> 实现图片的预加载功能，并且可以查看图片的加载进度

[DEMO](https://chenyinkai.github.io/Pages/resloader/example/progress.html)

### 安装及引入

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

### 使用

```js
// imageData 可以是json
// url 是必须的，其他信息可根据需要自行添加
let imageData = [{
    name: images1,
    url: imageUrl
},{
    name: images1,
    url: imageUrl
},{
    name: images1,
    url: imageUrl
},{
    name: audio,
    url: audioUrl
}]
// 或者 imageData 可以是数组
let imageData = [imageUrl, imageUrl, imageUrl,audioUrl]

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

## options 参数描述

| Option         | Description              | default | type         | Function Params  Description      |
| -------------- | ----------------------   | ------- | ------------ | ------------------------ |
| resources      | 预加载的图片或音频集合    | -        | JSON, Array  |           -              |
| onStart        | 图片开始加载时的回调       | -       | Function     |   total: 预加载的图片总数              |
| onProgress     | 每一张图片加载完成的回调   | -       | Function     |   currentIndex：已加载的图片数<br> total：预加载图片总数              |
| onComplete     | 所有图片加载完成的回调     | -       | Function     |   total: 预加载的图片总数 <br> result: 预加载的图片集合(同resources)   |

### LICENSE

MIT@[chenyinkai](https://github.com/chenyinkai)