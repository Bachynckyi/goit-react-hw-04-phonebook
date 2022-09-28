import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { Component } from 'react';
import { nanoid } from "nanoid";

export class ContactForm extends Component {
    state = {
        name: '',
        number: '',
      }
    
    
    handleChange = event => {
        const {name, value } = event.currentTarget;
        this.setState({ [name]: value })
    };
    
    handleSubmit = event => {
        const { name, number } = this.state;
        event.preventDefault();

        const checkName = this.props.checkName.some(
            contactName => name.toLowerCase() === contactName.toLowerCase()
          );
          if (checkName) {
            return alert(`${name} is already in contacts`);
          }      
        
        const newState = { id: nanoid(),name, number};
          this.props.onSubmit(newState);
          this.reset();
    };

    reset = () => {
        this.setState({ name: '', number: '' })
    }

    render() {
    return (
        <form onSubmit={this.handleSubmit} className={css.form}>
            <div>
                <label className={css.label}>Name
                    <input
                        value={this.state.name}
                        onChange={this.handleChange}
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
                        value={this.state.number}
                        onChange={this.handleChange}
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
    )}
}



ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    checkName: PropTypes.arrayOf(PropTypes.string.isRequired),
  };