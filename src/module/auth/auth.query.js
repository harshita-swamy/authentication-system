export const check_email = `SELECT * FROM users WHERE email = ?`;

export const insert_user = `INSERT INTO users (name, email, password, phone) VALUES(?, ?, ?, ?)`;   

export const getEmail_byID = 'SELECT * FROM users WHERE email = ?';