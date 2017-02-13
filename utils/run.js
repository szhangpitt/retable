import patch from './patch';
import Rx from 'rxjs/Rx';

function makeDispatch (initState, update) {
    const bsub = new Rx.BehaviorSubject(initState);

    return {
        allState: bsub,
        dispatch (action) {
            const newState = update(bsub.getValue(), action);
            bsub.next(newState);
        },
    };
}

// initState ---i----------
// newState  -------u---u--
// vnode     ---v---v---v--
// patch     ---p---p---p--

export default function run (initState, update, viewFn, target) {
    const {allState, dispatch} = makeDispatch(initState, update);
    const view = viewFn(dispatch);

    const subscriber =
    allState
    .map(view)
    .startWith(target)
    .pairwise()
    .subscribe(
        ([prevVnode, curVnode]) =>
        patch(prevVnode, curVnode)
    );

    return {
        unsubscribe () {
            subscriber.unsubscribe();
        },
        allState: allState,
    };
}

