import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../store";
import jsonp from "jsonp";
import { changeSurname, changeName } from "../../store/user/actions";
import { VERSION } from "../../consts";
import { Token } from "../Token";

type PropsType = {
  name: string;
  surname: string;
  token: string;
  changeSurname: typeof changeSurname;
  changeName: typeof changeName;
};

const Account: React.FC<PropsType> = props => {
  const { token, changeSurname, changeName, name, surname } = props;
  useEffect(() => {
    token &&
      jsonp(
        `https://api.vk.com/method/account.getProfileInfo?&access_token=${token}&v=${VERSION}`,
        undefined,
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            changeName(data.response.first_name);
            changeSurname(data.response.last_name);
          }
        },
      );
    return () => {};
  }, [token]);

  return name && surname && token ? (
    <div>
      <h1>Аккаунт</h1>
      <div>{`${name} ${surname}`}</div>
    </div>
  ) : (
    <Token />
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    token: state.user.token,
    name: state.user.name,
    surname: state.user.surname,
  };
};

export default connect(mapStateToProps, { changeSurname, changeName })(Account);
