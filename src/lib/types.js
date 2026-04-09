/**
 * @typedef {string | { label: string, color?: string }} TagValue
 */

/**
 * @typedef {Object} ColumnSchema
 * @property {string} key - The property key to read from each row object
 * @property {string} label - The column header display name
 * @property {'string'|'number'|'boolean'|'icon'|'date'|'datetime'|'tags'} type - The data type of the column
 * @property {number} [minWidth] - Minimum column width in pixels
 * @property {{ getValue: (row: Record<string, any>) => string }} [tooltip] - Optional tooltip; triggers on hover
 */

/**
 * @typedef {Object} TableEvents
 * @property {(row: Record<string, any>) => void} [onRowClick] - Fired on row click; highlights the clicked row
 * @property {(value: any, key: string, row: Record<string, any>) => void} [onCellClick] - Fired on cell click
 * @property {(value: any, key: string, row: Record<string, any>) => void} [onCellHover] - Fired on cell mouseenter
 * @property {(key: string) => void} [onHeaderClick] - Fired on header click; enables column sort (asc → desc → original)
 */

/**
 * @typedef {Object} TableAddOns
 * @property {{ pageSize?: number }} [pagination] - When present, enables pagination below the table.
 *   pageSize defaults to 50.
 */

export {};
