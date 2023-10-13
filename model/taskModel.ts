import mongoose from "mongoose";

interface iTask {
    task: string;
    email: string;
    priority: string;
}

interface iTaskData extends iTask , mongoose.Document{}

const taskModel= new mongoose.Schema(
    {
        task: {
            type: String,
        },
        priority: {
            type: String,
        },
         
    },{
        timestamps: true
    },
)

export default mongoose.model<iTaskData>("tasks", taskModel) 