
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Connect to MongoDB
mongoose.connect("mongodb+srv://pareshkumarbarick99:w2ijv3i03GBlkDFA@cluster0.gzdrjh0.mongodb.net/paytm", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Database connected successfully'))
.catch((error) => console.error('Database connection error:', error));

// Define User Schema
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
    }
});

// Method to generate a hash from plain text
userSchema.methods.createHash = async function(plainTextPassword) {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(plainTextPassword, salt);
};

// Method to validate the candidate password with stored hash
userSchema.methods.validatePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Define Account Schema
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // reference to user model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

// Create User and Account models
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

// Export the models
module.exports = {
    User,
    Account
};
