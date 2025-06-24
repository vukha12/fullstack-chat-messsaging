import pool from "../config/db.js";

const createTableUser = async () => {
  const query = `CREATE TABLE IF NOT EXISTS users(
    id serial primary key,
    user_name varchar(50) not null,
    user_email varchar(100) not null unique,
    user_password varchar(255) not null,
    user_avatar varchar(255) not null,
    user_online boolean not null default false,
    user_created_at timestamp default current_timestamp
)`;
  try {
    await pool.query(query);
    console.log("Table 'users' created successfully:");
  } catch (error) {
    console.error("Error creating table 'users':", error);
  }
};

export default createTableUser;
