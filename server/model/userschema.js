const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const hashing = require("bcrypt")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    
})

//Password Hashing

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hashing.hash(this.password, 12);
        this.cpassword = await hashing.hash(this.password, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('DATAS', userSchema);

module.exports = User;