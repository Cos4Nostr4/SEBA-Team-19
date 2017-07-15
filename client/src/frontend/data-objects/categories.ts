export enum Categories{
    NEW, JEWELRY, FITNESS, MAKE_UP, CLOTHES, ACCESSORY, OTHERS, HEARTS, AREA
}


export function getUserSelectableCategories():string[]{
    return ["Jewelry", "Fitness", "Make_up", "Clothes", "Accessory", "Others"];
}

export class CategoryMapper{

    public static forId(id:number): string{
        switch (id){
            case 0: return Categories[Categories.NEW];
            case 1: return Categories[Categories.JEWELRY];
            case 2: return Categories[Categories.FITNESS];
            case 3: return Categories[Categories.MAKE_UP];
            case 4: return Categories[Categories.CLOTHES];
            case 5: return Categories[Categories.ACCESSORY];
            case 6: return Categories[Categories.OTHERS];
            case 7: return Categories[Categories.HEARTS];
            case 8: return Categories[Categories.AREA];
        }
        return Categories[Categories.NEW]
    }
}
