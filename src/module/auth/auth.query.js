export const check_email = `SELECT * FROM users WHERE email = ?`;

export const insert_user = `INSERT INTO users (name, email, password, phone) VALUES(?, ?, ?, ?)`;   

export const getEmail_byID = 'SELECT * FROM users WHERE email = ?';

export const getProfileQuery = `SELECT id, name, email, phone FROM users WHERE id = ?`;

export const updateProfileQuery = `UPDATE users SET name = ?, phone = ? where id = ?`;