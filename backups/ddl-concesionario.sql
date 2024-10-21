CREATE DATABASE IF NOT EXISTS concesionario;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id int NOT NULL AUTO_INCREMENT,
    nombre varchar(100) DEFAULT NULL,
    email varchar(100) DEFAULT NULL,
    telefono varchar(15) DEFAULT NULL,
    PRIMARY KEY (id)
)

DROP TABLE IF EXISTS vehiculos;

CREATE TABLE vehiculos (
    id int NOT NULL AUTO_INCREMENT,
    marca varchar(50) DEFAULT NULL,
    modelo varchar(50) DEFAULT NULL,
    anio int DEFAULT NULL,
    PRIMARY KEY (id)
)
DROP TABLE IF EXISTS reservas;

CREATE TABLE reservas (
    id int NOT NULL AUTO_INCREMENT,
    usuario_id int DEFAULT NULL,
    vehiculo_id int DEFAULT NULL,
    fecha_reserva date DEFAULT NULL,
    PRIMARY KEY (id),
    KEY vehiculo_id (vehiculo_id),
    KEY usuario_id (usuario_id),
    CONSTRAINT reservas_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
    CONSTRAINT reservas_ibfk_2 FOREIGN KEY (vehiculo_id) REFERENCES vehiculos (id),
    CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    CONSTRAINT vehiculo_id FOREIGN KEY (vehiculo_id) REFERENCES vehiculos (id) ON DELETE CASCADE
)