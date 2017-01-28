import { Link } from 'react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from './MainSecurityContainer';
const NotFound = () => {
  return (<Main><div><h1>Page Not Found</h1>
       <p><Link to='/'>Home</Link></p>
    </div></Main>);
};

export default NotFound;