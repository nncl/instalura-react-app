import React from 'react';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import Header from "./components/Header";
import Timeline from "./components/Timeline";

const App = ({match}) => {
    return (
        <div id="root">
            <div className="main">
                <Header/>
                <Timeline slug={match.params.slug}/>
            </div>
        </div>
    );
};

export default App;
