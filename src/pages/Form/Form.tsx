import { useSelector, useDispatch } from "react-redux";
import { FunctionComponent, FormEvent } from "react";

import { FormProps } from "../../types";

import { selectValue, setValue } from "./formSlice";

const Form: FunctionComponent<FormProps> = (props) => {
  const value = useSelector(selectValue);
  const dispatch = useDispatch();

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(setValue(""));
    props.onSubmit(value.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="login">
      <span className="login__title">Student's name</span>
      <input
        required
        type="text"
        value={value}
        onChange={e => dispatch(setValue(e.target.value))}
      />
      <span className="login__error">{props.error}</span>
      <button type="submit">Login</button>
    </form>
  );
};

export default Form;
