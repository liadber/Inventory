import express from 'express';
import {Pool} from 'pg';
import cors from 'cors';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'inventory',
    password: '12345678',
    port: 5432,
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// Get product statistics
app.get('/products/statistics', async (req, res) => {
    try {
        const query = 'SELECT type, COUNT(*) as quantity FROM product GROUP BY type ORDER BY type';
        const {rows} = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// List products by type
app.get('/product/:type', async (req, res) => {
    const {type} = req.params;
    const {sort, page, filters} = req.query;

    // Construct SQL query based on parameters
    let query = `SELECT * FROM product JOIN ${type} ON product.id = ${type}.id`;


    // Add sorting logic
    if (sort) {
        // @ts-ignore
        let [sortBy, sortOrder] = sort.split(':');
        if (sortBy === 'id') {
            sortBy = 'product.id';
        }
        query += ` ORDER BY ${sortBy} ${sortOrder}`;
    }

    // Add pagination logic
    if (page) {
        // @ts-ignore
        const offset = (page) * 10; // Assuming page size of 10
        query += ` OFFSET ${offset} LIMIT 10`;
    }

    // Add filtering logic
    if (filters) {
        // Implement filtering based on filters object
    }
    try {
        const {rows} = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// List product type filter values
app.get('/product/filter-values', async (req, res) => {
    try {
        // Implement logic to get unique values for each product type and field
        res.json({});
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
