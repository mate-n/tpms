import { Comparer } from "./Comparer.js";
const comparer = new Comparer();

async function compareResponses() {
    try {
        await comparer.compareApiResponses('?lookup&email=gert@ankerdata2.co.za', {});
        await comparer.compareApiResponses('?read', {
            "email": "gert@ankerdata1.co.za",
            "personno": "585"
        });
    } catch (e) {
        console.log(e)
        throw e;
    }
}

compareResponses();
