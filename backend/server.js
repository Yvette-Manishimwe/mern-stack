const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument= require('./swagger-output.json');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});
app.get("/all", (req, res) => {
    try {
        db.query('SELECT * FROM login', (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                data: data
            });
        }); 
    } catch (err) {
        // Handle any synchronous errors
        res.status(500).json({ error: err.message });
    }
});


app.get("/pages", (req, res) => {
    try {
        const { page, limit } = req.query;
        const pageLimit = limit ? parseInt(limit) : 3
        const defaultPage = page ? parseInt(page) : 1
        const offset = (parseInt(defaultPage) - 1) * parseInt(pageLimit);

        // Query to fetch paginated data
        db.query('SELECT * FROM login LIMIT ? OFFSET ?', [pageLimit, offset], (err, data) => {
            if (err) {
                // Handle the error
                return res.status(500).json({ error: err.message });
            }
            // Query to fetch total count for pagination
            db.query('SELECT COUNT(*) as count FROM login', (err, totalCount) => {
                if (err) {
                    // Handle the error
                    return res.status(500).json({ error: err.message });
                }
                if (!totalCount || !totalCount[0] || !totalCount[0].count) {
                    // Handle the case where totalCount is undefined or empty
                    return res.status(404).json({ error: "Total count not found" });
                }

                const totalPages = Math.ceil(totalCount[0].count / parseInt(pageLimit));

                res.json({
                    data: data,
                    pagination: {
                        page: defaultPage,
                        limit: pageLimit,
                        totalPages
                    }
                });
            });
        });
    } catch (error) {
        // Handle any synchronous errors
        res.status(500).json({ error: error.message });
    }
});

        

app.get("/read/:id",(req,res)=>{
    const sql="SELECT *FROM login WHERE id=?";
    const id=req.params.id
    db.query(sql,[id],(err,data)=>{
        if(err){
            return res.json({Message:"Error inside server"})
        }
        return res.json(data)
    })
});
app.post("/signup", (req, res) => {
    const sql = "INSERT INTO login(`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.post("/login", (req, res) => {
    const sql = "SELECT *FROM login WHERE `email`= ? AND `password` =?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if (data.length>0) {
            return res.json("Success");
        }
        else{
            return res.json("Failed");
        }
        
    });
});



app.put('/update/:id', (req,res)=>{
    const sql= "UPDATE login SET `name`=?,`email`=? WHERE id=?"
    const id=req.params.id
    db.query(sql,[req.body.name, req.body.email,id],(err,data)=>{
        if(err){
            return res.json({Message:"Error inside server"})
        }
        return res.json(data)
    })
})



app.delete('/delete/:id', (req,res)=>{
    const sql='DELETE FROM login WHERE id=?'
    const id=req.params.id
    db.query(sql,[id],(err,data)=>{
        if(err){
            return res.json({Message:"Error inside server"})
        }
        return res.json(data)
    })
    })


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




app.listen(5000, () => {
    console.log("listening");
});
