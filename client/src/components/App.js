//Rendering Layer Control
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
    return(
        //container is a materialize css class
        <div className="container"> 
             {/* BrowserRouter component expects at most 1 childcomponent */}
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact={true} path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;