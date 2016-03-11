
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
        'Cookie': 'TeleoptiIpAuth=9E271DECD28092AF84C033BDC9E47F9A6363D5CCD3D5B1D55D673BBF957339A8FC5B02278883B465DEB6B0F06E54517F236585FD313F14DD4191C65EC2C93A633DC6D856196BF8E23926F6F62CFEB7BF0DCCE90B; WfmAuth=44D586490E0382B3BDD00F0A1D5AA8E12F313074BC19EF5F5B2088464ECEA740EAD3C161E13A9CC1A768C89C85065CBF15A41705C26E8C89825E7F382A31B3571D81B8DEDFF08319DBF90D88250537C0ED7ED2881F530D46FCCE19EEDDD876AF548E0D654F74D128164C7EBB03735A49B1D839401AEF22B1A48504BE7C4733F506506B81D269C4F75EF66B67B1A320F303CA0DCA72E3FC480B0E8092DCF609775453E8889F72E9A2A61A38028C075506F8F483C02D3E941C634C93336BF99958EDF5F41F0DA6518B919678B961655CA8F3072279C2607B229C320B9D5732547E4FD041DFEFC04524B2FD27F1444D1E04AE53451DDEA9C536D5EC9486DAF49C0D40148E2C6331D0F93107788EF616130575D877E0C3E3BFDC4382459B2669FFE5EC687D850D4716CACF71E8978FB0C64042FA5867242A7A31D9B4903E586AA6A239EEC47E88FC2B68A36C07B281E289BB5383EC6CAB84E5222FFB68213C3CDDECBDECFF11DAA568459517144F1492F3481191E7FFA397C364FB0D537217798560CE04376B'
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