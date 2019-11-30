import React from "react";
import { TextField, makeStyles } from "@material-ui/core";

type PropsType = {
  message: string;
  onChange: (x: any) => void;
};

const useStyles = makeStyles(theme => ({
  textField: {
    width: 400,
  },
}));

const Message: React.FC<PropsType> = props => {
  const { message, onChange } = props;
  const classes = useStyles();
  return (
    <TextField
      label="Шапка"
      multiline
      rows={10}
      rowsMax={40}
      className={classes.textField}
      margin="normal"
      variant="outlined"
      value={message}
      onChange={onChange}
    />
  );
};

export default Message;
