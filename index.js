var client = require('scp2')
var fs = require('fs')

function webpackUploadPlugin(options){
    this.options = options
}

webpackUploadPlugin.prototype.apply = function(compiler){
    var options = this.options
    var source = options.source
    var target = options.target
    var username = options.username
    var password = options.password
    var host = options.host
    var exclude = '.DS_Store|.babelrc|node_modules'

    if(!/^\//.test(target)){
        target = `/var/www/html/page.jd.com/${target}`
    }

    if(!source){
        source = process.cwd()
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

        client.mkdir(target, function(error){
            if(error){
                console.log(error)
            }else{
                filelist.forEach(function(filepath){
                    if(!new RegExp(exclude).exec(filepath)){
                        client.scp(`${source}/${filepath}`, `${username}:${password}@${host}:${target}/${filepath}`, function(error){
                            if(error){
                                console.log(error)
                            }else{
                                console.log(`Upload ${source}/${filepath} success`)
                            }
                        });
                    }
                })
            }
        })
    })
}

module.exports = webpackUploadPlugin