
export interface DialogData {
    demandId: string;
    forWho: string;
    forWhere: string;
    forWhereLong: number;
    forWhereLat: number;
    description: string;
    howMany: number;
    model: string;
    status: number;
    printBy: string;
    deliveryBy: string;
    logHistory: Array<any>;
    comment: string;
}
