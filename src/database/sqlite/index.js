const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

async function sqliteConnection(){
    const database = await sqlite.open({
        //onde salvar, path para buscar a pasta sem dar conflito de sistema operacional
        filename: path.resolve(__dirname, "..", "database.db"),
        
        //drive de conexão
        driver: sqlite3.Database
    });

    return database;
}

module.exports = sqliteConnection;
    