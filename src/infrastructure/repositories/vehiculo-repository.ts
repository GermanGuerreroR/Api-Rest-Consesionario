import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { Vehiculo } from "../../domains/Vehiculo";
import { getPoolConnection } from "./database";

export class VehiculoRepository {
    async obtenerVehiculos(): Promise<RowDataPacket[]> {
        const connection = await getPoolConnection();
        const querySQL: string = `SELECT * FROM vehiculos`;
        const result = await connection.query<RowDataPacket[]>(querySQL);
        return result[0]
    }

    async crearVehiculo(vehiculo: Vehiculo): Promise<ResultSetHeader> {
        const connection = await getPoolConnection();
        const querySQL: string = `INSERT INTO vehiculos (marca,modelo,anio) VALUES (?,?,?)`;
        const values: Array<string | number> = [vehiculo.infoVehiculo.marca, vehiculo.infoVehiculo.modelo, vehiculo.infoVehiculo.anio];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySQL, values);
        return result[0];
    }

    async actualizarVehiculo(idVehiculo: number, vehiculo: Vehiculo): Promise<ResultSetHeader> {
        const connection = await getPoolConnection();
        const querySQL: string = `UPDATE vehiculos SET marca = ?, modelo = ?,anio = ? WHERE id= ?`;
        const values: Array<string | number> = [vehiculo.infoVehiculo.marca, vehiculo.infoVehiculo.modelo, vehiculo.infoVehiculo.anio, idVehiculo];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySQL, values);
        return result[0];
    }

    async eliminarVehiculo(idVehiculo: number): Promise<ResultSetHeader> {
        const connection = await getPoolConnection();
        const querySQL: string = `DELETE FROM vehiculos WHERE id = ?`;
        const values: Array<number> = [idVehiculo]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySQL, values);
        return result[0];
    }

    async specVehiculo(idVehiculo: number): Promise<RowDataPacket[]> {
        const connection = await getPoolConnection();
        const querySQL: string = `SELECT * FROM vehiculos WHERE id = ?`;
        const values: Array<number> = [idVehiculo]
        const result = await connection.query<RowDataPacket[]>(querySQL, values);
        return result[0];
    }



}