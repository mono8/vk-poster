import React from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./Token.module.sass";

const Token: React.FC = () => {
  return (
    <div className={styles.container}>
      <a className={styles.label}>Получить токен</a>
      <TextField id="input-token" label="Токен" variant="outlined"></TextField>
    </div>
  );
};

export default Token;
