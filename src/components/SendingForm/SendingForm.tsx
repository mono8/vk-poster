import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './SendingForm.module.sass';
import { Message } from '../Message';
import { useAppDispatch } from '../../utils/hooks';
import { sendMessagesToAllGroups } from '../../store/groups/groupsSlice';

const SendingForm: React.FC = (props) => {
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState(localStorage.getItem('message') || '');
    const [photoUrl, setPhotoUrl] = useState(localStorage.getItem('photo') || '');

    const dispatch = useAppDispatch();

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handlePhotoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhotoUrl(e.target.value);
    };

    useEffect(() => {
        localStorage.setItem('message', message);
    }, [message]);

    useEffect(() => {
        localStorage.setItem('photo', photoUrl);
    }, [photoUrl]);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (message) {
            setPending(true);
            await dispatch(sendMessagesToAllGroups({ message, photoUrl }));
            setPending(false);
        }
    };

    return (
        <form className={styles.form}>
            <Message message={message} onChange={handleMessageChange} />
            <div className={styles.photoInput}>
                <TextField
                    fullWidth
                    label='Фото'
                    variant='outlined'
                    value={photoUrl}
                    onChange={handlePhotoUrlChange}
                />
            </div>
            <Button
                variant='contained'
                disabled={pending || !message}
                onClick={handleSubmit}
                type='submit'
            >
                {pending ? 'Идет отправка...' : 'Разослать'}
            </Button>
        </form>
    );
};

export default SendingForm;
