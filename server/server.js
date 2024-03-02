const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Use cors middleware with options
app.use(cors({
    origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
    credentials: true,
}));

const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Customer',
    user: 'postgres',
    password: 'postgres'
});

client.connect();

app.get('/api/customers', (req, res) => {
    const searchTerm = req.query.search; // Extract search term from query parameter

    let query = 'SELECT * FROM customers';
    let values = [];

    // Check if a search term is provided
    if (searchTerm) {
        query += ' WHERE name ILIKE $1 OR location ILIKE $1'; // ILIKE for case-insensitive search
        values = [`%${searchTerm}%`];
    }

    client.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(result.rows);
            console.log(result.rows);
        }
    });
});
app.get('/api/getTimestamp', (req, res) => {
    client.query('SELECT date_of_creation FROM customers', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const timestamps = result.rows.map(row => {
                const timestamp = row.date_of_creation;
                return {
                    date: timestamp.toISOString().split('T')[0],
                    time: timestamp.toISOString().split('T')[1].split('.')[0],
                };
            });
            
            // console.log(timestamps);
            res.json(timestamps);
            
        }
    });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
