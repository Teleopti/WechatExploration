const request = require('request')
const parseString = require('xml2js').parseString

module.exports = (failure) => {
    
    var url = 'http://devbuild01' +failure.$.href        
     
    return new Promise((resolve, reject) => {
        request(url, function(error, response, body) {
            parseString(body, function(err, result) {
                if(err){
                    reject(err);
                    return ;
                }
                
                var author = result.build.lastChanges[0].change[0].$.username.replace(/<.*>/, '').trim()                          
                resolve(author);
            })
        })
    })
}
