import h from 'snabbdom/h';

export function update (state, action) {
    return action.type === 'rowclick' ?
        {...state,
            selectedRowIndex: action.data.index,
            selectedColIndex: -1,
        } :
        action.type === 'colclick' ?
        {...state,
            selectedRowIndex: -1,
            selectedColIndex: action.data.index,
        }

        : state;
}


export default function makeView (dispatch) {
    const tr = makeTrView(dispatch);
    const th = makeThView(dispatch);

    return function view ({selectedRowIndex, selectedColIndex, report}) {
        const thLabels = [
            'type',
            'attribute',
            'position',
            'message',
        ];

        return h('table.table', [
            h('thead', [
                h('tr', thLabels.map((label, colIndex) => th(label, colIndex, selectedColIndex))),
            ]),
            h('tbody', report.map((item, index) =>
                tr(item, index, selectedRowIndex, selectedColIndex)
            )),
        ]);
    };
}

function makeThView (dispatch) {
    return function th (label, colIndex, selectedColIndex) {
        return h('th', {
            style: makeStyle(colIndex, selectedColIndex),
            on: {
                click: () => dispatch(
                    {type: 'colclick', data: {label, index: colIndex}}
                ),
            },
        }, label);
    };
}

function makeTrView (dispatch) {
    return function tr (
        {type, attr, page, table, col, row, message},
        index,
        selectedRowIndex,
        selectedColIndex) {

        return h('tr', {
            class: {
                'table-active': index === selectedRowIndex,
            },
            on: {
                click: () => dispatch({
                    type: 'rowclick',
                    data: {
                        item: {type, attr, page, table, col, row, message},
                        index,
                    },
                }),
            },
        }, [
            h('td.type', {style: makeStyle(0, selectedColIndex)}, type),
            h('td.attr', {style: makeStyle(1, selectedColIndex)}, attr),
            h('td.position', {style: makeStyle(2, selectedColIndex)}, getPosition({page, table, col, row})),
            h('td.message', {style: makeStyle(3, selectedColIndex)}, message),
        ]);
    };
}

const makeStyle = (targetColIndex, selectedColIndex) =>
({background: targetColIndex === selectedColIndex ? '#f0f0f0' : null});

function getPosition ({
    page,
    table,
    col = null,
    row = null,
    message = null}) {

    return [
        messagePart('Page', page),
        messagePart('Table', table),
        messagePart('Col', col),
        messagePart('Row', row),
        messagePart('Message', message),
    ].filter(s => s !== '').join('; ');
}

function messagePart (label, val) {
    return val === null ?
        ''
        : `${label}: ${val}`;
}
