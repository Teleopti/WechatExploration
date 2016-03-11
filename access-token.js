'use strict'

const https = require('https')
const APPID = 'wx41acd111dfcdb644'
const APPSECRET = '4569d1d0c728ac284c1909e1f91c75a7'
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`


module.exports = () => {
    return new Promise((resolve, reject) => {
        var req = https.get(URL, res => {
            res.setEncoding('utf8')
            var data = ''
            res.on('data', chunk => data += chunk)
            res.on('end', () => {
                try {
                    var ret = JSON.parse(data)
                    resolve(ret.access_token)
                } catch (err) {
                    reject(err)
                }
            })
        })

        req.on('error', err => reject(err))
        
    });
}