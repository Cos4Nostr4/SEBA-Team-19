export default class UUID {
    private value: string;


    constructor() {
        this.value = this.createNewOne();
    }

    public static createNew(): UUID {
        return new UUID();
    }

    public asStringValue(): string {
        return this.value;
    }

    private createNewOne(): string {
        let r4 = this.generateRandom4CharLongPart;
        return r4() + r4() + r4() + r4() + r4() + r4() + r4() + r4();
    }

    private generateRandom4CharLongPart(): string {
        let part = Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substr(1);
        return part;
    }
}