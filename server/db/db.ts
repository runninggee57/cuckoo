import Path from 'path'
import Knex from 'knex'

export async function create () {
    const knex = Knex({
        client: 'sqlite3',
        connection: {
            filename: Path.resolve(__dirname, 'db/cuckoo.db'),
        },
        useNullAsDefault: true,
    })

    try {
        knex.schema.hasTable('recurrenceVals')
            .then((exists) => {
                if (!exists) {
                    //create the recurrencVals table
                }
            })
            .then(() =>
                console.log('Successfully set up recurrenceVals'))
            .catch((error) => {
                console.error(`There was an error creating recurrenceVals: ${error}`)
            })
        knex.schema.hasTable('dayOfWeek')
            .then((exists) => {
                if (!exists) {
                    //create the dayOfWeek table
                }
            })
            .then(() =>
                console.log('Successfully set up dayOfWeek'))
            .catch((error) => {
                console.error(`There was an error creating dayOfWeek: ${error}`)
            })
        knex.schema.hasTable('playlist')
            .then((exists) => {
                if (!exists) {
                    //create the playlist table
                }
            })
            .then(() =>
                console.log('Successfully set up playlist'))
            .catch((error) => {
                console.error(`There was an error creating playlist: ${error}`)
            })
        return knex
    }
    catch (error) {
        throw new Error('Unable to connect to sqlite via Knex.');
    }
}

export default {create}