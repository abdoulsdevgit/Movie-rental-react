import React, { Component } from 'react';
import {getMovies, deleteMovie} from '../services/fakeMovieService';
import Pagination from './pagination';
import {paginate} from '../utils/paginate';
import ListGroup from './listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
    // state = { 
    //     movies: []
    // };
    
    constructor(props) {
        super(props);
        
        this.state = { 
            movies: [],
            genres: [],
            pageSize: 4,
            currentPage: 1,
            sortColumn: {path: 'title', order: 'asc'},
            //selecterGenre: null,
        };

        // this.setState({movies: getMovies()})
    }

    componentDidMount() {

        const genres = [{_id:"", name: 'All Genres'}, ...getGenres()];

        this.setState({
            genres,
            movies: getMovies(),
        })
    }

    render() { 
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={this.state.selectedGenre}
                    />
                </div>
                <div className="col">
                    {this.renderCorrectView()}
                </div>
            </div>
        );
    }

    renderCorrectView = () => {
        const numberOfMoviesInDB = this.state.movies.length;
        const noMoviesInDB = numberOfMoviesInDB === 0;
        const allMovies = this.state.movies;
        const {currentPage, pageSize, selectedGenre, sortColumn} = this.state;

        if(noMoviesInDB) return <h1> There are no movies in the database</h1>;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(movie => movie.genre._id === selectedGenre._id):
        allMovies

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);
        
        return (
            <div>
                <span>{`Showing ${filtered.length} in the database`}</span>
                
                <MoviesTable 
                    movies={movies}
                    onDelete={this.handleDelete}
                    sortColumn={sortColumn}
                    onLike={this.handleLike}
                    onSort={this.handleSort}
                />
                <Pagination 
                    itemsCount={filtered.length}
                    pageSize={pageSize}
                    onSort={this.handleSort}
                    sortColumn={this.state.sortColumn}
                    onPageChange={this.handleChange}
                    currentPage={currentPage}
                />
            </div>
        )
    }

    handleDelete = (id) => {
        deleteMovie(id);
        this.setState({movies: getMovies()})
    }

    handleLike = (movie) => {
        
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movie};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});

    }

    handleChange = (page) => {
        this.setState({currentPage: page});
    }

    handleGenreSelect = (genre) => {
        this.setState({selectedGenre: genre, currentPage: 1});
    }

    handleSort = (sortColumn) => {
        this.setState({ sortColumn })
    }
}
 
export default Movies;