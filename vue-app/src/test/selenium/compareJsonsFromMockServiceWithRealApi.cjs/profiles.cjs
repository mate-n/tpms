const comparer = require("./comparer.cjs");

async function compareResponses() {
    await comparer.compareApiResponses('?lookup&email=gert@ankerdata2.co.za', {});
    await comparer.compareApiResponses('?read', {
        "email": "gert@ankerdata1.co.za",
        "personno": "585"
    });
}

compareResponses();
