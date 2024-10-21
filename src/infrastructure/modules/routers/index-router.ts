import Express from "express";
import { usuarioRoutes } from "./usuario-router";
import { vehiculoRoutes } from "./vehiculo-routers";
import { reservaRoutes } from "./reserva-router";

export const routes = () => {
    const router = Express.Router();


    router.get("/", (req, res) => {
        res.send({ message: "Bienvenido API_REST concesionario v1 " });
    });

    router.use(usuarioRoutes());
    router.use(vehiculoRoutes());
    router.use(reservaRoutes())


    return router;
};
