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
app.get('/product/list/:type', async (req, res) => {
    const {type} = req.params;
    const {sort, page, filters} = req.query;

    // Construct SQL query based on parameters
    let query = `SELECT * FROM product JOIN ${type} ON product.id = ${type}.id`;
    // Add filtering logic
    if (filters) {
        const filterObj = JSON.parse(filters.toString()); // Parse the filters object
        const filterConditions = Object.entries(filterObj)
            .map(([key, value]) => {
                console.log(value);
                const valuesString = Array.isArray(value) ? value.map(v => `'${v}'`).join(', ') : `'${value}'`;
                return `${key} IN (${valuesString})`;
            })
            .join(' AND '); // Join conditions with AND operator
        query += ` WHERE ${filterConditions}`;
    }


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

    try {
        const {rows} = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// List product type filter values
app.get('/product/filter-values/:type', async (req, res) => {
    try {
        const {type} = req.params;
        let query = `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${type.toLowerCase()}'`;
        console.log(query);
        let {rows} = await pool.query(query);
        rows = [
            ...rows, ...(['price', 'description', 'name'].map((colName) => {
                return {column_name: colName};
            }))
        ];
        let arr = [];
        for (let row of rows) {
            query = `SELECT DISTINCT array_agg(${row.column_name}) as ${row.column_name} FROM public.${type} JOIN public.product`;
            query = `SELECT DISTINCT array_agg(${row.column_name}) as ${row.column_name}
            FROM (
                SELECT ${row.column_name==='id'? `public.${type}.${row.column_name} `:`${row.column_name} `}
                FROM public.${type} 
                JOIN public.product ON public.${type}.id = public.product.id
            ) AS subquery`;
            arr.push((await pool.query(query)).rows[0]);
        }
        res.json(arr);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
