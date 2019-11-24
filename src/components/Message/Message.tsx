import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

type PropsType = {
    message: string;
    onChange(e: any): void;
};

const useStyles = makeStyles((theme) => ({
    textField: {
        width: 400,
    },
}));

const Message: React.FC<PropsType> = (props) => {
    const { message, onChange } = props;
    const classes = useStyles();
    return (
        <TextField
            label='Шапка'
            multiline
            minRows={10}
            maxRows={40}
            className={classes.textField}
            margin='normal'
            variant='outlined'
            value={message}
            onChange={onChange}
        />
    );
};

export default Message;
