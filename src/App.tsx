import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';



interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

// interface MovieProps {
//   imdbID: string;
//   Title: string;
//   Poster: string;
//   Ratings: Array<{
//     Source: string;
//     Value: string;
//   }>;
//   Runtime: string;
// }

export function App() {
  // const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  // const [movies, setMovies] = useState<MovieProps[]>([]);
  // const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);

      console.log(response.data)
    });
  }, []);

  // useEffect(() => {
  //   api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
  //     setMovies(response.data);
  //   });

  //   api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
  //     setSelectedGenre(response.data);
  //   })
  // }, [selectedGenreId]);



// static data

// const static_id: 1;
// const static_name: "action";
// const static_title: "Jesus";

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      { genres[0] &&
        <SideBar 
          api_genre_id={1} 
          api_genre_name="action"
          // api_genre_title="Jesus"

          // api_genre_id={genres[0].id} 
          // api_genre_name={genres[0].name} 
          api_genre_title={genres[0].title} 
        />
      }
      <Content 
        static_selected_genre_id={1}
        static_movie_imdbID ={1} 
        static_movie_title="Underdog"
        static_movie_poster="https://m.media-amazon.com/images/M/MV5BMTk5NjkyNzEwOV5BMl5BanBnXkFtZTcwODc5NDI1MQ@@._V1_SX300.jpg"
        static_movie_title_runtime="84 min"
        static_movie_title_rating="10/10"
      />
    </div>
  )
}