import sql from 'better-sqlite3';

const db = sql('meals.db')

export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve, 2000)) // abbiamo aggiunto questa premssa solo a scopo dimostrativo in quanto nei componenti in next possiamo usare async
    return db.prepare('SELECT * FROM meals').all();
    // all() per recuperare tutti i dati ottenuti dalla query
    // run() serve quando si volgiono effettuare delle modifiche
    // get() solo quando si vuole recuperare un solo valore
}