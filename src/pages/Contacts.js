import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/contacts/operations';
import { selectError, selectIsLoading, selectContacts } from 'redux/selectors';
import css from './Contacts.module.css';
import Loader from 'components/Loader/Loader';

export default function Contacts() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && contacts.length === 0) {
      const timer = setTimeout(() => {
        setShowEmptyMessage(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isLoading, contacts.length]);

  return (
    <div className={css.contacts}>
      <ContactForm />
      <h2 className={css.phonebook__app}>Contacts</h2>
      {isLoading && <Loader />}
      {contacts.length > 0 && <Filter />}
      {contacts.length === 0 && showEmptyMessage && (
        <p>Your phonebook is empty. Add first contact!</p>
      )}
      {contacts.length > 0 && !isLoading && error !== null && (
        <p>Error occurred while loading contacts. Please try again.</p>
      )}
      {contacts.length > 0 && <ContactList />}
    </div>
  );
}
