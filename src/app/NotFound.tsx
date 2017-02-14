import { Link } from 'react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainContainer from './MainContainer'
const NotFound = () => {
  return (<MainContainer><div><h1>Page Not Found</h1>
       <p><Link to='/main/home'>Home</Link></p>
    </div></MainContainer>);
};

export default NotFound;