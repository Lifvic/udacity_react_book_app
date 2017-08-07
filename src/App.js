import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class App extends React.Component {
  state = {
    allBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({allBooks})
    })
  }


  moveBetweenShelves = (book, shelf) => {
    if(this.state.allBooks.find((b) => (b.id == book.id))) {
      // The book exists in allBooks, simply update it.
      BooksAPI.update(book, shelf)

      this.setState((state) => ({
       allBooks: state.allBooks.filter((c) => (c.id == book.id) ? c.shelf = shelf : c.shelf=c.shelf)
      }))
    } else {
      // The book doesn't exist in allBooks.
      BooksAPI.update(book, shelf)

      this.setState( (state) => {
        allBooks: state.allBooks.concat([ book ])
      } )
    }

  }



  render() {
    return (

      <div className="app">
        <Route exact path="/" render={ () => (
          <ListBooks 
            allBooks = {this.state.allBooks}
            onChangeShelf = {
              this.moveBetweenShelves
            }
          />
        )}/>
        <Route path="/search" render={ () => (
          <SearchBooks
            onChangeShelf = {
              this.moveBetweenShelves
            }
            />
        )}/>

      </div>
    )
  }
}

export default App
