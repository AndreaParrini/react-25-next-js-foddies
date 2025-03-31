import classes from './loading.module.css'

// questa pagina verrà mostrato ogni qual volta ci sia un caricamento da parte del sito e sostituirà il contenuto ma menterrà il layout.
export default function MealsLoadingPage(){
    return <p className={classes.loading}>Fetching meals...</p>
}