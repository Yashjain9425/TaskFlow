import mongoose from 'mongoose';

const groupTaskSchema = new mongoose.Schema({
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
        type: Date
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
}, { timestamps: true });

const GroupTask = mongoose.models.GroupTask || mongoose.model('GroupTask', groupTaskSchema);
export default GroupTask;
