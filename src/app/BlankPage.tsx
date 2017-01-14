/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 * The BlankPage component provides a theme wrapper for all child components
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SplashPage from './SplashPage';
import siteTheme from './customTheme';

const muiTheme = getMuiTheme(siteTheme);
interface MyProps2 {
  [propName: string]: any;
}

interface MyState {
  [propName: string]: any;
  props: any;
}
class BlankPage extends React.Component<MyProps2,  MyState>{

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
              {this.props.children || <SplashPage />}
              {/* SplashPage is displayed if there are no children */}

      </MuiThemeProvider>
    );
  }
}

export default BlankPage;
