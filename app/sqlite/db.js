import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync("claudi.db")

export default db