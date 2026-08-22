export const check_email = `SELECT * FROM users WHERE email = ?`;

export const insert_user = `INSERT INTO users (name, email, password, phone) VALUES(?, ?, ?, ?)`;   

export const getEmail_byID = 'SELECT * FROM users WHERE email = ?';

export const getProfileQuery = `SELECT id, name, email, phone FROM users WHERE id = ?`;

export const updateProfileQuery = `UPDATE users SET name = ?, phone = ? where id = ?`;

export const get_password_by_id = `SELECT password FROM users WHERE id = ?`;

export const update_password = `UPDATE users SET password = ? where id = ?`