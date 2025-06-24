import pool from "../config/db.js";

// register user
export const registerUserService = async (
  user_name,
  user_email,
  user_password,
  user_avatar
) => {
  const query = `INSERT INTO users (user_name, user_email, user_password, user_avatar) VALUES 
  ($1, $2, $3, $4) RETURNING *`;
  try {
    const result = await pool.query(query, [
      user_name,
      user_email,
      user_password,
      user_avatar || "https://example.com/default-avatar.png", // Default avatar URL
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUserService = async (user_email) => {
  const query = `SELECT * FROM users WHERE user_email=$1`;
  try {
    const result = await pool.query(query, [user_email]);
    return result.rows[0];
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const getAllUsersService = async () => {
  const query = `SELECT id, user_avatar, user_name FROM users `;
  try {
    const result = await pool.query(query);

    return result.rows;
  } catch (err) {
    console.error("Error fetching all users:", err);
    throw err;
  }
};
