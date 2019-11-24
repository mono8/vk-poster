import React, { useState, useEffect } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Group } from '../Group';
import styles from './Groups.module.sass';
import clsx from 'clsx';
import {
    checkAllGroups,
    fetchGroups,
    GroupType,
    resetAllGroupsStatuses,
    uncheckAllGroups,
} from '../../store/groups/groupsSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '16px 16px 16px 0',
    },
}));

const Groups: React.FC = (props) => {
    const [shouldCheckAll, setShouldCheckAll] = useState(true);

    const handleClick = () => {
        if (shouldCheckAll) {
            dispatch(checkAllGroups());
        } else {
            dispatch(uncheckAllGroups());
        }

        setShouldCheckAll(!shouldCheckAll);
    };

    const classes = useStyles();

    const token = useAppSelector((state) => state.user.token);
    const dispatch = useAppDispatch();
    const groups = useAppSelector((state) => state.groups);

    const shouldShowResetButton = useAppSelector((state) =>
        state.groups.some((group) => group.status === 'failed' || group.status === 'success')
    );

    useEffect(() => {
        if (token) {
            dispatch(fetchGroups(token));
        }
    }, [token, dispatch]);

    const handleReset = () => {
        dispatch(resetAllGroupsStatuses());
    };

    return groups.length ? (
        <>
            <Button variant='contained' onClick={handleClick} className={classes.root}>
                Поставить/убрать все галки
            </Button>

            {shouldShowResetButton && (
                <Button variant='contained' onClick={handleReset} className={clsx(classes.root)}>
                    Сбросить статусы отправки
                </Button>
            )}

            <div className={styles.wrapper}>
                {groups.map((group: GroupType) => (
                    <Group key={group.id} group={group} />
                ))}
            </div>
        </>
    ) : null;
};

export default Groups;
