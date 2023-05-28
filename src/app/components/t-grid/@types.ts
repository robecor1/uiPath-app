export type TGridDataItem = Record<string, string | number | Date | undefined>

export type DataPerKey<T> = Record<keyof T, string[] | number[] | Date[]> | {}

export type Direction = 'asc' | 'desc'
