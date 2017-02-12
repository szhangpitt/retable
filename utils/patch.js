import snabbdom from 'snabbdom';

import snabbclass from 'snabbdom/modules/class';
import snabbprops from 'snabbdom/modules/props';
import snabbstyle from 'snabbdom/modules/style';
import snabbeventlisteners from 'snabbdom/modules/eventlisteners';
import snabbattributes from 'snabbdom/modules/attributes';

export default snabbdom.init([
    snabbclass,
    snabbprops,
    snabbstyle,
    snabbeventlisteners,
    snabbattributes,
]);
