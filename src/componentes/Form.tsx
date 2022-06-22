import React, { useState } from 'react';
import { Sub } from '../types';
//interfaz para que se reciba un estado tipado
interface FormState {
  inputValues: Sub;
}

//Interface para las propiedades del componente
interface FormProps {
  onNewSub: React.Dispatch<React.SetStateAction<Sub[]>>;
}
//quiere decir que form recibira una funcion como propiedad del componente padre
//cada que se mande el handleSubmit se ejecutara la funcion que le llegara en las props

//IDEA el onNEWSUb es setSubs y ea funcion ya tre el estado de subs, el cual se le agregara el inputValues
//REVIEW osea el setSUBS ya trae incluido el estado
const Form = ({ onNewSub }: FormProps) => {
  const [inputValues, setInputValues] = useState<FormState['inputValues']>({
    nick: '',
    subMonths: 0,
    avatar: '',
    description: '',
  });

  const { nick, subMonths, avatar, description } = inputValues;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //NOTE subs es el estado que ya traes, aqui le agregas el input values a subs
    onNewSub((subs) => [...subs, inputValues]);
  };

  //cual es el tipo de un evento?
  //se saca del hover del contexto de una funcion de evento
  //Recordemos esto es para que los inputs values registren el estado
  const handleChange = (
    //REVIEW como hay un text area en los inputs se pone el  | or para el HTMLTextArea Element
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //NOTE evento cambiante en un formulario
    //Quiere decir que es un valor dinamico el del name del objeto  y que ese valor tendra el del value
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          //si hacemos hover en el onchage da el contextos del tipo que deberia llevar la e de la funcion
          onChange={handleChange}
          type="text"
          value={nick}
          name="nick"
          placeholder="nick"
        />
        <input
          onChange={handleChange}
          type="text"
          value={subMonths}
          name="subMonths"
          placeholder="subMonths"
        />
        <input
          onChange={handleChange}
          type="text"
          value={avatar}
          name="avatar"
          placeholder="avatar"
        />
        <textarea
          onChange={handleChange}
          value={description}
          name="description"
          placeholder="description"
        />
        <button>Save new sub!</button>
      </form>
    </div>
  );
};

export default Form;
