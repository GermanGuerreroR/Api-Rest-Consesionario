import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { Reserva } from "../../domains/Reserva";
import { getPoolConnection } from "./database";


export class ReservaRepository {

    async obtenerReservas(): Promise<RowDataPacket[]> {
        const connection = await getPoolConnection();
        const querySQL: string = `SELECT * FROM reservas`;
        const result = await connection.query<RowDataPacket[]>(querySQL);
        return result[0]
    }

    async crearReserva(reserva: Reserva): Promise<ResultSetHeader> {
        const connection = await getPoolConnection();
        const querySQL: string = `INSERT INTO reservas (usuario_id,vehiculo_id,fecha_reserva) VALUES (?,?,?)`;
        const values: Array<number | Date> = [reserva.infoReserva.usuario_id, reserva.infoReserva.vehiculo_id, reserva.infoReserva.fecha_reserva];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySQL, values);
        return result[0];
    }

    async actualizarReserva(idReserva: number, reserva: Reserva): Promise<ResultSetHeader> {
        const connection = await getPoolConnection();
        const querySQL: string = `UPDATE reservas SET usuario_id = ?, vehiculo_id = ?,fecha_reserva = ? WHERE id= ?`;
        const values: Array<Date | number> = [reserva.infoReserva.usuario_id, reserva.infoReserva.vehiculo_id, reserva.infoReserva.fecha_reserva, idReserva];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySQL, values);
        return result[0];
    }

    async eliminarReserva(idReserva: number): Promise<ResultSetHeader> {
        const connection = await getPoolConnection();
        const querySQL: string = `DELETE FROM reservas WHERE id = ?`;
        const values: Array<number> = [idReserva]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySQL, values);
        return result[0];
    }
}