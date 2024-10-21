import { FieldPacket, OkPacketParams, QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";
import { Usuario } from "../../domains/Usuario";
import { getPoolConnection } from "./database";
import { promises } from "dns";



export class UsuarioRepository {

    async obtenerUsuarios(): Promise<RowDataPacket[]> {
        const connection = await getPoolConnection();
        const querySQL: string = `SELECT * FROM usuarios`;
        const result = await connection.query<RowDataPacket[]>(querySQL);
        return result[0]
    }

    async crearUsuario(usuario: Usuario): Promise<ResultSetHeader> {
        const connection = await getPoolConnection();
        const querySQL: string = `INSERT INTO usuarios (nombre,email,telefono) VALUES (?,?,?)`;
        const values: Array<string | number> = [usuario.infoUsuario.nombre, usuario.infoUsuario.email, usuario.infoUsuario.telefono];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySQL, values);
        return result[0];
    }

    async actualizarUsuario(idUsuario: number, usuario: Usuario): Promise<ResultSetHeader> {
        const connection = await getPoolConnection();
        const querySQL: string = `UPDATE usuarios SET nombre = ?, email = ?,telefono = ? WHERE id= ?`;
        const values: Array<string | number> = [usuario.infoUsuario.nombre, usuario.infoUsuario.email, usuario.infoUsuario.telefono, idUsuario];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySQL, values);
        return result[0];
    }

    async eliminarUsuario(idUsuario: number): Promise<ResultSetHeader> {
        const connection = await getPoolConnection();
        const querySQL: string = `DELETE FROM usuarios WHERE id = ?`;
        const values: Array<number> = [idUsuario]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySQL, values);
        return result[0];
    }

    async specUsuario(idUsuario: number): Promise<RowDataPacket[]> {
        const connection = await getPoolConnection();
        const querySQL: string = `SELECT * FROM usuarios WHERE id = ?`;
        const values: Array<number> = [idUsuario]
        const result = await connection.query<RowDataPacket[]>(querySQL, values);
        return result[0];
    }

}