import Express from "express";
import { ReservaController } from "../../../application/reserva-controller";
import { UsuarioController } from "../../../application/usuario-controller";
import { VehiculoController } from "../../../application/vehiculo-controller";
import { error } from "console";

export const reservaRoutes = () => {
    const router = Express.Router();
    const reservaCtrl = new ReservaController();
    const usuarioCtrl = new UsuarioController();
    const vehicleCtrl = new VehiculoController();

    router.get("/reserve", async (req, res) => {
        await reservaCtrl.obtener().then((result) => {
            result.length === 0 ? res.status(500).send({ msg: "No hay reservas registradas" }) : res.send(result);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

    router.post("/reserve/creation/:userid/:vehicleid", async (req, res) => {
        const payload = req.body;
        const userId = req.params.userid;
        const vehicleId = req.params.vehicleid;

        const usuarioVerificacion = (await usuarioCtrl.spec(Number(userId))).verification;
        const vehiculoVerificacion = (await vehicleCtrl.spec(Number(vehicleId))).verification

        if (!usuarioVerificacion && !vehiculoVerificacion) res.send({ msg: `El ID del usuario ${userId} ingresado y el ID del vehiculo ${vehicleId} no corresponden a ninguno almacenado en la base de datos` }).status(500);

        if (!usuarioVerificacion) res.status(500).send({ msg: `El usuario con el ID ${userId} no existe y por eso no puede proceder la reserva` });
        if (!vehiculoVerificacion) res.status(500).send({ msg: `El vehiculo con el ID ${vehicleId} no existe y por eso no puede proceder la reserva` });


        if (usuarioVerificacion && vehiculoVerificacion) {
            reservaCtrl.crear(payload).then((result) => {
                res.send(result);
            }).catch(error => {
                res.status(500).send(error);
            })
        }

    })

    router.put("/reserve/update/:id", async (req, res) => {
        const payload = req.body;
        const numberId = req.params.id;
        const _numberId = Number(numberId);

        await reservaCtrl.modificar(_numberId, payload).then((result) => {
            res.send(result);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

    router.delete("/reserve/delete/:id", async (req, res) => {
        const numberId: string = req.params.id;
        if (isNaN(Number(numberId))) res.status(500).send({ msg: `Error ${numberId} no es un valor númerico` });
        try {
            const result = await (reservaCtrl.eliminar(Number(numberId)));
            if (result?.ok) {
                res.send(result);
                return;
            } else if (!result?.ok) {
                res.status(500).send(result);
            }
            else {
                res.status(500).send(result);
            }
        } catch (error) {
            res.send(error).status(500);
        }
    })
    return router;
}