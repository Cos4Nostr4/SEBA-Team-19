export class TransferObject{
    private data:any;
    private error:any;

    private constructor(data:any, error:any){
        this.data = data;
        this.error = error;
    }

    public static aTransferObjectFor(data:any): TransferObject{
        return new TransferObject(data, null);
    }

    public static aTransferObjectForError(error:any): TransferObject{
        return new TransferObject(null, error);
    }
}