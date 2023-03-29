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
  
  deleteBook = async (id) => {
    console.log('Did this fire?');
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
  
  // *** UPDATE BOOK IN STATE USING AXIOS TO HIT BACKEND ***
  updateBook = async (bookObjToUpdate) => {
  
    try {
      //TODO: url for axios
      let url = `${process.env.REACT_APP_SERVER}/books/${bookObjToUpdate._id}`
    
      let updatedBook = await axios.put(url, bookObjToUpdate._id)
    
      //TODO: Set state with the return from axios
      let updatedBookArray = this.state.books.map(existingBook => {
        return existingBook._id === bookObjToUpdate._id
        ? updatedBook.data
        : existingBook
      })
    
      this.setState({
        books: updatedBookArray
      })
      
    } catch (error) {
      console.log(error.message);
    }
  }

  // *** ADDING BOOKS TO DATABASE WITH THE USE OF 2 HANDLERS ***
  // *** HANDLER 1 - COMES FROM FORM - BUILD A BOOK OBJECT ***
  handleBookSubmit = (event) => {
    event.preventDefault();


    // TODO: Build a book object based off of the form data
    let bookObj = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked,
    }
    console.log('New Book Form >>> ', bookObj);
    this.postBook(bookObj);
  }

  // *** HANDLER 2 - POST TO THE DATABASE ***
  postBook = async (bookObj) => {
    try {
      // TODO: build the url, use axios and add the cat
      let url = `${process.env.REACT_APP_SERVER}/books`
      // *** On a post, we pass in 2 args to axios, 1st is the url, 2nd is the data that will go on the request.body
      let createdBook = await axios.post(url, bookObj)
      console.log(createdBook.data);
      this.setState({
        books: [...this.state.books, createdBook.data]
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
                      deleteBooks={this.deleteBook(book._id)}
                      _id={book._id}
                      _v={book._v}
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



