import Router, {Route} from 'react-router';

import Application from 'components/application';
import About from 'components/about';
import Charts from 'components/charts';
import TrackPlayer from 'components/trackPlayer';

let routes = (
    <Route handler={Application}>

        <Route name="charts" path="/" handler={Charts} />
        <Route name="about" path="/about" handler={About} />

    </Route>
);

export default routes;