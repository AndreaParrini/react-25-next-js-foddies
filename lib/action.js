'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isValidText(text){
  return !text || text.trim() === ''
}

// per trasformarla in un azione lato server bisogna usare async prima della funzione
export async function shareMeal(prevState, formData){
  // usando questa direttiva all'interno di una funzione si va a specificare che questa deve essere eseguita SOLO lato server
  /* 'use server'; */

  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  }

  if(
    isValidText(meal.title) ||
    isValidText(meal.summary) ||
    isValidText(meal.instructions) ||
    isValidText(meal.creator) ||
    isValidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ){
    return{
      message: 'Invalid input.'
    }
  }

  await saveMeal(meal);
  // con questa funzione NextJs permette di rivalidare il contenuto della cache di quel determinato percorso
  // di default solo la pagina del percorso verrà riconvalidata.
  // se si vogliono riconvalidare anche i percorsi annidati e quindi le pagine annidate va aggiunta una proprietà 'layout'
  // revalidatePath('/meals', 'layout');
  revalidatePath('/meals');
  redirect('/meals');
  }