import {Direction} from "../../@types";

export type SortedChangeFunction = ((args: {columnName: string, direction: Direction}) => void) | null
