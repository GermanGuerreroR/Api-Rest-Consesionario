import { ResultSetHeader } from "mysql2";
import { Reserva } from "../domains/Reserva";
import { ReservaRepository } from "../infrastructure/repositories/reserva-repository";

export class ReservaController {
    constructor(private repository = new ReservaRepository()) { };

    async obtener() {
        return (await this.repository.obtenerReservas());
    }

    async crear(payload: { usuario_id: number, vehiculo_id: number, fecha_reserva: Date }) {
        try {
            const reservaNueva = new Reserva({ usuario_id: payload.usuario_id, vehiculo_id: payload.vehiculo_id, fecha_reserva: payload.fecha_reserva });
            const result = await this.repository.crearReserva(reservaNueva);

            if (result.affectedRows === 1) return { msg: "Reserva creada exisitosamente ", id: result.insertId };
        } catch (error) {
            return { msg: "No se pudo crear la reserva" }
        }
    }

    async modificar(idReserva: number, payload: { usuario_id: number, vehiculo_id: number, fecha_reserva: Date }) {

        try {
            const reservaModificada = new Reserva({ usuario_id: payload.usuario_id, vehiculo_id: payload.vehiculo_id, fecha_reserva: payload.fecha_reserva });
            const result = await this.repository.actualizarReserva(idReserva, reservaModificada);
            if (result.affectedRows === 1) return [{ msg: `La reserva con el ID : ${idReserva} ha sido modificada correctamente` }, result.info];
        } catch (error) {
            return { msg: "No se pudo efecutar la modificación" }
        }

    }
    async eliminar(idReserva: number) {
        const result = (await this.repository.eliminarReserva(idReserva));
        try {
            if (result.affectedRows === 1) return { ok: true, msg: `La reserva con el ID ${idReserva} ha sido eliminado correctamente.` };
            if (result.affectedRows === 0) return { ok: false, msg: `Ninguna reserva está registrado con el ID: ${idReserva}.` };

        } catch (error) {
            return { msg: "Error en el ingreso del ID" + error }
        }
    }
}