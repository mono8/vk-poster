import React from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./Token.module.sass";

type PropsType = {
  getToken: (x: any) => any;
};

const Token: React.FC<PropsType> = props => {
  const { getToken } = props;
  return (
    <div className={styles.container}>
      <a
        href={
          "https://oauth.vk.com/authorize?client_id=7218002&redirect_uri=https://oauth.vk.com/blank.html&display=popup&scope=wall,offline,groups&response_type=token&v=5.103"
        }
        className={styles.label}
      >
        Получить токен
      </a>
      <TextField
        id="input-token"
        label="Токен"
        variant="outlined"
        onChange={getToken}
      ></TextField>
    </div>
  );
};

export default Token;
