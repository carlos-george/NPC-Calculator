import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Calculator from './pages/Calculator';
import CompanyRegister from './pages/CompanyRegister';
import SurveyDetail from './pages/SurveyDetail';
import SurveyRegister from './pages/SurveyRegister';


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Calculator} exact />
                <Route path="/company-register" component={CompanyRegister} />
                <Route path="/survey-register" component={SurveyRegister} />
                <Route path="/survey-details" component={SurveyDetail} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;