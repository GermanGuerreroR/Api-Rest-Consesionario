import { Vehiculo } from "../domains/Vehiculo";
import { VehiculoRepository } from "../infrastructure/repositories/vehiculo-repository";

export class VehiculoController {
    constructor(private repository = new VehiculoRepository()) { };

    async obtener() {
        return await this.repository.obtenerVehiculos();
    }

    async crear(payload: { marca: string, modelo: string, anio: number }) {

        try {
            const vehiculoNuevo = new Vehiculo({ marca: payload.marca, modelo: payload.modelo, anio: payload.anio });

            const result = await this.repository.crearVehiculo(vehiculoNuevo);

            if (result.affectedRows === 1) return { msg: "Vehiculo creado exisitosamente", id: result.insertId };
        } catch (error) {
            return { msg: "No se pudo crear el usuario" }
        }
    }

    async modificar(idVehiculo: number, payload: { marca: string, modelo: string, anio: number }) {
        try {
            const vehiculoModificado = new Vehiculo({ marca: payload.marca, modelo: payload.modelo, anio: payload.anio });

            const result = await this.repository.actualizarVehiculo(idVehiculo, vehiculoModificado);

            if (result.affectedRows === 1) return [{ msg: `El vehiculo con el ID: ${idVehiculo} ha sido modificado` }, result.info];
        } catch (error) {
            return { msg: "No se pudo efecutar la modificación" }
        }
    }
    async eliminar(idVehiculo: number) {
        const result = (await this.repository.eliminarVehiculo(idVehiculo));
        try {
            if (result.affectedRows === 1) return { ok: true, msg: `El vehiculo con el ID ${idVehiculo} ha sido eliminado correctamente.` };
            if (result.affectedRows === 0) return { ok: false, msg: `Ningun vehiculo está registrado con el ID: ${idVehiculo}.` };

        } catch (error) {
            return { msg: "Error en el ingreso del ID" + error }
        }
    }
    async spec(idVehiculo: number) {
        const result = await this.repository.specVehiculo(idVehiculo);

        try {
            return result.length === 1 ? { verification: true, spec: result } : { verification: false, msg: `No hay ningun vehiculo registrado con el ID ${idVehiculo}` };

        } catch (error) {
            return { msg: `No hay ningun vehiculo registrado con el ID: ${idVehiculo}` }
        }

    }
}