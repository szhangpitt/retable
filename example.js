import Rx from 'rxjs/Rx';
import h from 'snabbdom/h';
import run from './utils/run';

const view = (n) => {
    return h('div', [
        h('p', `Your number is ${n}!`),
    ]);
};

const target = document.getElementById('target');
const stream = Rx.Observable
.interval(500);

const teardown = run(stream, view, target);

setTimeout(teardown, 5000);
