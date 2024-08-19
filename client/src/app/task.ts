// export interface Task {
//     "title":string,
//     "description": string,
//     "status":string,
//     "icon": string,
//     "statusIcon": string[]
// }

// import * as mongodb from "mongodb";

export interface Task {
    title: string;
    detail: string;
    status: string,
    icon: string;
    statusIcon: string[];
    _id?: string;
}
