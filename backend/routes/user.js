const express = require("express")

const zod = require("zod");
const { User, Account } = require("../db")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config")
const router = express.Router();
const { authMiddleware } = require("../middleware")
// signUp and signin routes

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})
router.post("/signup", async(req, res) => {

    const { success, data } = signupSchema.safeParse(req.body);
    if(!success) {
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const { username, password, firstName, lastName } = data;

    try {

        //checking for user exists
        const existingUser = await User.findOne({
            username: req.body.username
        })
    
        if(existingUser) {
            return res.status(411).json({
                message: "Email already taken/Incorrect inputs"
            })
        }

        //hash password
        const hashPassword = await bcrypt.hash(password, 10);

        //create the user with hashed password
        const user = await User.create({
            username,
            password: hashPassword,
            firstName,
            lastName
        });

        const userId = user._id;
        /// ---Create new account------

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })

        /// ----  -----

        const token = jwt.sign({userId}, JWT_SECRET);

        res.json({
            message: "User Created Succesfully",
            token
        });
    } catch(error) {
        console.error("Error during signup:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }

    // const user = await User.create({
    //     username: req.body.username,
    //     password: req.body.password,
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName
    // })


    // const token = jwt.sign({userId}, JWT_SECRET)
    // res.json({
    //     message: "User Created successfully",
    //     token: token
    // })

});

    // Schema for signin request body validation
    const signinSchema = zod.object({
        username: zod.string().email(),
        password: zod.string()
    })

    router.post("/signin", async(req, res) => {
        const { success, data } = signinSchema.safeParse(req.body)

        if(!success) {
            return res.status(411).json({
                message: "Incorrect input"
            })
        }

        const { username, password } = data;

    try {
        const user = await User.findOne({ username });

        if(!user) {
            return res.status(411).json({
                message: "Invalid username or password"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            return res.status(411).json({
                message: "Invalid Username or Password"
            });
        }

            const token = jwt.sign({userId: user._id}, JWT_SECRET)

            res.json({ token });

    } catch (error) {
        console.error("Error during signin:", error);
            res.status(500).json({
                message: "Internal server error"
            });
    }
    });

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})
router.put("/", authMiddleware, async(req, res) => {
    const { success } = updateSchema.safeParse(req.body);

    if(!success) {
        return res.status(401).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Update successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or : [{
            firstName: {
                "$regex" : filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;