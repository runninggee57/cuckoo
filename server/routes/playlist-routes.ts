import playlistController from "../controllers/playlist-controller"
import { Express } from "express-serve-static-core"
import { Knex } from "knex"

export async function create(app: Express, db: Knex) {

    app.get('/all', (await playlistController.create(db)).playlistAll)
}

export default { create }