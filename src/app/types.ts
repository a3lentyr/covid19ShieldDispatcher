
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
    printEstimateDate: string;
    deliveryBy: string;
    deliveryWhere: string;
    deliveryWhereLong: number;
    deliveryWhereLat: number;
    logHistory: Array<any>;
    comment: string;
}
