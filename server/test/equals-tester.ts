export function expectEqualityOf(object1: any, object2: any) {
    let jsonObject1 = JSON.stringify(object1);
    let jsonObject2 = JSON.stringify(object2);
    expect(jsonObject1).toEqual(jsonObject2);
}