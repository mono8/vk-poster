import React, { useEffect } from 'react';
import { Token } from '../Token';
import { fetchName } from '../../store/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

const Account: React.FC = (props) => {
    const dispatch = useAppDispatch();

    const token = useAppSelector((state) => state.user.token);
    const name = useAppSelector((state) => state.user.name);

    useEffect(() => {
        if (token) {
            dispatch(fetchName(token));
        }
    }, [token, dispatch]);

    const hasToken = name && token;

    return hasToken ? (
        <div>
            <h1>Аккаунт</h1>
            <div>{name}</div>
        </div>
    ) : (
        <Token />
    );
};

export default Account;
