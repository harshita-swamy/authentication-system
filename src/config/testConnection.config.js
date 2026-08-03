import pool from "./db.config.js";

const testConnection = async()=>{
    try {
        const connection = await pool.getConnection();
        console.log('Database Connected Successfully');
        connection.release();
    } catch (error) {
        console.log('Database Connection Failed');
    }
}

export default testConnection;