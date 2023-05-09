import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true,
        maxlength: [100, 'Project name cannot exceed 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true,
        maxlength: [1000, 'Project description cannot exceed 1000 characters'],
    },
    startDate: {
        type: Date,
        required: [true, 'Project start date is required'],
        min: [Date.now(), 'Project start date cannot be in the past'],
    },
    endDate: {
        type: Date,
        required: [true, 'Project end date is required'],
        validate: {
            validator: function (value) {
                return value >= this.startDate;
            },
            message: 'Project end date must be after project start date',
        },
    },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    }],
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;
