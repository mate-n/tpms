import * as assert from 'assert';
import fetch from 'node-fetch';

export class Comparer {
    mockServiceApiUrl = 'https://a814abe0-9efd-486e-9497-214009910f81.mock.pstmn.io/';
    async compareApiResponses(url, body) {
        const response1 = await fetch(this.mockServiceApiUrl + url, { method: "POST", body: body });
        const response2 = await fetch(this.mockServiceApiUrl + url, { method: "POST", body: body });
        const firstJson = await response1.json();
        const secondJson = await response2.json();
        this.compareJsons(firstJson, secondJson);
    };

    compareJsons(firstJson, secondJson) {
        assert.equal(JSON.stringify(firstJson), JSON.stringify(secondJson));
    }
}
