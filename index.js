import Rx from 'rxjs/Rx';
import run from './utils/run';

import reportTableView from './components/report-table';
import reportData from './data/report';

const target = document.getElementById('target');
const stream = Rx.Observable
.of({report: reportData, selectedRowIndex: 1});

const handler = {
    rowclick: (item, index) => {
        console.log(`row clicked: ${JSON.stringify(item)}, ${index}`);
    },
    colclick: (label, index) => {
        console.log(`col clicked: ${label}, ${index}`);
    },
};

run(stream, reportTableView(handler), target);
