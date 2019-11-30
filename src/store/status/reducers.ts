import { StatusActionsType } from "./types";

type StatusType = {
  success: number[];
  error: number[];
};

export const status = (
  state: StatusType = { success: [], error: [] },
  action: StatusActionsType,
) => {
  switch (action.type) {
    case "[status] Success":
      return { ...state, success: [...state.success, action.payload.id] };
    case "[status] Error":
      return { ...state, error: [...state.error, action.payload.id] };
    case '[status] Reset all':
      return { success: [], error: [] }
    default:
      return state;
  }
};
