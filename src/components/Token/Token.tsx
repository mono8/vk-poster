import React from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./Token.module.sass";
import { VERSION } from "../../consts";
import { connect } from "react-redux";
import { AppStateType } from "../../store";
import { changeToken } from "../../store/user/actions";

type PropsType = {
  changeToken: typeof changeToken;
  token: string;
};

const Token: React.FC<PropsType> = props => {
  const { changeToken, token } = props;

  const getToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    try {
      const url = new URL(e.target.value.replace("#", "?"));
      const accessToken = url.searchParams.get("access_token");
      if (accessToken) changeToken(accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <a
        href={`https://oauth.vk.com/authorize?client_id=7218002&redirect_uri=https://oauth.vk.com/blank.html&display=popup&scope=wall,offline,groups&response_type=token&v=${VERSION}`}
        className={styles.label}
      >
        Получить токен
      </a>
      <TextField
        id="input-token"
        label="Токен"
        variant="outlined"
        onChange={getToken}
        value={token}
      ></TextField>
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    token: state.user.token,
  };
};

export default connect(mapStateToProps, { changeToken })(Token);
