import express from "express";
import router from "./routers/api";
import { PORT } from "./utils/env";

import db from "./utils/database";

async function init() {
    try {
        const result = await db();
        console.log(`Database Status : ${result}`);

        const app = express();

        app.use(express.json());
        app.use('/api', router);

        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:3000");
        });
    } catch (error) {
        console.log(error);
    }
};

init();