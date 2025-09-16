import Group from "../models/groupModel.js";

// CREATE GROUP
export const createGroup = async (req, res) => {
    try {
        const { name, description, members } = req.body;
        const group = new Group({
            name,
            description,
            members: members ? [...new Set([req.user.id, ...members])] : [req.user.id],
            createdBy: req.user.id
        });
        const saved = await group.save();
        res.status(201).json({ success: true, group: saved });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// GET ALL GROUPS FOR LOGGED-IN USER
export const getGroups = async (req, res) => {
    try {
        const groups = await Group.find({ members: req.user.id }).populate("members", "name email");
        res.json({ success: true, groups });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// GET GROUP BY ID
export const getGroupById = async (req, res) => {
    try {
        const group = await Group.findOne({ _id: req.params.id, members: req.user.id })
            .populate("members", "name email");
        if (!group) return res.status(404).json({ success: false, message: 'Group not found' });
        res.json({ success: true, group });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ADD MEMBER TO GROUP
export const addMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const group = await Group.findOne({ _id: req.params.id, createdBy: req.user.id });
        if (!group) return res.status(404).json({ success: false, message: 'Group not found or not yours' });

        if (!group.members.includes(userId)) {
            group.members.push(userId);
            await group.save();
        }
        res.json({ success: true, group });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// REMOVE MEMBER FROM GROUP
export const removeMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const group = await Group.findOne({ _id: req.params.id, createdBy: req.user.id });
        if (!group) return res.status(404).json({ success: false, message: 'Group not found or not yours' });

        group.members = group.members.filter(m => m.toString() !== userId);
        await group.save();
        res.json({ success: true, group });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// DELETE GROUP
export const deleteGroup = async (req, res) => {
    try {
        const deleted = await Group.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
        if (!deleted) return res.status(404).json({ success: false, message: 'Group not found or not yours' });
        res.json({ success: true, message: 'Group deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
