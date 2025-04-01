import fs from 'node:fs'

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db')

export async function getMeals(){
    // abbiamo aggiunto questa premssa solo a scopo dimostrativo in quanto nei componenti in next possiamo usare async
    await new Promise((resolve) => setTimeout(resolve, 2000)) 

    // throw new Error('Failed to fetch meals')

    return db.prepare('SELECT * FROM meals').all();
    // all() per recuperare tutti i dati ottenuti dalla query
    // run() serve quando si volgiono effettuare delle modifiche
    // get() solo quando si vuole recuperare un solo valore
}

export function getMeal(slug){
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName= `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error){
            throw new Error('Saving image failed')
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(
        `INSERT INTO meals
            (title, summary, instructions, creator, creator_email, slug, image)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @slug,
            @image
        )`
    ).run(meal)
}