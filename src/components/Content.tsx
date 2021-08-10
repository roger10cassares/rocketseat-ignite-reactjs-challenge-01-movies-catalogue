

import { MovieCard } from './MovieCard';

import '../styles/content.scss';


interface ContentProps {
  static_selected_genre_id: number;
  static_movie_imdbID: number;
  static_movie_title: string;
  static_movie_poster: string;
  static_movie_title_runtime: string;
  static_movie_title_rating: string;
}

export function Content(props: ContentProps) {
  return (
    // <div className="container">
    //   <header>
    //     <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
    //   </header>

    //   <main>
    //     <div className="movies-list">
    //       {movies.map(movie => (
    //         <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
    //       ))}
    //     </div>
    //   </main>
    // </div>

    <div className="container">
    <header>
      <span className="category">Categoria:<span> {props.static_selected_genre_id}</span></span>
    </header>

    <main>
      <div className="movies-list">
        <MovieCard 
          key ={props.static_movie_imdbID} 
          title={props.static_movie_title} 
          poster={props.static_movie_poster} 
          runtime={props.static_movie_title_runtime} 
          rating={props.static_movie_title_runtime} 
        />
      </div>
    </main>
    </div>
  )
}