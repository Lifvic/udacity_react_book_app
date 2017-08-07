import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
	state = {
		query: "",
		library: []
	}

	updateGrid(query) {
		if (!query) {
			this.setState({
				query: query.trim(),
				library: []
			})
			return
		}

		BooksAPI.search(query.toString(), 10).then( (library) => {
			if (!library) return

			if (library.length > 0) {
				this.setState({
					query: query.trim(),
					library: library
				})
			} else {
				this.setState({
					query: query.trim(),
					library: []
				})
			}
		})
  	}

  	updateBook(book, e) {
  		this.setState((state) => ({
	       library: state.library.filter((c) => (c.id == book.id) ? c.shelf = e : c.shelf=c.shelf)
      }))
  		this.props.onChangeShelf(book, e)
  	}
	render () {


		const {query, library} = this.state
		const {onChangeShelf} = this.props

		return (
			<div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" 
                	    placeholder="Search by title or author" 
                		value={this.state.query}
                		onChange={(event) => this.updateGrid(event.target.value)}
        		/>
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              	{library.map( (book) => (
              		<li key={book.industryIdentifiers[0].identifier}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                            <div className="book-shelf-changer">

                              <select value={book.shelf} onChange={(event) => this.updateBook(book, event.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>

                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          
                        </div>
                  	</li>
              	))}
              </ol>
            </div>
          </div>
		)
	}
}

export default SearchBooks;