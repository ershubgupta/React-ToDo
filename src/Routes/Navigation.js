import React, { Component } from 'react';
// import { Row, Column } from 'rebass';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switchmd from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Dashboard from '../Pages/Dashboard';
import NewsPage from "../Pages/NewsPage";
import StocksPage from "../Pages/StocksPage";
import ToDo from "../Pages/ToDo";
import MutualFund from "../Pages/MutualFund";
import ProtectedRoute from '../Routes/ProtectedRoute';
import LogOut from '../Pages/LogOut';
class Navigation extends Component {
  render() {
    return (
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={''} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={''}>
              Photos
            </Typography>
            {this.props.authenticated ? (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/news">News</NavLink>
                <NavLink to="/stocks">Stocks</NavLink>
                <NavLink to="/todo">Todo</NavLink>
                <NavLink to="/mutual-fund">MutualFund</NavLink>
                <LogOut />
              </div>
            ) : (
                <span>
                  {/* <Button variant="contained" color="secondary"> */}
                    <NavLink to="/login">Login</NavLink>
                  {/* </Button> */}
                  <NavLink to="/register">Register</NavLink>
                </span>
              )}
          </Toolbar>
        </AppBar>
        {/* <div> */}
        {/* <div>
            <div>
              

            </div>
          </div> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route authenticated={this.props.authenticated} path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute authenticated={this.props.authenticated} path="/dashboard" component={Dashboard} />
          <ProtectedRoute authenticated={this.props.authenticated} path="/news" component={NewsPage} />
          <ProtectedRoute authenticated={this.props.authenticated} path="/stocks" component={StocksPage} />
          <ProtectedRoute authenticated={this.props.authenticated} path="/todo" component={ToDo} />
          <ProtectedRoute authenticated={this.props.authenticated} path="/mutual-fund" component={MutualFund} />
        </Switch>
        {/* </div> */}
      </Router>
    );
  }
}
export default Navigation;