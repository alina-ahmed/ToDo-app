import * as mongodb from "mongodb";

export interface Task {
    title: string;
    detail: string;
    status: string;
    icon: string;
    statusIcon: string[];
    _id?: mongodb.ObjectId;
}