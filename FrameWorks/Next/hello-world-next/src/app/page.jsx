//arrow function
// const Home = ()=>{}


//functio

//function Home() {}

//export default function Home

//export fucntion

import style from './page.module.css';

export default function Home() {
  return(
    <main className={style.container}>
      <h1 className={style.title}>Hello World</h1>
      <p className={style.subtitle}>Minha Primeira Página Next</p>
    </main>
  );
}; 