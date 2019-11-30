export const changeToken = (token: string) => {
  return <const>{
    type: "[user] Change token",
    payload: { token },
  };
};

export const changeName = (name: string) => {
  return <const>{
    type: "[user] Change name",
    payload: {
      name,
    },
  };
};

export const changeSurname = (surname: string) => {
  return <const>{
    type: "[user] Change surname",
    payload: {
      surname,
    },
  };
};
