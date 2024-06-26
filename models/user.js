// models/user.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['teacher', 'student'], required: true },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // For students
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // For teachers
    profilePhoto: { type: String },// Add profilePhoto field to store the path to the profile photo
    schoolName: { type: String, required: function() { return this.userType === 'student'; } }, // Only for students
    degree: { type: String, required: function() { return this.userType === 'student'; } }, // Only for students
    dob: { type: Date, required: true }, // Only for students
    yearOfCompletion: { type: Number, required: function() { return this.userType === 'student'; } },// Only for students
    placeOfWork: { type: String, required: function() { return this.userType === 'teacher'; } }, // Only for teachers
    jobProfile: { type: String, required: function() { return this.userType === 'teacher'; } }, // Only for teachers
    yearOfExperience: { type: Number, required: function() { return this.userType === 'teacher'; } }, // Only for teachers
    identityCard: { type: String } // Only for teachers, store the path to the identity card
});

module.exports = mongoose.model('User', UserSchema);
