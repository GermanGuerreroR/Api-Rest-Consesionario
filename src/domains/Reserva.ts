export class Reserva {
    constructor(public infoReserva: { id?: number | null, usuario_id: number, vehiculo_id: number, fecha_reserva: Date }) { };
}