

import { Button } from './Button';
import '../styles/sidebar.scss';



// interface SideBarProps {
//   genres: {
//     id: number;
//     name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
//     title: string;
//   }
// }

interface SideBarProps {
  api_genre_id: number;
  api_genre_name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  api_genre_title: string;
}



export function SideBar(props: SideBarProps) {
  
  // function handleClickButton(id: number) {
  //   setSelectedGenreId(id);
  // }
  
  
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {/* {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={props.title}
            iconName={props.name}
            // onClick={() => handleClickButton(genre.id)}
            // selected={selectedGenreId === genre.id}
            selected={props.id}
            />
        ))} */}

        
          <Button
            key={String(props.api_genre_id)}
            title={props.api_genre_title}
            iconName={props.api_genre_name}
            // onClick={() => handleClickButton(genre.id)}
            // selected={selectedGenreId === genre.id}
            selected={true}
            />
      </div>
    </nav>  
  )
}