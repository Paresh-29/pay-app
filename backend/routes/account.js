const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

// router.get('/balance', authMiddleware, async (req, res) => {
//     const account = await Account.findOne({
//         userId: req.userId
//     });

//     res.json({
//         balance: account.balance
//     })
// })

// router.get('/balance', authMiddleware, async (req, res) => {
//     try {
//         const account = await Account.findOne({
//             userId: req.userId
//         });

//         if (!account) {
//             return res.status(404).json({ error: 'Account not found' });
//         }

//         res.json({
//             balance: account.balance
//         });
//     } catch (error) {
//         console.error("Error fetching account balance:", error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.get('/balance', authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        res.json({ balance: account.balance });
    } catch (error) {
        console.error("Error fetching account balance:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    //fetch account withing the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if(!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    //Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount} }).session(session);
    await Account.updateOne({ userId: to }, {$inc: {balance: amount} }).session(session);

    //commit the transaction
    await session.commitTransaction();

    res.json({
        message: "Transaction Successfull"
    })
})

module.exports = router;