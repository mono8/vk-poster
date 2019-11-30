import { GroupsType } from "./types";

export const setGroups = (groups: GroupsType) => {
  return <const>{
    type: "[groups] Set groups",
    payload: {
      groups,
    },
  };
};

export const toggleGroup = (id: number) => {
  return <const>{
    type: "[groups] Toggle group",
    payload: {
      id,
    },
  };
};

export const checkAllGroups = () => {
  return <const>{
    type: "[groups] Check all groups",
  };
};

export const uncheckAllGroups = () => {
  return <const>{
    type: "[groups] Uncheck all groups",
  };
};

