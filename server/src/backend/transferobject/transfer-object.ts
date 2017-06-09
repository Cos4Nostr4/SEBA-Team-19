export class TransferObject{
    private data:any;

    private constructor(data:any){
        this.data = data;
    }

    public static aTransferObjectFor(data:any): TransferObject{
        return new TransferObject(data);
    }
}