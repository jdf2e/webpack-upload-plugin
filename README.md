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
            username: 'test',
            password: 'test',
            host: '192.168.1.1',
            target: 'webpackTest'
        })
    ]
}
```

## Options

* `host`: 要上传的目标服务器ip地址
* `username`: 要上传的目标服务器用户名称
* `password`: 要上传的目标服务器密码
* `target`: 上传到服务器之后的目录名称，路径是相对于`/var/www/html/page.jd.com`。不要以`/`开头，否则会被认为是服务器的绝对路径。
