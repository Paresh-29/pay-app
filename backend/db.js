const mongoose  = require("mongoose");
const { Schema } = require("zod");
const bcrypt = require("bcrypt");

mongoose.connect("mongodb+srv://pareshkumarbarick99:w2ijv3i03GBlkDFA@cluster0.gzdrjh0.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },

});

//Methods to generate a hash from plain text
userSchema.methods.createHash = async function (plainTextPasswprd) {

    //Hashing user's salt and pass with 10 iterations,
    const saltRound  = 10;
    
    //First method to generate a salt and then create hash
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(plainTextPasswprd, salt);

    //second method - or we can create salt and hash in a single method also
    //return await bcrypt.hash(plainTextPassword, saltRound);

    //validating the candidate password with stored hash and hash function
    userSchema.methods.validatePassword = async function (candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password)
    }

}

const accountSchema  = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId, // reference to user model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema)

module.exports = {
    User,
    Account
}