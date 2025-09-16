import GroupTask from "../models/groupTaskModel.js";
import Group from "../models/groupModel.js";

// CREATE GROUP TASK
export const createGroupTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, completed, assignedTo, groupId } = req.body;

        const group = await Group.findOne({ _id: groupId, members: req.user.id });
        if (!group) return res.status(404).json({ success: false, message: "Group not found or you're not a member" });

        const task = new GroupTask({
            title,
            description,
            priority,
            dueDate,
            completed: completed === 'Yes' || completed === true,
            group: groupId,
            assignedTo
        });

        const saved = await task.save();
        res.status(201).json({ success: true, task: saved });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// GET ALL TASKS FOR GROUP
export const getGroupTasks = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const group = await Group.findOne({ _id: groupId, members: req.user.id });
        if (!group) return res.status(404).json({ success: false, message: "Group not found or you're not a member" });

        const tasks = await GroupTask.find({ group: groupId }).populate("assignedTo", "name email");
        res.json({ success: true, tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// GET SINGLE GROUP TASK
export const getGroupTaskById = async (req, res) => {
    try {
        const task = await GroupTask.findById(req.params.id).populate("assignedTo", "name email");
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

        const group = await Group.findOne({ _id: task.group, members: req.user.id });
        if (!group) return res.status(403).json({ success: false, message: 'Access denied' });

        res.json({ success: true, task });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// UPDATE GROUP TASK
export const updateGroupTask = async (req, res) => {
    try {
        const task = await GroupTask.findById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

        const group = await Group.findOne({ _id: task.group, members: req.user.id });
        if (!group) return res.status(403).json({ success: false, message: 'Access denied' });

        const updated = await GroupTask.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json({ success: true, task: updated });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// DELETE GROUP TASK
export const deleteGroupTask = async (req, res) => {
    try {
        const task = await GroupTask.findById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

        const group = await Group.findOne({ _id: task.group, members: req.user.id });
        if (!group) return res.status(403).json({ success: false, message: 'Access denied' });

        await task.deleteOne();
        res.json({ success: true, message: 'Group task deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
