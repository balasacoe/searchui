import React, { Component, Fragment } from "react";
import { API_SEARCH } from "../../constants/apiConstants";
import { getData } from '../../utils/apiutil';
import Card from "../card";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: null,
            userInput: '',
            selectedItems: [],
            selectedItem: null,
            suggestionsVisible: false
        };
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.searchItemClick = this.searchItemClick.bind(this);
        this.submitButtonClick = this.submitButtonClick.bind(this);


    }

    onSearchInputChange(query = '') {
        this.setState({ userInput: query });
        //doing seach if characters more than 2
        if (query && query.length > 2) {
            this.getBooksForGivenQuery(query);
        } else if (this.state.books) {
            this.setState({ books: null });
        }
    }
    getBooksForGivenQuery(query) {
        getData(`${API_SEARCH.getAllBooks}?query=${query}`).then((data) => {
            console.log("data", data);
            this.setState({ books: data, suggestionsVisible: true })
        });
    }
    searchItemClick(item) {
        if (item) {
            this.setState({ userInput: item.title, suggestionsVisible: false, selectedItem: item });
        }
    }
    submitButtonClick() {
        if (this.state.selectedItem) {
            let selectedItems = this.state.selectedItems;
            selectedItems.push(this.state.selectedItem);
            this.setState({ suggestionsVisible: false, selectedItems: selectedItems, selectedItem: null });
        }
    }
    render() {
        let suggestionsListComponent, selectedBookListComponent;
        //for suggestions
        if (this.state.books && this.state.userInput) {
            if (this.state.books.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {this.state.books.map((book, index) => {
                            return (
                                <li key={index} onClick={() => this.searchItemClick(book)}>
                                    {book.title}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        }
        //for no result
        else if (this.state.userInput && this.state.userInput.length > 2) {
            suggestionsListComponent = (
                <div className="no-suggestions">
                    <em>No search results</em>
                </div>
            );
        }
        //for selected books
        if (this.state.selectedItems && this.state.selectedItems.length) {
            selectedBookListComponent = (
                <div className="container">
                    {this.state.selectedItems.map((book, index) => {
                        return (
                            <div className="column" key={index} index={index}>
                                <Card book={book} />
                            </div>
                        );
                    })}
                </div>
            );
        }
        return (
            <Fragment>
                <div className='search-layout'>
                    <input
                        className='search-input'
                        type="text"
                        placeholder="title,summary"
                        onChange={e => {
                            this.textValue = e.target.value;
                            this.onSearchInputChange(e.target.value);
                        }}
                        value={this.state.userInput && this.state.userInput}
                    />
                    <button className='search-submit' onClick={() => this.submitButtonClick()}>Submit</button>
                    {this.state.suggestionsVisible && suggestionsListComponent}
                    {selectedBookListComponent}

                </div>
            </Fragment>
        );
    }
}

export default Search;
