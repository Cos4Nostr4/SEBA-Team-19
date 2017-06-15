export class ApiObject{
    private _id: Number;
    private _content: String;


    constructor(id: Number, content: String) {
        this._id = id;
        this._content = content;
    }


    get id(): Number {
        return this._id;
    }

    get content(): String {
        return this._content;
    }
}