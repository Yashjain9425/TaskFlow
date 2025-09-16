import React, { useState } from "react";
import axios from "axios";

export default function CreateGroupForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([{ user: "", role: "member" }]);

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addMember = () => {
    setMembers([...members, { user: "", role: "member" }]);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/groups/gp", {
        name,
        description,
        members
      });
      alert("Group created successfully!");
      setName("");
      setDescription("");
      setMembers([{ user: "", role: "member" }]);
    } catch (err) {
      console.error(err);
      alert("Error creating group");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Create Group</h2>

      <label className="block mb-2">
        Group Name:
        <input
          type="text"
          className="w-full border px-2 py-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="block mb-2">
        Description:
        <textarea
          className="w-full border px-2 py-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <h3 className="mt-4 mb-2 font-semibold">Members</h3>
      {members.map((member, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="User ID"
            className="flex-1 border px-2 py-1"
            value={member.user}
            onChange={(e) => handleMemberChange(index, "user", e.target.value)}
            required
          />
          <select
            className="border px-2 py-1"
            value={member.role}
            onChange={(e) => handleMemberChange(index, "role", e.target.value)}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          {members.length > 1 && (
            <button
              type="button"
              onClick={() => removeMember(index)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              X
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addMember}
        className="px-2 py-1 bg-blue-500 text-white rounded"
      >
        + Add Member
      </button>

      <button
        type="submit"
        className="w-full mt-4 bg-green-600 text-white py-2 rounded"
      >
        Create Group
      </button>
    </form>
  );
}
