import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'


const router = express.Router()

router.post('/userlogin', (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ? and password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" })
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
            { role: "user", email: email }, 
            "jwt_secret_key", 
            { expiresIn: '1d' }
        );
        res.cookie('token', token)
        return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error: "Invalid email or password" });
    }
});
});

router.post('/add_task', (req, res) => {
    const sql = "INSERT INTO tasks \
    (`TaskName`,`StartDate`,`DueDate`, `SupervisorName`) \
    VALUES (?)";
    const values = [
        req.body.Task_name,
        req.body.StartDate,
        req.body.DueDate,
        req.body.SupervisorName
    ]
    
    con.query(sql, [values], (err, result) => {
        if (err) return res.json({Status: false, Error: "Query failed"})
        return res.json({Status: true});
    })
})

router.get('/task', (req, res) => {
    const sql = "SELECT * FROM tasks";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/task/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM tasks WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_task/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE tasks 
        set TaskName = ?, StartDate = ?, DueDate = ?, SupervisorName = ?, status = ? WHERE id = ?`
    const values = [
        req.body.Task_name,
        req.body.StartDate,
        req.body.DueDate,
        req.body.SupervisorName,
        req.body.status,
        id  
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_task/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM tasks where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export {router as UserRouter}