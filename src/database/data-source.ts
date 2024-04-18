// src/data-source.ts
import { DataSource } from "typeorm"; // Importe suas entidades aqui

export const AppDataSource = new DataSource({
    type: "postgres", // ou outro banco de dados
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "gostack_gobarber",
    synchronize: false,
    logging: false,
    migrations: ["src/database/migrations/*.ts"],
    subscribers: [],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
