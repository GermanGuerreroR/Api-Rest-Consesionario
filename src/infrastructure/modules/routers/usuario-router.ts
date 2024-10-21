import Express from "express";
import { UsuarioController } from "../../../application/usuario-controller";
import { error } from "console";

export const usuarioRoutes = () => {
    const router = Express.Router();
    const usuarioCtrl = new UsuarioController();

    router.get("/users", async (req, res) => {
        await usuarioCtrl.obtener().then((result) => {
            result.length === 0 ? res.status(500).send({ msg: "No hay usuarios registrados" }) : res.send(result);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

    router.post("/user/creation", async (req, res) => {
        const payload = req.body;
        await usuarioCtrl.crear(payload).then((result) => {
            res.send(result)
        }).catch((error) => {
            res.status(500).send(error);
        })

    })

    router.put("/user/update/:id", async (req, res) => {
        const payload = req.body;
        const numberId = req.params.id;
        const _numberId = Number(numberId);

        await usuarioCtrl.modificar(_numberId, payload).then((result) => {
            res.send(result);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

    router.delete("/user/delete/:id", async (req, res) => {
        const numberId: string = req.params.id;
        if (isNaN(Number(numberId))) res.status(500).send({ msg: `Error ${numberId} no es un valor númerico` });
        try {
            const result = await (usuarioCtrl.eliminar(Number(numberId)));
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

    router.get("/userspec/:id", async (req, res) => {
        const numberId: string = req.params.id;

        if (isNaN(Number(numberId))) {
            res.status(500).send({ msg: `Error ${numberId} no es un valor númerico` });
            return;
        }

        try {
            const result = await (usuarioCtrl.spec(Number(numberId)));
            if (result.verification) res.send(result);
            if (!result.verification) res.status(500).send(result);
        } catch (error) {
            res.send(error).status(500);
        }

    })
    return router;
}