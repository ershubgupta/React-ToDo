import React from 'react';
// import { Container, Flex, Box, Heading } from 'rebass';
import firebase from '../Config/firebase';
// var displayName = firebase.auth().currentUser.displayName;
// firebase.auth().currentUser(function(user){
//   displayName = displayName
// })
// firebase.auth().onAuthStateChanged(function(user) {

//   if (user) {

//      // Updates the user attributes:

//     user.updateProfile({ // <-- Update Method here

//       displayName: "NEW USER NAME",
//       photoURL: "https://example.com/jane-q-user/profile.jpg"

//     }).then(function() {

//       // Profile updated successfully!
//       //  "NEW USER NAME"

//       displayName = user.displayName;
//       // "https://example.com/jane-q-user/profile.jpg"
//       var photoURL = user.photoURL;

//     }, function(error) {
//       // An error happened.
//     });     

//   }
// });
const Dashboard = () => {
 return (
   <div>
     {/* Welcome! {displayName} */}
   </div>
 );
};
export default Dashboard; 