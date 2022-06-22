import { useState, useEffect, useRef } from 'react';
import List from './componentes/List';
import './App.css';
import Form from './componentes/Form';
import { Sub } from './types';
const initial_state = [
  {
    nick: 'dapelu',
    subMonths: 3,
    avatar: 'https://i.pravatar.cc/150?img=3',
    description: 'Dapelu hace de moderador a veces',
  },
  {
    //Note aqui la descripcion es un parametro que se queda como opcional
    nick: 'sergio_serrano',
    subMonths: 7,
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

//una interfaz es el contrato que tiene que tener un objeto o una clase
//NOTe en la interfaz se definene todos los tipos que tendra el objeto, en este caso del estado

//IDEA separar los estados del componente por fuera del compoentne en una interfaz
//IDEA Esto es para tipar los estados

//aqui subs es el tipo array que recibe la interfaz importada de Sub
interface AppState {
  //tipo array con interfaz de sub
  subs: Array<Sub>;
  newSubsNumber: number;
}

//Note en typescript no te dejan cambiar de tipos en los estados

function App() {
  //Note con los <> inicializas el tipo y la interfaz
  //NOTe el use state recibe un array del tipo o interfaz sub

  //IDEA de la interfaz app state agarra subs
  const [subs, setSubs] = useState<AppState['subs']>([]);
  const [newSubsNumber, setNewSubsNumber] =
    useState<AppState['newSubsNumber']>(0);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //NOTe aqui esto te deja porque el initial state tiene el contrato de interfaz que se necesita
    //Si por ejemplo otro le quita el nick ya no compila porque la interface le esta diciendo que faltan tipos y propiedades
    setSubs(initial_state);
  }, []);
  const handleNewSub = (newSub: Sub): void => {
    setSubs((subs) => [...subs, newSub]);
  };

  return (
    <div className="App" ref={divRef}>
      <h1>midu subs</h1>
      {/*aqui detecta que debe recibir una propiedad de subs*/}
      <List subs={subs}>
        <div>
          <p>hola soy el children xd</p>{' '}
        </div>
      </List>
      <Form
        //el tipo Dispatch<SetStateAction<Sub[]>> es el tipo de esa funcion de react
        //osea esas funciones curiosas que apuntna a otra
        onNewSub={handleNewSub}
      />
    </div>
  );
}

export default App;
