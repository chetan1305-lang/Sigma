const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require(jsowebtoken);
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },

    lastName: {
        type: String
    },

    email: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address" + value)
            }
        }
    },

    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter strong password " + password)
            }
        }
    },

    phone: {
        type: Number,
        required: true,
    },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' },
});

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({_id: user._id}, "Test@123", {expiresIn: "2d"});

    return token;
}

const User = mongoose.model("User", userSchema)

module.exports = User;