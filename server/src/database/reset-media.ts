const fs = require('fs');
var path = require("path");

const PRODUCTS_PATH = "media/products";
const SAMPLE_PRODUCTS_PATH = "products";


export async function resetMedia(printLog?: any) {
    let mediaPath = path.join(__dirname, '../', PRODUCTS_PATH);
    let sampleProducts = path.join(__dirname, SAMPLE_PRODUCTS_PATH);

    await clearUploads(mediaPath, printLog);
    await copySampleProducts(sampleProducts, mediaPath, printLog);
}

function clearUploads(pathToClear: any, printLog?: any): Promise<boolean> {
    if (printLog) {
        console.log("Clearing all files in " + pathToClear);
    }
    const deletionPromise = new Promise(resolve => {
        fs.readdir(pathToClear, (err: any, files: any) => {
            if (err) {
                console.log(err.toString());
            }
            else {
                let numberOfFiles = files.length;
                if (numberOfFiles.length == 0) {
                    resolve(true);
                }
                let filesDeleted = 0;
                files.forEach((file: any) => {
                    let filePath = pathToClear + "/" + file;
                    fs.unlink(filePath, (err: any) => {
                        if (err) {
                            console.log(err.toString());
                        } else {
                            if (++filesDeleted == numberOfFiles) {
                                if (printLog) {
                                    console.log("Deleted "+filesDeleted+"file");
                                }
                                resolve(true);
                            }
                        }
                    });
                });
            }
        });
    });
    return deletionPromise;
}

function copySampleProducts(inputDir: any, outputDir: any, printLog?: any) {
    if (printLog) {
        console.log("Copying all files from " + inputDir + " to " + outputDir);
    }
    const copyingPromise = new Promise(resolve => {
        fs.readdir(inputDir, (err: any, files: any) => {
            if (err) {
                console.log(err.toString());
            }
            else {
                let numberOfFiles = files.length;
                if (numberOfFiles.length == 0) {
                    resolve(true);
                }
                let filesCopied = 0;
                files.forEach((file: any) => {
                    let source = inputDir + "/" + file;
                    let target = outputDir + "/" + file;
                    let rd = fs.createReadStream(source);
                    rd.on("error", function (err:any) {
                        console.log(err);
                    });

                    let wr = fs.createWriteStream(target);
                    wr.on("error", function (err:any) {
                        console.log(err);
                    });
                    wr.on("close", function (ex:any) {
                        if(++filesCopied == numberOfFiles){
                            if(printLog){
                                console.log("Copied "+filesCopied+" files");
                            }
                            resolve(true);
                        }
                    });
                    rd.pipe(wr);
                });
            }
        });
    });
    return copyingPromise;
}