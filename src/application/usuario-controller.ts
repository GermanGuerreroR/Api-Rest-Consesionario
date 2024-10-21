import { ResultSetHeader } from "mysql2";
import { Usuario } from "../domains/Usuario";
import { UsuarioRepository } from "../infrastructure/repositories/usuario-repository";

export class UsuarioController {
    constructor(private repository = new UsuarioRepository()) { };

    async obtener() {
        return (await this.repository.obtenerUsuarios());
    }

    async crear(payload: { nombre: string, email: string, telefono: string }) {
        try {
            const usuarioNuevo = new Usuario({ nombre: payload.nombre, email: payload.email, telefono: payload.telefono });
            const result = await this.repository.crearUsuario(usuarioNuevo);
            if (result.affectedRows === 1) return { msg: "Usuario creado exisitosamente", id: result.insertId };
        } catch (error) {
            return { msg: "No se pudo crear el usuario" }
        }
    }

    async modificar(idUsuario: number, payload: { nombre: string, email: string, telefono: string }) {

        try {
            const usuarioModificado = new Usuario({ nombre: payload.nombre, email: payload.email, telefono: payload.telefono });
            const result = await this.repository.actualizarUsuario(idUsuario, usuarioModificado);
            if (result.affectedRows === 1) return [{ msg: `El usuario con el ID : ${idUsuario} ha sido modificado correctamente` }, result.info];
        } catch (error) {
            return { msg: "No se pudo efecutar la modificación" }
        }

    }

    async eliminar(idUsuario: number) {
        const result = (await this.repository.eliminarUsuario(idUsuario));
        try {
            if (result.affectedRows === 1) return { ok: true, msg: `El usuario con el ID ${idUsuario} ha sido eliminado correctamente.` };
            if (result.affectedRows === 0) return { ok: false, msg: `Ningun usuario está registrado con el ID: ${idUsuario}.` };

        } catch (error) {
            return { msg: "Error en el ingreso del ID" + error }
        }
    }

    async spec(idUsuario: number) {
        const result = await this.repository.specUsuario(idUsuario);

        try {
            return result.length === 1 ? { verification: true, spec: result } : { verification: false, msg: `No hay ningun usuario registrado con el numero de ID ${idUsuario}` };

        } catch (error) {
            return { msg: `No hay un usuario registrado con el ID: ${idUsuario}` }
        }

    }


};


