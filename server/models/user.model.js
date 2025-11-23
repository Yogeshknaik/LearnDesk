import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "employee"],
        default: 'employee'
    },
    employeeId: {
        type: String,
        required: function() { return this.role === "employee"; },
    },
    competency: {
        type: String,
        required: function() { return this.role === "employee"; }
    },
    photoUrl: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
