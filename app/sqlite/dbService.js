import * as SQLite from "expo-sqlite";

let db;

async function abrirBanco() {
  db = await SQLite.openDatabaseAsync("claudi");
}

async function drop() {
  await db.execAsync("DROP TABLE IF EXISTS user");
}

export async function criarTabela() {
  await abrirBanco();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS fixados (
      id_timeline INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`
  );
}

export async function adicionarFixado(id) {
  await criarTabela()
  let timelinesWithId = await db.getAllAsync(`SELECT * FROM fixados WHERE id_timeline = ${id}`)

  if (!timelinesWithId.length > 0) {
    let user = await mostrarUsuario()
    const statement = await db.prepareAsync(
      `INSERT INTO fixados (id_timeline, user_id) VALUES ($i , $u);`
    )

    await statement.executeAsync({
      $i: id,
      $u: user.id
    });
  }
}

export async function mostrarFixados() {
  let user = await mostrarUsuario()
  await criarTabela();
  let tabelas = await db.getAllAsync(`SELECT * FROM fixados WHERE user_id = ${user.id}`)

  let idFixados = []
  tabelas.forEach(tabela => {
    idFixados.push(tabela["id_timeline"])
  })
  console.log(idFixados)
  return idFixados
  
}

export async function deleteFixado(id) {
  await criarTabela()
  let user = await mostrarUsuario()
  let timelinesWithId = await db.getAllAsync(`SELECT * FROM fixados WHERE id_timeline = ${id}`)
  console.log(timelinesWithId)

  if (timelinesWithId.length > 0) {
    const statement = await db.prepareAsync(
      `DELETE FROM fixados WHERE id_timeline = $i AND user_id = $u;`
    )

    await statement.executeAsync({
      $i: id,
      $u: user.id
    });
  }
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
    `UPDATE user SET  username = $n, email = $e, password = $s WHERE id = $i;`
  );
  await statement.executeAsync({
    $i: id,
    $n: nome,
    $s: senha,
    $e: email,
  });
}

export async function deletarUsuario() {
  //Void
  await criarTabela();
  await db.execAsync(`DELETE FROM user`);

}

export async function mostrarUsuario() {
  //Array
  await criarTabela();
  let pessoas = await db.getAllAsync(`SELECT * from user;`)
  return pessoas[0];
}
