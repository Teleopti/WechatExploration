
const https = require('https')
const merge = require('merge')

var defaultOption = {
    hostname: 'teleoptiwfm-demo.teleopticloud.com',
    port: 443,
    path: '/Web/MyTime/TeamSchedule/TeamSchedule',
    method: 'POST',
    headers: {
        "Accept": 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/json;charset=UTF-8',
        'Content-Length': null,
        'Cookie': 'TeleoptiIpAuth=D1D1A3A7A0BFFC0579F18C4C5A7DF8E66AAB9998AB63DB823521478D77964DDF208A7D1C5A9B064C01E642256C51DCB3040FF88ADE8827ABF87B6552EE697F3173958CCF326F7E90954264871DD1E9E48CCD3331; WfmAuth=9BA8EF234182BB7177292FA4C5993864AE4E03F8FDFD413497EEBCA59C9458A996CE8B2ECDB9F95020ED8E7CDABF43604622A8E62C9D243EDD220296E3DA86B17ECA2F7133BAD20E75B82A7EFF2CAB129DE975195172037B5BAFD092782F36EB362E2E5E393354EC3525CC9DE95EB849AEE4DF3F1936B25658E254BF9FD182F0AE37DD263213A66508E2302174DFE5BA1D8D92CE6B04D7DF7CC8B91D845C0BDE26F6FF2BE81B61B16F5BEBE698C3BFD44EEE1FA1BA81D73755F34BC71385BE5D5F853396BA71C5466F24E1FA361C1E4623C64D3C7B3A15625D28F18B113E94FFE31C910079A2F7E55607C48920B2706D6C7376EDDC4910C7AFF68951F151692957C9C1289A392311BAC7EDEDF677874FB52C2C715A8C948893FD09C6BF80AF974C38A1CB99187525C90571E220A83F8C116EFA879BFC3F75080EB9AFFAA517CEE54CD991972B99246A39216D6895C86834A23E5AD9436245F5403D7F5A2637D5F36C9D937F1A41A0EA3F7F974C6D015ED014E5C67B41F39DECA49BFE8E5D15B4DEFAFF3D'
    }
};

function makePostData(campaign) {
    var data = JSON.stringify(campaign);
    return {
        string: data,
        length: data.length
    };
}

function makeOption(defaultOption, data) {
    var option = merge(true, defaultOption);
    option.headers['Content-Length'] = data.length 
    return option;
}


const postData = {
    Skip: 0,
    Take: 20,
    TimeSortOrder: null,
    filteredEndTimes: "",
    filteredStartTimes: "",
    isDayOff: false,
    selectedDate: "2016-03-11",
    teamIds: "34590a63-6331-4921-bc9f-9b5e015ab495"
}




module.exports = (agentId) => {
       
    return new Promise((resolve, reject) => {

        var data = makePostData(postData);
        var options = makeOption(defaultOption, data);

       
        var req = https.request(options, function(res) {

            var data = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                data += chunk;               
            });
            res.on('end', function() {
                try {
                   
                    var decoded = JSON.parse(data);
                                    
                    var agentSchedules = decoded.AgentSchedules.filter(as => {return as.PersonId == agentId }  );                       
                    if (agentSchedules.length > 0) {
                        resolve(agentSchedules[0].ScheduleLayers)
                    } else {
                        resolve([])
                    }                    
                    
                } catch (e) {
                    reject(e)
                }                
            })
        });

        req.on('error', function(e) {
            reject(e)
        });

        req.write(data.string);
        req.end();        
    })
}