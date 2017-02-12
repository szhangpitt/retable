import patch from './patch';

export default function run (stream, view, target) {
    const subscriber = stream
    .map(view)
    .startWith(target)
    .pairwise()
    .subscribe(
        ([prevVnode, curVnode]) =>
        patch(prevVnode, curVnode)
    );

    return function un () {
        subscriber.unsubscribe();
    };
}
