import { pool } from "../config/db.js";

const administrador = async ({username,password}) => {
    const {rows} = await pool.query(
        `SELECT * FROM administradores AS a WHERE a.username = $1 AND a.password = $2`
        [username,password]
    )
    return rows.length > 0;
}

