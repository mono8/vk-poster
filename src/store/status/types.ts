import * as actions from "./actions";
import { InferValueTypes } from "../../utils/inferValueTypes";

export type StatusActionsType = ReturnType<InferValueTypes<typeof actions>>;
