import React, { Component } from 'react';
import Like from './like';
import Table from './table';

class MoviesTable extends Component {
    columns = [
        {path: 'title', label: 'Title'},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {key: 'like', content: movie => <Like liked={movie.liked} movie={movie} onLiked={this.props.onLike}/>},
        {key:'delete', content: movie => <button className="btn btn-danger" onClick={() => this.props.onDelete(movie._id)}>Delete</button>},
    ];


    render() { 
        const {movies, onSort, sortColumn} = this.props;
        return ( 
            <Table
                columns={this.columns}
                data={movies}
                onSort={onSort}
                sortColumn={sortColumn}
            />
        );
    }
}
 
 
export default MoviesTable;