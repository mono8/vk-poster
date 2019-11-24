import React from 'react';
import TextField from '@material-ui/core/TextField';
import styles from './Token.module.sass';
import { API_VERSION } from '../../consts';
import { changeToken } from '../../store/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

const Token: React.FC = () => {
    const token = useAppSelector((state) => state.user.token);

    const dispatch = useAppDispatch();

    const getToken = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) return;

        try {
            const url = new URL(event.target.value.replace('#', '?'));
            const accessToken = url.searchParams.get('access_token');
            if (accessToken) dispatch(changeToken(accessToken));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <a
                href={`https://oauth.vk.com/authorize?client_id=7218002&redirect_uri=https://oauth.vk.com/blank.html&display=popup&scope=wall,offline,groups&response_type=token&v=${API_VERSION}`}
                className={styles.label}
            >
                Получить токен
            </a>
            <TextField
                id='input-token'
                label='Токен'
                variant='outlined'
                onChange={getToken}
                value={token}
            ></TextField>
        </div>
    );
};

export default Token;
