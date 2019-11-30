import { UserActionsType } from "./types";

type UserType = {
  name: string;
  surname: string;
  token: string;
};

export const user = (
  state: UserType = { name: "", surname: "", token: '' },
  action: UserActionsType,
) => {
  switch (action.type) {
    case "[user] Change name":
      return { ...state, name: action.payload.name };
    case "[user] Change surname":
      return { ...state, surname: action.payload.surname };
    case "[user] Change token":
      return { ...state, token: action.payload.token };
    default:
      return state;
  }
};
