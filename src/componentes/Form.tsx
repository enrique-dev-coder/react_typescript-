import React, { useReducer, useState } from 'react';
import { Sub } from '../types';
//interfaz para que se reciba un estado tipado
interface FormState {
  inputValues: Sub;
}

//Interface para las propiedades del componente
interface FormProps {
  onNewSub: (newSub: Sub) => void;
}
//quiere decir que form recibira una funcion como propiedad del componente padre
//cada que se mande el handleSubmit se ejecutara la funcion que le llegara en las props

const INITIAL_STATE = {
  nick: '',
  subMonths: 0,
  avatar: '',
  description: '',
};

//esto se hace para darle un tipo al parametro de action , lo que ocasiona que se le tenga que dar a type
// aqui quiere decir que la accion puede ser de tipo change value o de tipo clear sin payload
type FormReducerAction =
  | {
      type: 'change_value';
      payload: {
        inputName: string;
        inputValue: string;
      };
    }
  | {
      type: 'clear';
    };

//NOTE un reducer recibe dos parametros el estado y la accion
const formReducer = (
  state: FormState['inputValues'],
  action: FormReducerAction
) => {
  switch (action.type) {
    case 'change_value':
      const { inputName, inputValue } = action.payload;
      return {
        ...state,
        [inputName]: inputValue,
      };
    case 'clear':
      return INITIAL_STATE;
  }
};

const Form = ({ onNewSub }: FormProps) => {
  const [inputValues, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const { nick, subMonths, avatar, description } = inputValues;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //NOTE subs es el estado que ya traes, aqui le agregas el input values a subs
    onNewSub(inputValues);
    handleClear();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({
      type: 'change_value',
      payload: {
        inputName: name,
        inputValue: value,
      },
    });
  };

  //uso de useReducer

  const handleClear = () => {
    dispatch({
      type: 'clear',
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
        <button onClick={handleClear} type="button">
          Clear the form
        </button>
        <button type="submit">Save new sub!</button>
      </form>
    </div>
  );
};

export default Form;
