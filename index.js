var fs = require('fs')
var glob = require('glob')
var request = require('request');
var jdfUtils = require('jdf-utils');
var $ = jdfUtils.base;
var f = jdfUtils.file;

function webpackUploadPlugin(options){
    this.options = options
}

webpackUploadPlugin.prototype.apply = function(compiler){
    var options = this.options
    var source = `${process.cwd()}/${options.source}`
    var target = options.target
    var cdn = (options.cdn === 'static' ? 'static.360buyimg.com' : 'misc.360buyimg.com')
    var username = options.username
    var password = options.password
    var host = options.host
    var exclude = options.exclude || `.DS_Store|.babelrc|.git|node_modules|${options.exclude}`

    if(!/^\//.test(target)){
        target = `/var/www/html/${cdn}/${target}`
    }

    if(!target){
        console.log(`target must both defined`)
        return
    }

    if(!fs.existsSync(source)){
        fs.mkdirSync(source);
    }
    
    compiler.plugin('done', function(){
        var filelist = f.getdirlist(source);
        var formData = {};

        filelist.forEach(file => {
            formData[target + file.replace(source, '')] = fs.createReadStream(file);
        });

        request.post({ url: `http://${host}:3000`, formData: formData }, (error, res) => {
            if (error) {
              console.log(error);
            } else if (res.statusCode !== 200) {
              new Error(`remote server status error, code ${res.statusCode}`)
            } else {
              console.log(`Upload ${source} success`)
            }
        });
    })
}

module.exports = webpackUploadPlugin