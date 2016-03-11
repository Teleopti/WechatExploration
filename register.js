const agent_pool = [
    { id: "b46a2588-8861-42e3-ab03-9b5e015b257c", name: "Jon137577" },
    { id: "fdb75a4e-5765-4857-b213-9b5e015b2564", name: "Juancho137569" },
    { id: "11610fe4-0130-4568-97de-9b5e015b2564", name: "Ashley137545" },
    { id: "47a3d4aa-3cd8-4235-a7eb-9b5e015b2560", name: "John209" },
    { id: "9d42c9bf-f766-473f-970c-9b5e015b2564", name: "Prashant137547" },
    { id: "3d22db90-e3ec-4a53-bb48-a53f00ddd3e7", name: "TestTest_SF" },
    { id: "c6f70353-3a79-47b4-b64f-a476011500d5", name: "HarryBPS_002" },
    { id: "625295cf-9b4c-4915-ba66-9b5e015b257c", name: "Robert137542" },
    { id: "b0e35119-4661-4a1b-8772-9b5e015b2564", name: "Pierre137567" },
    { id: "88be31b0-9c70-4076-9743-9b5e015b2577", name: "John137618" },
    { id: "94329a0e-b3c5-4b1f-beb9-9b5e015b2564", name: "Stephen137626" },
    { id: "58350881-996a-4563-adc2-a476011501a7", name: "MaikeBPS_003" },
    { id: "164abe5d-ce1a-48ee-ba3a-9b5e015b2585", name: "Dmitry137611" }]

const assignments = {}

module.exports = openid => {
    if (assignments[openid] === undefined) {
        var idx = Math.floor(Math.random() * agent_pool.length);
        assignments[openid] = agent_pool[idx];
    }
    return assignments[openid];
}

