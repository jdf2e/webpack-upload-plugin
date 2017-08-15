var client = require('scp2')
var fs = require('fs')
var glob = require('glob')

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

    var filelist = fs.readdirSync(source)
    compiler.plugin('done', function(){
        client.defaults({
            username: username,
            password: password,
            host: host
        })

        glob(source, {}, function(error, files){
            client.scp(files[0], `${username}:${password}@${host}:${target}/${options.source}`, function(error){
                if(error){
                    console.log(error)
                }else{
                    console.log(`Upload ${source} success`)
                    client.close()
                }
            })
        })
    })
}

module.exports = webpackUploadPlugin