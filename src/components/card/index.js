import React from 'react';
import PropTypes from 'prop-types';
export default function Card(props) {
    const { book } = props;
    return (
        <article className="article">
            <h3 className="article__category" >{book.author}</h3>
            <h2 className="article__title">{book.title}</h2>
            <p className="article__excerpt">{
                truncate.apply(book.summary, [50, true])}</p>
        </article>
    )
}
function truncate(n, useWordBoundary) {
    if (this.length <= n) { return this; }
    var subString = this.substr(0, n - 1);
    return (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(' '))
        : subString) + "...";
};


Card.propTypes = {
    book: PropTypes.object.isRequired
};
