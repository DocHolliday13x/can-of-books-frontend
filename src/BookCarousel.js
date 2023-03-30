import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import image from './images/biblePhotobyRob-Long.jpg'

class BookCarousel extends React.Component {

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
          <Button variant="info" onClick={() => { this.props.openUpdateModal(this.props.book) }}>
            Update Book
          </Button>

        </Carousel.Caption>

      </>

    )
  }
}

export default BookCarousel;