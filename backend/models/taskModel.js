import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    dueDate: {
        type: Date,
    },

    // Task owner (for personal tasks)
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // For group tasks
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },

    // Assigned members (optional, for subgroup inside group)
    assignees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Ensure either 'owner' or 'group' is set
taskSchema.pre('save', function (next) {
    if (!this.owner && !this.group) {
        return next(new Error('Task must have either an owner or a group.'));
    }
    next();
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task;
