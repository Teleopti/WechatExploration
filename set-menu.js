'use strict'

const getAccessToken = require('./access-token')

const menu = {
    'button': [
        {
            type: 'click',
            name: 'Schedule',
            key: 'schedule'
        },
        {
            type: 'click',
            name: 'Build',
            key: 'build'
        },
        {
            type: 'click',
            name: 'Me',
            key: 'me'
        }
    ]
}

const https = require('https')

// const options = {
//     host: '',
//     path: ''
// }

// var req = https.request(options, res => {
//     res.setEncoding('utf8')
//     var data = ''
//     res.on('data', chunk => data += chunk)
//     res.on('end', () => console.log(data))
// })

// req.on('error', err => console.error(err))

// req.write(JSON.stringify(menu))
// req.end()

function setMenu(menu, accessToken) {
    return new Promise((resolve, reject) => {
        var option = {
            host: 'api.weixin.qq.com',
            path: `/cgi-bin/menu/create?access_token=${accessToken}`,
            method: 'POST'
        }
        var req = https.request(option, res => {
            res.setEncoding('utf8')
            var data = ''
            res.on('data', chunk => data += chunk)
            res.on('end', () => {
                try {
                    var ret = JSON.parse(data)
                    resolve(ret)
                } catch (err) {
                    reject(err)
                }
            })
        })
        req.on('error', err => reject(err))
        req.end(JSON.stringify(menu))
    })

}

function handleErr(err) {
    console.error(err)
}

getAccessToken().then(accessToken => {
    setMenu(menu,accessToken).then(result => {
        console.log(result)
    }, handleErr)
}, handleErr)
