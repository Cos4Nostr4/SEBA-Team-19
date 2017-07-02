import {resetDatabase} from "./database-reset";

(async function () {
    await resetDatabase({log: true});
    process.exit(0);
})();