const assert = require("assert");
const fetch = require("node-fetch-commonjs")

const mockServiceApiUrl = 'https://8a19e9a8-5ea9-4602-bae7-7d1e0c1e2fe8.mock.pstmn.io/';
const actualApiUrl = 'https://api.example.com/';

async function compareApiResponses(url, body) {
    const response1 = await fetch(mockServiceApiUrl + url, { method: "POST", body: body });
    const response2 = await fetch(mockServiceApiUrl + url, { method: "POST", body: body });

    const firstJson = await response1.json();
    const secondJson = await response2.json();

    compareJsons(firstJson, secondJson);
};

function compareJsons(firstJson, secondJson) {
    assert.equal(JSON.stringify(firstJson), JSON.stringify(secondJson));
}


module.exports = {
    mockServiceApiUrl,
    compareApiResponses,
    compareJsons,
};
