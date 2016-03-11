const request = require('request')
const parseString = require('xml2js').parseString

module.exports = () => {
    return new Promise((resolve, reject) => {
        request('http://devbuild01/guestAuth/app/rest/builds', function(error, response, body) {

            parseString(body, function(err, result) {
                if(err){
                    reject(err);
                    return ;
                }
                var builds = result.builds.build
                var failures = builds.filter(function(build) {
                    return build.$.status == 'FAILURE'
                })
                resolve(failures);
            })
        })
    })
}