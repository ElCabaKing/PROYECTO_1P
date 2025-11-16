/*Carpeta Mode
    IMPORTANTE: el pool es directamente la coneccion de la base de datos por ende
    siempre va
    Llamado por: Controller
    llama: directamente a la base de datos
    Este apartado sera donde ejecutemos nuestras sentencias sql 
    Ojo y recomendacion: podemos recibir mensajes de la base
    pero hay que estar seguros de usar rows[0] aunque podemos usar siempre un
    console log
*/

import { pool } from "../config/db.js";

export const testCon = async () => {
    const {rows} = await pool.query(
        `SELECT * FROM test ORDER BY id`
    )
    return rows;
}
export const testInser = async ({nombre}) => {
    const {rows} = await pool.query(
        `INSERT INTO test(nombre) VALUES ($1)`,
        [nombre]
    );
    return;
}
export const testDelete = async ({id}) => {
    const {rows} = await pool.query(
        `DELETE FROM test WHERE id=$1`,
        [id]
    );
    return;
}

export const testUpdate = async ({id,nombre}) => {
    await pool.query(
        `UPDATE test 
        SET nombre = $1
        WHERE id=$2`,
        [nombre,id]
    );
    return;
}
export default {
    testCon,
    testInser,
    testDelete,
    testUpdate
}