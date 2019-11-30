import React, { useState, useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Group } from "../Group";
import { AppStateType } from "../../store";
import { connect } from "react-redux";
import { GroupsType, GroupType } from "../../store/groups/types";
import {
  checkAllGroups,
  uncheckAllGroups,
  setGroups,
} from "../../store/groups/actions";
import styles from "./Groups.module.sass";
import jsonp from "jsonp";
import { VERSION } from "../../consts";
import { resetStatuses } from "../../store/status/actions";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "16px 16px 16px 0",
  },
}));

type PropsType = {
  groups: GroupsType;
  checkAllGroups: typeof checkAllGroups;
  uncheckAllGroups: typeof uncheckAllGroups;
  setGroups: typeof setGroups;
  token: string;
  resetStatuses: typeof resetStatuses;
  showReset: boolean;
};

const Groups: React.FC<PropsType> = props => {
  const {
    groups,
    checkAllGroups,
    uncheckAllGroups,
    setGroups,
    token,
    resetStatuses,
    showReset,
  } = props;
  const [shouldCheckAll, setShouldCheckAll] = useState(true);
  const handleClick = () => {
    shouldCheckAll ? checkAllGroups() : uncheckAllGroups();
    setShouldCheckAll(!shouldCheckAll);
  };
  const classes = useStyles();

  useEffect(() => {
    token &&
      jsonp(
        `https://api.vk.com/method/groups.get?fields=can_post&count&extended=1&access_token=${token}&v=${VERSION}`,
        undefined,
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            setGroups(
              data.response.items.map((group: GroupType) => ({
                ...group,
                checked: false,
              })),
            );
          }
        },
      );
  }, [token]);

  return groups.length ? (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        className={classes.root}
      >
        Поставить/убрать все галки
      </Button>
      {showReset && (
        <Button
          variant="contained"
          onClick={resetStatuses}
          className={clsx(classes.root)}
        >
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

const mapStateToProps = (state: AppStateType) => {
  const showReset = Boolean(
    state.status.success.length || state.status.error.length,
  );
  return {
    groups: state.groups,
    token: state.user.token,
    showReset,
  };
};

export default connect(mapStateToProps, {
  checkAllGroups,
  uncheckAllGroups,
  setGroups,
  resetStatuses,
})(Groups);
