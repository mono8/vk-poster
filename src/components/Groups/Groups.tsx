import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    width: 50,
    height: 50,
  },
}));

type PropsType = {
  groups: any;
};

const Groups: React.FC<PropsType> = props => {
  const { groups } = props;
  const handleToggle = () => {};
  const classes = useStyles();
  console.log(groups);

  return (
    <List>
      {groups.map((group: any) => {
        const labelId = `checkbox-list-label-${group.id}`;
        return (
          <ListItem
            key={group.id}
            role={undefined}
            dense
            button
            onClick={handleToggle}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={false}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={group.name} />
            <ListItemSecondaryAction>
              <Avatar
                variant="square"
                src={group.photo_50}
                className={classes.bigAvatar}
              ></Avatar>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Groups;
