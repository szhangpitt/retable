const report = [
    { type: 'table', attr: 'scale',    page: 1, table: 1 },
    { type: 'col',   attr: 'duration', page: 1, table: 1, col: 1 },
    { type: 'row',   attr: 'currency', page: 2, table: 3, row: 3 },
    { type: 'cell',  attr: 'scale',    page: 4, table: 1, col: 4, row: 3 },
    { type: 'cell',  attr: 'scale',    page: 5, table: 3, col: 2, row: 1, message: 'Something went wrong!' },
];

export default report;
