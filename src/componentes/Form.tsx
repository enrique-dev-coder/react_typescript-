import { Sub } from '../types';

import UseNewSubForm from '../hooks/useNewSubForm';

interface FormProps {
  onNewSub: (newSub: Sub) => void;
}
//quiere decir que form recibira una funcion como propiedad del componente padre
//cada que se mande el handleSubmit se ejecutara la funcion que le llegara en las props

const Form = ({ onNewSub }: FormProps) => {
  const [inputValues, dispatch] = UseNewSubForm();
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
