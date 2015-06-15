import React from 'react';
import {Route} from 'react-router';

import Application from 'components/application';

import About from 'views/about';
import Charts from 'views/charts';

let routes = (
    <Route handler={Application}>

        <Route name="charts" path="/" handler={Charts} />

        <Route name="about" handler={About} />

    </Route>
);

export default routes;