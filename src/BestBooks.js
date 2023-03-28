import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel';
import BookCarousel from './BookCarousel.js';
import BookFormModal from './BookFormModal.js';


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

  deleteBooks = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`

      await axios.delete(url);

      // TODO: update state to remove deleted books
      let updatedBooks = this.state.books.filter(book => book._id !== id);

      this.setState({
        books: updatedBooks,
      })

    } catch (error) {
      console.log(error.response);
    }
  }

  // *** ADDING BOOKS TO DATABASE WITH THE USE OF 2 HANDLERS ***
  // *** HANDLER 1 - COMES FROM FORM - BUILD A BOOK OBJECT ***
  handleBookSubmit = (event) => {
    event.preventDefault();


    // TODO: Build a book object based off of the form data
    let newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
    }
    console.log('New Book Form >>> ', newBook);
    this.postBook(newBook);
  }

  // *** HANDLER 2 - POST TO THE DATABASE ***
  postBook = async (bookObj) => {
    try {
      // TODO: build the url, use axios and add the cat

      let url = `${process.env.REACT_APP_SERVER}/books`

      // *** On a post, we pass in 2 args to axios, 1st is the url, 2nd is the data that will go on the request.body
      let createdBook = await axios.post(url, bookObj)

      this.setState({
        books: [...this.state.books, createdBook.data]
      })

    } catch (error) {
      console.log(error.message)
    }
  }

  updatedBooks = async (bookToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`

      let updatedBook = await axios.put(url, bookToUpdate);

      let updatedBookArr = this.state.books.map(existingBook => {
        return existingBook._id === bookToUpdate._id
          ? updatedBook.data
          : existingBook
      });

      this.setState({
        books: updatedBookArr
      })

    } catch (error) {
      console.log(error.message)
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
              {this.state.books.map((book, idx) => {
                return (
                  <Carousel.Item key={idx}>
                    <BookCarousel
                      title={book.title}
                      description={book.description}
                      status={book.status}
                      deleteBooks={this.deleteBooks}
                      _id={book._id}
                      updateBooks={this.updateBooks}
                    />
                  </Carousel.Item>
                )
              })}
            </Carousel>

          </Container>

        ) : (
          <h3>No Books Found :(</h3>
        )}

          <BookFormModal
          handleBookSubmit={this.handleBookSubmit}
          />

      </>
    )
  }
}


export default BestBooks;
