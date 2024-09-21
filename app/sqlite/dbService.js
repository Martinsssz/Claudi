import * as SQLite from "expo-sqlite";

let db;

async function abrirBanco() {
  db = await SQLite.openDatabaseAsync("claudi");
}

export async function criarTabela() {
  await abrirBanco();
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY NOT NULL,  username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL);`
  );
}

export async function criarUsuario(user) {
  //Void
  await criarTabela();
  const statement = await db.prepareAsync(
    `INSERT INTO user (id, username, email, password) VALUES ($i , $n, $e, $s);`
  );
  await statement.executeAsync({
    $i: user.id,
    $n: user.name,
    $s: user.password,
    $e: user.email,
  });
}

export async function atualizarTabelaUsuario(id, nome, email, senha) {
  //Void
  await criarTabela();
  const statement = await db.prepareAsync(
    `UPDATE user SET  username = $n, email = $e, password = $s WHERE user_id = $i;`
  );
  await statement.executeAsync({
    $i: id,
    $n: nome,
    $s: senha,
    $e: email,
  });
}

export async function deletarUsuario(id) {
  //Void
  await criarTabela();
  const statement = await db.prepareAsync(`DELETE FROM user WHERE id = $i`);
  await statement.executeAsync({ $i: id });
}

export async function mostrarUsuario() {
  //Array
  await criarTabela();
  let pessoas = await db.getAllAsync(`SELECT * from user;`)
  console.log(pessoas)
  return pessoas[0];
}
