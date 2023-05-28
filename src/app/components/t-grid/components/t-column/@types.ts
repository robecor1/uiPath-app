import {Direction} from "../../@types";

export type SortedChangeFunction = ((args: {columnName: string, direction: Direction | null}) => void) | null
