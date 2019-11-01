import React from 'react';
import { Switch,Route } from 'react-router-dom'
import Home from './components/Home/home.component';
import Layout from './hoc/layout';
import RegisterLogin from './components/Register_login';

const Routes = () => {
  console.log('inside routes')
  return (
    <Layout>
    <Switch>
      <Route path='/register_login' exact component={RegisterLogin} />
      <Route path='/' exact component={Home} />
    </Switch>
    </Layout>
  );
}

export default Routes;
