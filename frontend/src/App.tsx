import React from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import GlobalStyle from 'styles/reset';
import Index from './Tests';
import Test1 from './Tests/Test1';
import Test2 from './Tests/Test2';
import Test3 from './Tests/Test3';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="*">
          <GlobalStyle />
          <Route path="/" exact component={Index} />
          <Route path="/1" exact component={Test1} />
          <Route path="/2" exact component={Test2} />
          <Route path="/3" exact component={Test3} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
