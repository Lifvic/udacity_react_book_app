import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListBooks extends Component {
  static propTypes = {
    allBooks: PropTypes.array.isRequired
  }
	render() {
		const { allBooks, onChangeShelf } = this.props

		const book_cats = ["currentlyReading", "wantToRead", "read"]

		
		return (
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            <div className="list-books-content">
	            {book_cats.map(  
	            	function(book_cat) {
	            		let current_books = allBooks.filter( (book) => book.shelf === book_cat)
	            		return (
		            	<div className="bookshelf" key={book_cat}>
		                  <h2 className="bookshelf-title">{book_cat}</h2>
		                  <div className="bookshelf-books">
			                  <ol className="books-grid">
			                  	{current_books.map(
			                  		(book) => (

		                  			<li key={book.industryIdentifiers[0].identifier}>
				                        <div className="book">
				                          <div className="book-top">
				                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
				                            <div className="book-shelf-changer">

				                              <select value={book.shelf} onChange={(event) => onChangeShelf(book, event.target.value)}>
				                                <option value="none" disabled>Move to...</option>
				                                <option value="currentlyReading">Currently Reading</option>
				                                <option value="wantToRead">Want to Read</option>
				                                <option value="read">Read</option>
				                                <option value="none">None</option>
				                              </select>

				                            </div>
				                          </div>
				                          <div className="book-title">{book.title}</div>
				                          <div className="book-authors">{book.authors.map( (author) => <p key={author}>{author}</p> )}</div>
				                        </div>
			                      	</li>
			                  			)
			                  		)}
				                      
				                </ol>
			                </div>
			              </div>
			              )
            		})

	            	
	            	
	            }
	            
	                
	            </div>
	            <div className="open-search">
	              <Link to="/search">Add a book</Link>
	            </div>
	        </div>
		)
	}
}

export default ListBooks