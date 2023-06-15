import s from './ContactList.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// toastify
import { toast } from 'react-toastify';
import { toastifyOptions } from 'utils/toastifyOptions';

// redux
import { fetchContacts } from 'redux/contacts/contacts-operations';
import {
  selectContacts,
  selectIsLoading,
  selectError,
  selectFilteredContacts,
  selectFilter,
} from 'redux/selectors';

// import Loader from 'components/Loader/Loader';
import { deleteContact } from 'redux/contacts/contacts-operations';

function ContactList() {
  // const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const result = useSelector(selectFilteredContacts);

  const getFilteredContacts = data => {
    if (filter.toLowerCase() && !data.length) {
      toast.warn(`No contacts matching your request`, toastifyOptions);
    }
    return data;
  };

  const filteredContacts = getFilteredContacts(result);

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <>
      {error && !isLoading && <div>Ooops, error...</div>}

      <ul className={s.list}>
        {filteredContacts.map(({ name, number, id }) => {
          return (
            <li className={s.item} key={id}>
              <p className={s.info}>
                {name}: {number}
              </p>
              <button
                className={s.btn}
                type="button"
                onClick={() => onDeleteContact(id)}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactList;
