import { Request, Response } from 'express'
import { Knex } from 'knex'

export const playlistAll = (knex: Knex) => async (_req: Request, res: Response) => {
    knex
        .select('*')
        .from('playlist')
        .then(playlistData => {
            res.json(playlistData)
        })
        .catch(err => {
            res.json({ message: `There was an error retriveing playlist: ${err}` })
        })
}

export async function create(knex: Knex) {
    return {
        playlistAll: playlistAll(knex),
    }
}

export default {create}