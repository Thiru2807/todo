const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require("./database");
const crypto = require('crypto');

const app = express();

app.use(express.json());
app.use(cors());
const router = express.Router();
const SECRET_KEY = crypto.randomBytes(32).toString('hex');

//Registration
router.post("/signup", async (req, res) => {
    try {
        const name = req.body['user_name'];
        const phoneNumber = req.body['phone_number'];
        const email = req.body['email'];
        const password = req.body['password']
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await pool.query(
            `INSERT INTO public.users (user_name, phone_number, email, password)
         VALUES ($1, $2, $3, $4) RETURNING *;`,
         [name, phoneNumber, email, hashedPassword]
        )
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        const user = result.rows[0];
        // console.log('User',user);
        if (!user) {
            return res.status(400).json(
                {
                    message: 'Invalid Credentials'
                }
            );
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json(
                {
                    message: 'Password is not correct'
                }
            );
        }

        const token = jwt.sign(
            {
                userId: user.user_id,
            }, 
            SECRET_KEY, {
            expiresIn: '1h'
        });
        res.json({ token });
    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

function verifyToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Missing Token" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed :", error.message);
        res.status(401).json({ message: 'Invalid token' });
    }
}

router.get("/user", verifyToken, (req, res) => {
    res.json({ user: req.user });
});

router.get("/user/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE user_id = $1",
            [userId]
        );
        const user = result.rows[0];
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
