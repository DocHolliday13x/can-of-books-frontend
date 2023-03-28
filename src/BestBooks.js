import React from 'react';
import axios from 'axios';
import image from './images/biblePhotobyRob-Long.jpg'
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`
      let bookData = await axios.get(url);
      this.setState({
        books: bookData.data
      })

    } catch (error) {
      console.log(error.response);
    }
  }

  // *** REACT LIFECYCLE METHOD*** When app renders, calls the provided function
  componentDidMount() {
    this.getBooks();
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  render() {
    console.log('App State >>> ', this.state);
    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
                      <Container>
                      <Carousel>
                        {this.state.books.map((book, idx) => (
                          <Carousel.Item key={idx}>
                            <img
                              className="d-block w-100"
                              src={image}
                              alt={book.title}
                            />
                            <Carousel.Caption>
                              <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>{book.title}</h3>
                            </Carousel.Caption>
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </Container>
                  
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
