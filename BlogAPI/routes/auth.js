import { Router } from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";

const router = Router();


router.get('/users', async (req, res) => {
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
});

router.post('/register', async (req, res) => {
    const {email, password} = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await pool.query("INSERT INTO users (email, password) VALUES($1, $2) RETURNING *", [email, hashedpassword]);
    res.status(201).json(user.rows[0]);
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if(!user) return res.status(404).json({msg: "user not found"});

    const match = await bcrypt.compare(password, user.password);
    if(!match){
        res.status(401).json({msg: "Wrong credentials"});
    } else {
        res.status(201).json({msg: `Welcome ${user.id}`})
    }
})

export default router