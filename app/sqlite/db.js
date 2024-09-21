import * as SQLite from 'expo-sqlite'

const db = await SQLite.openDatabaseAsync('claudi')


export default db