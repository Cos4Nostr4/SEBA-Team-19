import {resetDatabase} from "./database-reset";
import {resetMedia} from "./reset-media";

(async function () {
    await resetDatabase({log: true});
    await resetMedia(({log: true}));
    process.exit(0);
})();