export type TGridDataItem = Record<string, string | number | Date | undefined>

export type DataPerKey<T> = Record<keyof T, string[] | number[] | Date[]> | {}

// Null value for direction will mean no sorting for that field (or default sorting)
export type Direction = 'asc' | 'desc' | null
