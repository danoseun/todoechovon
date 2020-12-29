import mongoose from 'mongoose';
const { Schema } = mongoose;

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

export const Todo = mongoose.model('todo', TodoSchema);