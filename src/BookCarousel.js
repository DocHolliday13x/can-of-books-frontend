import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import image from './images/biblePhotobyRob-Long.jpg'

class BookCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let bookToUpdate = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked,
    }
    this.props.updateBook(bookToUpdate);

  }

  render() {
    // console.log('BookCarousel props ', this.props);
    return (
      <>
        <img
          className="d-block w-100"
          src={image}
          alt={this.props.title}
        />
        <Carousel.Caption>
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
          <p>{this.props.status}</p>
        <Button variant="danger" id='deleteBtn' onClick={() => { this.props.deleteBook(this.props._id) }}>Delete</Button>
        <Button variant="success" id='updateBtn' onClick={() => { this.props.updateBook(this.props._id)}}>Update</Button>
        </Carousel.Caption>

        <Modal show={this.state.showUpdateForm} onHide={() => { this.setState({ showUpdateForm: false }) }}>

          <Modal.Header closeButton>
            <Modal.Title>Fill out all info</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Container className="mt-5">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="title" >
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="status">
                  <Form.Check type="checkbox" label="available" />
                </Form.Group>
              </Form>
            </Container>

          </Modal.Body>

        </Modal>
      </>

    )
  }
}

export default BookCarousel;