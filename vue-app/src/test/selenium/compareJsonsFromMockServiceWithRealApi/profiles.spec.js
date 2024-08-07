import { Comparer } from "./Comparer.js";
import process from 'process'

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
        process.exit(1);
    }
}

compareResponses();
