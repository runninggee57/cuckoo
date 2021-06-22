import db from './db/db'
import playlistRoutes from './routes/playlist-routes'
import express, { Express } from 'express'
import http from 'http'

export async function main() {
    let database = db.create()
    let app = express()

    playlistRoutes.create(app, await database)

    const server = http.createServer(app)

    server.listen(4001)

    function replaceApp (newApp: Express) {
        server.removeListener('request', app)
        server.on('request', newApp)
        app = newApp
    }
    return replaceApp
}

export default { main }