import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import styles from "./SendingForm.module.sass";
import jsonp from "jsonp";
import { AppStateType } from "../../store";
import { connect } from "react-redux";
import { VERSION } from "../../consts";
import { GroupType, GroupsType } from "../../store/groups/types";
import { Message } from "../Message";
import { requestSuccess, requestError } from "../../store/status/actions";
import { uncheckAllGroups } from "../../store/groups/actions";

const reflect = (p: Promise<any>) =>
  p.then(
    v => ({ v, status: "fulfilled" }),
    e => ({ e, status: "rejected" }),
  );

type PropsType = {
  token: string;
  groups: GroupsType;
  requestSuccess: typeof requestSuccess;
  requestError: typeof requestError;
  uncheckAllGroups: typeof uncheckAllGroups;
};

const SendingForm: React.FC<PropsType> = props => {
  const {
    token,
    groups,
    requestSuccess,
    requestError,
    uncheckAllGroups,
  } = props;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(localStorage.getItem("message") || "");
  const [photoUrl, setPhotoUrl] = useState(localStorage.getItem("photo") || "");

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handlePhotoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoUrl(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("message", message);
    return () => {};
  }, [message]);
  useEffect(() => {
    localStorage.setItem("photo", photoUrl);
    return () => {};
  }, [photoUrl]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let interval = 2;
    if (message) {
      setLoading(true);
      // uncheckAllGroups();
      await Promise.all(
        groups
          .filter(group => group.checked)
          .map(group => {
            interval += 2;
            return reflect(
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  sendMessage(group, resolve, reject);
                }, 500 * interval);
              }),
            );
          }),
      );
      setLoading(false);
    }
  };

  const sendMessage = (
    group: GroupType,
    onSuccess: Function,
    onError: Function,
  ) => {
    jsonp(
      `https://api.vk.com/method/wall.post?owner_id=-${group.id}&message=${message}&attachments=${photoUrl}&access_token=${token}&v=${VERSION}`,
      undefined,
      (err, data) => {
        if (err) {
          console.log(`group ${group.id} ` + err.message);
          requestError(group.id);
          onError();
        } else {
          requestSuccess(group.id);
          onSuccess();
        }
      },
    );
  };

  return (
    <form className={styles.form}>
      <Message message={message} onChange={handleMessageChange} />
      <div className={styles.photoInput}>
        <TextField
          fullWidth
          label="Фото"
          variant="outlined"
          value={photoUrl}
          onChange={handlePhotoUrlChange}
        />
      </div>
      <Button
        variant="contained"
        disabled={loading}
        onClick={handleSubmit}
        type="submit"
      >
        {loading ? "Идет отправка..." : "Разослать"}
      </Button>
    </form>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    token: state.user.token,
    groups: state.groups,
  };
};

export default connect(mapStateToProps, {
  requestSuccess,
  requestError,
  uncheckAllGroups,
})(SendingForm);
