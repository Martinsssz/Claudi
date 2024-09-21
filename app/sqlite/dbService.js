import * as SQLite from 'expo-sqlite';

const db = (async() => {
  let database;
  
  (async () => {
    database = await SQLite.openDatabaseAsync('claudi');
  })();
  
  return database;
})();


export async function testar(){
  try{
    await criarTabela()
    //await atualizarTabelaUsuario()
    await mostrarUsuários()
  }catch(error){
    console.log('Erro no teste:', error);
  }
}

export async function criarTabela(){
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY NOT NULL,  username TEXT NOT NULL);`
  )
}

/*export async function atualizarTabelaUsuario(){
  await db.runAsync(
    `INSERT INTO user (id, username) VALUES (5486, "Dudu");`
  )
}*/

export async function deletarDoBanco(id){
  const statement = await db.prepareAsync(
    `DELETE FROM user WHERE id = $i`
  )


}

export async function mostrarUsuários() {
  let pessoas = await db.getAllAsync( `SELECT * from user;`)
  console.log(pessoas)
}
