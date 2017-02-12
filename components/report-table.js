import h from 'snabbdom/h';
import Rx from 'rxjs/Rx';

export default function makeView (handler, observer) {
    const tr = makeTrView(handler);
    const th = makeThView(handler, observer);

    return function view ({selectedRowIndex, report}) {
        const thLabels = [
            'type',
            'attribute',
            'position',
            'message',
        ];

        return h('table.table', [
            h('thead', [
                h('tr', thLabels.map(th)),
            ]),
            h('tbody', report.map((item, index) =>
                tr(item, index, selectedRowIndex)
            )),
        ]);
    };
}

function makeThView (handler, observer) {
    return function th (label, colIndex) {
        return h('th', {
            on: {
                click: () => observer.next(label, colIndex),
            },
        }, label);
    };
}

function makeTrView (handler) {
    return function tr ({type, attr, page, table, col, row, message}, index, selectedRowIndex) {
        return h('tr', {
            class: {
                'table-active': index === selectedRowIndex,
            },
            on: {
                click: handler.rowclick.bind(
                    handler, {type, attr, page, table, col, row, message}, index),
            },
        }, [
            h('td.type', type),
            h('td.attr', attr),
            h('td.position', getPosition({page, table, col, row})),
            h('td.message', message),
        ]);
    };
}

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
