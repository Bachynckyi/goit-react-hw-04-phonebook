import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { useState } from 'react';
import { nanoid } from "nanoid";

export const ContactForm = ({onSubmit, checkName}) => {

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const handleChange = event => {
        const {name, value} = event.currentTarget;
        switch(name){
            case 'name': setName(value);
              break;
            case 'number': setNumber(value);
              break;
            default:
              return;
        }
    };
    
    const handleSubmit = event => {
        event.preventDefault();
        const checkingName = checkName.some(
            checkName => checkName.toLowerCase() === name.toLowerCase()
          );
          if (checkingName) {
            return alert(`${name} is already in contacts`);
          }      
        const newState = { id: nanoid(), name, number};
          onSubmit(newState);
          reset();
    };

    const reset = () => {
        setName("");
        setNumber("");
    }

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <div>
                <label className={css.label}>Name
                    <input
                        value={name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        placeholder='Please enter name'
                        className={css.addInput}
                    />
                </label>
            </div>
            <div>
                <label className={css.label}>Number
                    <input
                        value={number}
                        onChange={handleChange}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        placeholder='Please enter number'
                        className={css.addInput}
                        />
                </label>
            </div>
            <button type='submit' className={css.button_submit}>Add Contact</button>
        </form>
    )
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    checkName: PropTypes.arrayOf(PropTypes.string.isRequired),
  };