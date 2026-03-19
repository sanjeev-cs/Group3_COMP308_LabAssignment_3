// Define user model using Mongoose

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Create user schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: 'Email is required',
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: 'Password is required',
        minlength: 6
    },
    avatarImage: {
        type: String, // Can store JSON config for 3D avatar (colors, styles, etc)
        default: '{}'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    // Reference to the Games collection
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
  }]
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Pre-save hook to hash passwords before saving to DB
UserSchema.pre('save', async function() {
    // only hash if the password is new or modified
    if(!this.isModified('password')) return;

    try {
        // Genreate salt for password hashing
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        console.error('Bcrypt Hashing Error:', err);
        throw err;
    }
});

// Method to compare entered password with hashed password in DB
UserSchema.methods.comparePassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

// Hide sensitive fields when converting to JSON
UserSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password; // Remove password
    return obj;
}

export default mongoose.model('User', UserSchema);