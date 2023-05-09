import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        maxlength: [100, 'Task title cannot exceed 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Task description is required'],
        trim: true,
        maxlength: [1000, 'Task description cannot exceed 1000 characters'],
    },
    startDate: {
        type: Date,
        required: [true, 'Task start date is required'],
        min: [Date.now(), 'Task start date cannot be in the past'],
    },
    endDate: {
        type: Date,
        required: [true, 'Task end date is required'],
        validate: {
            validator: function (value) {
                return value >= this.startDate;
            },
            message: 'Task end date must be after task start date',
        },
    },
    status: {
        type: String,
        enum: ['Not started', 'In progress', 'Completed'],
        default: 'Not started',
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Task assignee is required'],
    },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
