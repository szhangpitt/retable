import run from './utils/run';
import reportTableView, {update} from './components/report-table';
import reportData from './data/report';

const target = document.getElementById('target');
const initState = {
    report: reportData,
    selectedRowIndex: -1,
    selectedColIndex: -1,
};

const {allState} = run(
    initState,
    update,
    reportTableView,
    target
);

allState
.subscribe(as => {
    console.log('all state', as);
})
