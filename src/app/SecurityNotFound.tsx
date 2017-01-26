import { Link } from 'react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from './MainSecurityContainer';
const NotFound = () => {
  return (<Main><div><h1>Test Page Not Found</h1>
       <p><Link to='/main/home'>Home</Link></p>
    </div></Main>);
};

export default NotFound;