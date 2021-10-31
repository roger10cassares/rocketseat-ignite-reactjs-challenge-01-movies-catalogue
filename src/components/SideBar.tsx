import { Button } from './Button';
import '../styles/sidebar.scss';
import { CornerDownLeft } from 'react-feather';
import { useState, useEffect } from 'react';


interface SideBarProps {
  genres: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }[];
  selectGenreIdCallback: any;
}

interface Genres {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}


// interface SideBarProps extends Array<SideBarProps>{}


// export function SideBar(props: SideBarProps) {
  export function SideBar(props: SideBarProps) {

    const [selectedGenreId, setSelectedGenreId] = useState(1);

    const [genres, setGenres] = useState<Genres[]>([])

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    console.log(`Props.Genres: ${JSON.stringify(props.genres)}`)
    setGenres(props.genres);
  },[props.genres])

  useEffect(() => {
    props.selectGenreIdCallback(selectedGenreId);
  },[selectedGenreId])
  //Here maybe use useRef

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">      
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
              iconName={genre.name}
            />
          ))}
        </div>
      </nav>
    </div>
  )
}