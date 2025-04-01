'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

// per trasformarla in un azione lato server bisogna usare async prima della funzione
export async function shareMeal(formData){
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

    await saveMeal(meal);
    redirect('/meals');
  }