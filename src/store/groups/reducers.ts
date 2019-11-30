import { GroupsActionsType, GroupsType } from "./types";

export const groups = (state: GroupsType = [], action: GroupsActionsType) => {
  switch (action.type) {
    case "[groups] Set groups":
      return action.payload.groups;
    case "[groups] Toggle group":
      return state.map(group =>
        group.id === action.payload.id
          ? { ...group, checked: !group.checked }
          : group,
      );
    case "[groups] Check all groups":
      return state.map(group => ({ ...group, checked: true }));
    case "[groups] Uncheck all groups":
      return state.map(group => ({ ...group, checked: false }));
    default:
      return state;
  }
};
