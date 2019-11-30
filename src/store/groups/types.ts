import * as actions from "./actions";
import { InferValueTypes } from "../../utils/inferValueTypes";

export type GroupType = {
  photo_50: string;
  can_post: 0 | 1;
  checked: boolean;
  id: number;
  name: string;
  type: "page" | "group";
  screen_name: string;
};

export type GroupsType = Array<GroupType>;

export type GroupsActionsType = ReturnType<InferValueTypes<typeof actions>>;
