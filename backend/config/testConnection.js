import pool from "./db.js"; // sửa lại đúng đường dẫn file pool

async function testQuery() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Current time from DB:", res.rows[0]);
  } catch (err) {
    console.error("Query error:", err.message);
  } finally {
    await pool.end(); // đóng pool khi xong
  }
}

testQuery();
