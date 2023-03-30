import React from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class UpdateBookForm extends React.Component {
  
  handleUpdateSubmit = (event) => {
    event.preventDefault();
    let bookObj = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked,
      _id: this.props.selectedBook._id
    }
    console.log(bookObj);
    this.props.updateBook(bookObj)
  }

  render() {
    return (

      <>

      <Modal show={this.props.showUpdateModal} onHide= {this.props.closeUpdateModal} >

        <Modal.Header closeButton>
          <Modal.Title>Provide Book Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Container className="mt-5">
            <Form onSubmit={this.handleUpdateSubmit}>
              <Form.Group controlId="title" >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" defaultValue={this.props.selectedBook.title} />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" defaultValue={this.props.selectedBook.description} />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Check type="checkbox" label="available" defaultChecked={this.props.selectedBook.status}/>
              </Form.Group>
              <Button type="submit">Update My Book!</Button>
            </Form>
          </Container>

        </Modal.Body>
        
      </Modal>

    </>


    )
  }
}

export default UpdateBookForm;