# jdf2e-webpack-upload-plugin

## Install

```javascript
npm install jdf2e-webpack-upload-plugin
```

## Usage

```javascript
var webpack = require('webpack')
var path = require('path')
var webpackUploadPlugin = require('jdf2e-webpack-upload-plugin')

module.exports = {
    entry: {
        main: './index.js',
        vendor: 'moment'
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
        new webpackUploadPlugin({
            host: '192.168.1.1',
            target: 'webpackTest'
        })
    ]
}
```

## Options

* `host`: 要上传的目标服务器ip地址，默认为`73`
* `source`: 要上传的本地文件夹，例如`source: dist`
* `cdn`: 选择需要上传的cdn服务器`misc`或者`static`，默认为`misc`
* `port`: 服务器端口号，默认为`3000`
* `target`: 上传到服务器之后的目录名称。不要以`/`开头，否则会被认为是服务器的根目录。
