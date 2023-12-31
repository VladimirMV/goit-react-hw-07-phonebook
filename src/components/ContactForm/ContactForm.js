import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/contacts-operations';
import s from './ContactForm.module.css';

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const dispatch = useDispatch();

  const onAddContact = data => {
    console.log('data', data, addContact(data));
    dispatch(addContact(data));
  };
  const onSubmitHandler = values => {
    onAddContact({ ...values });
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          type="text"
          placeholder="Evgen Vlasov"
          name="name"
          {...register('name', {
            required: `This field is required`,
            pattern: {
              value:
                /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
              message: 'Enter a valid name',
            },
          })}
        />
        {errors.name && <p className={s.error}>{errors.name.message}</p>}
      </label>
      <label className={s.label}>
        Number
        <input
          className={s.input}
          type="text"
          name="number"
          {...register('number', {
            required: `This field is required`,
            minLength: {
              value: 7,
              message: `Min 7 numbers. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`,
            },
            pattern:
              /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
          })}
          placeholder="111-11-11"
        />
        {errors.number && <p className={s.error}>{errors.number.message}</p>}
      </label>
      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};
