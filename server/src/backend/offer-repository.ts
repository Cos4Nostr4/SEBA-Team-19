import {Offer} from "../../../client/src/frontend/offer-list-view/offer";

export class OfferRepository{


    constructor() {
    }

    public getAllOffer(): Offer[]{
        let offer: Offer[] = [
            {'id': 1, 'title':"arnolf"},
            {'id': 2, 'title':"bertram"},
            {'id': 3, 'title':"caspar"},
            {'id': 3, 'title':"detlef"},
        ];

        return offer;
    }
    //TODO: replace by find with es6
    public getOfferWithId(id: number) {
        let allOffer: Offer[] = this.getAllOffer();
        let offer: Offer = this.findOfferWithId(allOffer, id);
        return offer;
    }

    private findOfferWithId(allOffer: Offer[], id: number):Offer {
        for (let offer of allOffer){
            if(offer.id == id){
                return offer;
            }
        }
        throw new Error("No Offer with id '"+id+"' found");
    }
}