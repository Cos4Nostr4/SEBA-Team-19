let mongoose = require('mongoose');
let Q = require("q");
mongoose.connect('mongodb://localhost:27017/beetoobee');

let sampleOffers = [
    {id: "1", title: "Bibi's Beauty Brom"},
    {id: "2", title: "Wood's super duper Shop"},
    {id: "3", title: "Flint's mega nega sore"},
    {id: "4", title: "Just a bag"},
    {id: "5", title: "Cooler bag"},
    {id: "6", title: "Even cooler bag"},
];


let Offer = mongoose.model('Offer', {id: String, title: String});
Offer.remove({}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Cleared Offer database");
    }
});

console.log("Loading sample offer in 'Offer' collection.");

let i = 0;
for (let offerData of sampleOffers) {
    let offer = new Offer(offerData);
    offer.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Stored Offer: " + JSON.stringify(offerData));
        }
        if (++i === sampleOffers.length) {
            process.exit();
        }
    })
}
