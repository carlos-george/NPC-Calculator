import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Calculator from './pages/Calculator';
import CompanyRegister from './pages/CompanyRegister';
import LandingPage from './pages/LandingPage';
import SurveyDetail from './pages/SurveyDetail';
import SurveyRegister from './pages/SurveyRegister';

export const history = createBrowserHistory({
    forceRefresh: true
});

function Routes() {
    return (
        <BrowserRouter>
            <Switch >
                <Route path="/" component={LandingPage} exact />
                <Route path="/company-register" component={CompanyRegister} />
                <Route path="/survey-register" component={SurveyRegister} />
                <Route path="/survey-details" component={SurveyDetail} />
                <Route path="/nps-calculator" component={Calculator} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;