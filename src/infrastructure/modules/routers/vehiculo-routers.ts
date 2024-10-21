import Express from "express";
import { VehiculoController } from "../../../application/vehiculo-controller";
import { error } from "console";

export const vehiculoRoutes = () => {
    const router = Express.Router();
    const vehiculoCtrl = new VehiculoController();

    router.get("/vehicles", async (req, res) => {
        await vehiculoCtrl.obtener().then((result) => {
            result.length === 0 ? res.status(500).send({ msg: "No hay vehiculos registrados" }) : res.send(result);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

    router.post("/vehicles/creation", async (req, res) => {
        const payload = req.body;
        await vehiculoCtrl.crear(payload).then((result) => {
            res.send(result)
        }).catch((error) => {
            res.status(500).send(error);
        })

    })

    router.put("/vehicles/update/:id", async (req, res) => {
        const payload = req.body;
        const numberId = req.params.id;
        const _numberId = Number(numberId);

        await vehiculoCtrl.modificar(_numberId, payload).then((result) => {
            res.send(result);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

    router.delete("/vehicles/delete/:id", async (req, res) => {
        const numberId: string = req.params.id;
        if (isNaN(Number(numberId))) res.status(500).send({ msg: `Error ${numberId} no es un valor númerico` });
        try {
            const result = await (vehiculoCtrl.eliminar(Number(numberId)));
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

    router.get("/vehicle/spec/:id", async (req, res) => {
        const numberId: string = req.params.id;

        if (isNaN(Number(numberId))) {
            res.status(500).send({ msg: `Error ${numberId} no es un valor númerico` });
            return;
        }

        try {
            const result = await (vehiculoCtrl.spec(Number(numberId)));
            if (result.verification) res.send(result);
            if (!result.verification) res.status(500).send(result);
        } catch (error) {
            res.send(error).status(500);
        }

    })


    return router;
}