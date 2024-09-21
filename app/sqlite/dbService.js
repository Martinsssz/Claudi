import * as SQLite from 'expo-sqlite';

let db

async function abrirBanco(){
  db = await SQLite.openDatabaseAsync('claudi');
}

export async function testar(){
  abrirBanco()
  try{
    await criarTabela()
    await atualizarTabelaUsuario()
    await mostrarUsuários()
  }catch(error){
    console.log('Erro no teste:', error);
  }
}

export async function criarTabela(){
  abrirBanco()
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY NOT NULL,  username TEXT NOT NULL);`
  )
}

export async function atualizarTabelaUsuario(){
  await db.runAsync(
    `INSERT INTO user (id, username) VALUES (5486, "Dudu");`
  )
}

export async function deletarDoBanco(id){
  abrirBanco()
  const statement = await db.prepareAsync(
    `DELETE FROM user WHERE id = $i`
  )

  


}

export async function mostrarUsuários() {
  abrirBanco()
  let pessoas = await db.getAllAsync( `SELECT * from user;`)
  console.log(pessoas)
}