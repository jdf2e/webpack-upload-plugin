var client = require('scp2')
var fs = require('fs')

function webpackUploadPlugin(options){
    this.options = options
}

webpackUploadPlugin.prototype.apply = function(compiler){
    var options = this.options
    var source = process.cwd()
    var target = options.target
    var username = options.username
    var password = options.password
    var host = options.host
    var exclude = options.exclude || `.DS_Store|.babelrc|.git|node_modules|${options.exclude}`

    if(!/^\//.test(target)){
        target = `/var/www/html/page.jd.com/${target}`
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
                client.close()
            }else{
                filelist.forEach(function(filepath){
                    if(!new RegExp(exclude).exec(filepath)){
                        client.scp(`${source}/${filepath}`, `${username}:${password}@${host}:${target}/${filepath}`, function(error){
                            if(error){
                                console.log(error)
                            }else{
                                console.log(`Upload ${source}/${filepath} success`)
                                client.close()
                            }
                        });
                    }
                })
            }
        })
    })
}

module.exports = webpackUploadPlugin