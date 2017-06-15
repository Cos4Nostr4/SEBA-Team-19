let mongoose = require('mongoose');
let Q = require("q");
let sampleOffers = require('./sample_offers.json');


mongoose.connect('mongodb://localhost:27017/beetoobee');


let Offer = mongoose.model('Offer',
    {
        id: String,
        title: String,
        description: String,
        image: String,
        company: String,
        amount: Number,
        requiredNumberOfFollowers: Number,
        enforcedHashTags: [String],
        startDate: Date,
        endDate: Date,
        requests: [String],
        stillRunning: Boolean,
    }
);


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
