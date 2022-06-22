import React from 'react';
import { Sub } from '../types';
//NOTE se crreauna interfaz de la sprops para que TS sepa que le tiene que llegar al componente
interface Props {
  //NOTE usas esto para que acepte children , tambien puedes tipar los children
  children: JSX.Element;
  subs: Array<Sub>;
}

//NOTE List: React.FC<Props> el probema de tipar asi es que aceptas children y de todos tipos

const List = ({ subs, children }: Props) => {
  //REVIEW
  //Tipar una funcion
  //devuelve un array de elementos de JSX
  /*   const renderList = ():JSX.Element[]=>{
    return     subs.map((sub) => (
      <li key={sub.nick}>
        <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
        <h4>
          {sub.nick}(<small>{sub.subMonths}</small>)
        </h4>
        <p>{sub.description?.substring(0, 100)}</p>
      </li>
    ))
  } */

  return (
    <ul>
      {
        //NOTE aqui por ts detecto que ya era un array
        //Note aparte aqui por ser TS te da todos las opciones del array para el map
        subs.map((sub) => (
          <li key={sub.nick}>
            <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
            <h4>
              {sub.nick}(<small>{sub.subMonths}</small>)
            </h4>
            <p>{sub.description?.substring(0, 100)}</p>
          </li>
        ))
      }
      {children}
    </ul>
  );
};

export default List;
