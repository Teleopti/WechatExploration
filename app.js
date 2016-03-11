"use strict";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const wechat = require('wechat');
const buildTracker = require("./retrive_build")

const register = require("./register");
const scheduleTracker = require("./request-schedule")

const port = 8000;
var app = express();

const config = {
    token: 'teleopti',
    appid: 'wx41acd111dfcdb644',
    // encodingAESKey: '4569d1d0c728ac284c1909e1f91c75a7'
};

// logging
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
    var ret = req.query.echostr;
    res.send(ret);
});

app.post("/", wechat(config, (req, res, next) => {
    console.log(req.weixin);

    if (req.weixin.EventKey === 'me' || req.weixin.Event === 'subscribe') {
        var name = register(req.weixin.FromUserName).name
        res.reply(`Hi, you are ${name}.`);
        return;
    }

     if (req.weixin.EventKey === 'schedule') {
        scheduleTracker(register(req.weixin.FromUserName).id).then(function(layers) {
            console.log('layers', layers)
            if (layers.length == 0) {
                res.reply("You don't have any schedule today.")
            } else {
                var message = "Your schedule for today:" + '\n----------------\n'
                message = message + layers.map( layer => layer.TitleTime + '  ' + layer.TitleHeader).join('\n')
                res.reply(message)
            }       
        })
    }


    if (req.weixin.EventKey === 'build') {
        buildTracker().then(function(failures) {

            if (failures.length == 0) {
                res.reply('All builds are successful!');
                return;
            }
            var buildResponse = '';
            var holder = {}
            failures.forEach(function(failure) {
                if (!holder[failure.$.buildTypeId]) 
                holder[failure.$.buildTypeId] = failure.$.buildTypeId.split("_", 2);               
            })
            
            var groups = {}
            
            Object.keys(holder).forEach((key) => {
                var value = holder[key];
                if (groups[value[0]]) {
                    groups[value[0]].push(value[1])
                } else {
                    groups[value[0]] = [value[1]]
                }                
            })
            
            buildResponse = Object.keys(groups).map((group) => {
                return '(G) ' + group + '\n-----------\n' +groups[group].map((_v, _i) => {
                    return _i + 1 + '. ' + _v;
                }).join('\n') + '\n';                          
            }).join('\n');
            
            
            res.reply('Failed Projects: \n' + buildResponse);
        })

    }



}));

app.listen(port, () => {
    console.log(`Server Started on ${port}`);
});