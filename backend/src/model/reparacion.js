import { pool } from "../config/db.js";

const estado = async ({id}) => {
    const {rows} = await pool.query(
        `SELECT dispositivo, descripcion, estado FROM reparaciones AS r WHERE r.id = $1`
        [id]
    )
    return rows;
}

const crear = async ({dispositivo, descripcion}) => {
    const {rows} = await pool.query(
        `INSERT INTO reparaciones(dispositivo, descripcion) VALUES ($1, $2)`,
        [dispositivo, descripcion]
    );
    return;
}

const actualizar = async ({id, estado}) => {
    await pool.query(
        `UPDATE reparaciones 
        SET estado = $1
        WHERE id = $2`,
        [estado,id]
    );
    return;
}

const listar = async ({id}) => {
    const {rows} = await pool.query(
        `SELECT dispositivo, descripcion, estado FROM reparaciones`
    )
    return rows;
}

export default {
    estado,
    crear,
    actualizar,
    listar
}
