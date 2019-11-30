import * as actions from "./actions";
import { InferValueTypes } from "../../utils/inferValueTypes";

export type UserActionsType = ReturnType<InferValueTypes<typeof actions>>;
