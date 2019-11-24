import React from 'react';
import { Checkbox, Paper, makeStyles } from '@material-ui/core';

import styles from './Group.module.sass';
import clsx from 'clsx';
import { useAppDispatch } from '../../utils/hooks';
import { GroupType, toggleGroup } from '../../store/groups/groupsSlice';
import { blue, green, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    isChecked: {
        backgroundColor: blue[100],
    },
    success: {
        backgroundColor: green[200],
    },
    error: {
        backgroundColor: red[300],
    },
}));

type PropsType = {
    group: GroupType;
};

const Group: React.FC<PropsType> = (props) => {
    const { group } = props;

    const dispatch = useAppDispatch();

    const handleChange = () => {
        dispatch(toggleGroup(group.id));
    };
    const classes = useStyles();

    return (
        <Paper
            className={clsx(
                styles.wrapper,
                group.checked && classes.isChecked,
                group.status === 'success' && classes.success,
                group.status === 'failed' && classes.error
            )}
        >
            <Checkbox
                checked={group.checked}
                onChange={handleChange}
                color='primary'
                inputProps={{
                    'aria-label': 'secondary checkbox',
                }}
            />
            <span className={styles.groupName} onClick={handleChange}>
                {group.name}
            </span>
            <a
                href={'https://vk.com/' + group.screen_name}
                className={styles.link}
                target='_blank'
                rel='noreferrer'
            >
                <img className={styles.image} src={group.photo_50} alt={group.screen_name} />
            </a>
        </Paper>
    );
};

export default Group;
