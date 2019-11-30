import React from "react";
import { Checkbox, Paper, makeStyles } from "@material-ui/core";

import styles from "./Group.module.sass";
import { GroupType } from "../../store/groups/types";
import { toggleGroup } from "../../store/groups/actions";
import { connect } from "react-redux";
import { AppStateType } from "../../store";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  isChecked: {
    backgroundColor: "#b3e5fc",
  },
  success: {
    backgroundColor: "#b2ff59",
  },
  error: {
    backgroundColor: "#ff6e40",
  },
}));

type PropsType = {
  group: GroupType;
  toggleGroup: typeof toggleGroup;
  successful: number[];
  rejected: number[];
};

const Group: React.FC<PropsType> = props => {
  const { group, toggleGroup, successful, rejected } = props;
  const handleChange = () => {
    toggleGroup(group.id);
  };
  const classes = useStyles();
  return (
    <Paper
      className={clsx(
        styles.wrapper,
        group.checked && classes.isChecked,
        successful.includes(group.id) && classes.success,
        rejected.includes(group.id) && classes.error,
      )}
    >
      <Checkbox
        checked={group.checked}
        onChange={handleChange}
        color="primary"
        inputProps={{
          "aria-label": "secondary checkbox",
        }}
      />
      <span className={styles.groupName} onClick={handleChange}>
        {group.name}
      </span>
      <a
        href={"https://vk.com/" + group.screen_name}
        className={styles.link}
        target="_blank"
      >
        <img className={styles.image} src={group.photo_50} />
      </a>
    </Paper>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    successful: state.status.success,
    rejected: state.status.error,
  };
};

export default connect(mapStateToProps, { toggleGroup })(Group);
