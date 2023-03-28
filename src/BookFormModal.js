import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



class BookFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    }
  }


  render() {
    return (
      <>
        <Button variant="secondary" onClick={() => { this.setState({ modalShow: true }) }}>
          Add a Book Here
        </Button>

        <Modal show={this.state.modalShow} onHide={() => { this.setState({ modalShow: false }) }}>

          <Modal.Header closeButton>
            <Modal.Title>Provide Book Info</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Container className="mt-5">
              <Form onSubmit={this.props.handleBookSubmit}>
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
                <Button type="submit">Add My Book!</Button>
              </Form>
            </Container>

          </Modal.Body>
          
        </Modal>

      </>
    )
  }
}


export default BookFormModal;