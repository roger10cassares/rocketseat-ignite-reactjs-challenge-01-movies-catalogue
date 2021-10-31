import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';


// The format and types expected for the Genres from the API were defined bellow
// interface GenreResponseProps {
interface GenreResponse {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieResponse {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  
  // Set genres value as a an Array of GenreResponse by passing this property 
  // between the < > tag before the () of the useState(). 
  // So we can tell which type we can store inside this state!
  // As the desired type is an array (list) of objects and not a single object,
  // the Array signal [] must be inserted after the GenreResponse type.   
  const [genres, setGenres] = useState<GenreResponse[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponse>({} as GenreResponse);
  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  

  function selectedGenreIdFromSidebarCallback(selectedGenreIdFromSidebar: number){
    setSelectedGenreId(selectedGenreIdFromSidebar);
  }

  useEffect(() => {
    api.get<GenreResponse[]>('genres')
      .then(response => setGenres(response.data))
    },[]);

  useEffect(() => {
    api.get<MovieResponse[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponse>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);


  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        genres={genres}
        selectGenreIdCallback={selectedGenreIdFromSidebarCallback}
      />

      <Content 
        movies={movies}
        genres={genres}
        selectedGenreId={selectedGenreId}
      />
    </div>
  )
}