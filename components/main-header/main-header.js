import Link from "next/link";
import Image from "next/image";

import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";


export default function MainHeader(){
    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href='/'>
                    <Image src={logoImg} alt='A plate with food on it' priority/> 
                    {/* NEL SRC ABBIAMO PASSATO L'INTERNO OGGETTO CHE SI GENERA IMPORTANDO IL LOGO IN QUANTO CI SONO INFORMAZIONI UTILI AL COMPONENTE IMAGE */}
                    {/* ABBIAMO AGGIUNTO LA PROPRITA' PRIORITY PER DIRGLI DI CARICARE L'IMMAGINA IL PRIMA POSSIBILE */}
                    Next Level Food
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href='/meals'>Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href='/community'>Foddies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
   
    )
}