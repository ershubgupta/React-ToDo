import React from 'react';
// import { Button } from 'rebass';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
const logOutUser = () => {
 firebase.auth().signOut();
};
const LogOut = () => {
 return <Button onClick={logOutUser} variant="contained" color="secondary">Log Out</Button>;
};
export default LogOut;