import { Component } from "react";
import Card from 'react-bootstrap/Card'

class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    return (
      <>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
      <Card.Title>About Us!</Card.Title>
      <Card.Text>
        This application is brought to you by extremely Junior Software Developers, Stephen Levesque and Ryan Eastman. Ryan and Stephen are up and coming developers gaining proficiency with JavaScript, HTML5, CSS, REACT, NODE.js, and MongoDB. They started this collaboration together as Code Fellows 301 classmates, and by the end of Lab 11 they became best friends.
      </Card.Text>
      </Card.Body>
      </Card>
      </>
    )
  }
};

export default Profile;
