1. Separate the HTML elements for each component SideBar and Content

2. Use the <SideBar /> and the <Content /> to call in the App.tsx file.

3. When the App Component is mounted to the DOM, use the useEffect to make the first call to API to get the GenreResponseProps and setGenres with the appropriate data. This data is an Array of Objects.

4. All the data processing shall be done inside the App.tsx Component and just the props that shall render in the DOM shall be passed over the props to the <SideBar /> and the <Content />.

5. So, the props could be firstly simulated with a synthetic data without the API call to each Component.

6, The simplest way to achieve the props passed to the SideBar and the Content Components was registered bellow:

```tsx
// App.tsx
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar 
        static_genre_id={1} 
        static_genre_name="action" 
        static_genre_title="Jesus"
      />
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

// SideBar.tsx
import { Button } from './Button';
import '../styles/sidebar.scss';


interface SideBarProps {
  static_id: number;
  static_name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  static_title: string;
}

export function SideBar(props: SideBarProps) {

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">    
        <Button
          key={String(props.static_id)}
          title={props.static_title}
          iconName={props.static_name}
          selected={true}
          />
      </div>
    </nav>  
  )
}

// Content.tsx
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
```

IMAGE UNDERDOOG FROM WHATSAPP!!!

The SideBarProps and the ContentProps interface should tell what they expected to receive for the props be passing over the <SideBar /> and the <Content /> React Tags.

7. As far as the DOM could achieve the desired props to show the simple stuffs, the API should now be called when the App.tsx Component is mounted in the DOM with the correspondent useSetate and useEffect Hooks and interfaces! 

```tsx
import { useEffect, useState } from 'react';
...
import { api } from './services/api';
...
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
...
export function App() {
  ...
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);

      console.log(response.data)
    });
  }, []);
```

IMAGE UNDERDOOG AND CONSOLE FROM WHATSAPP!!!

8. At this point, the API fetches the data and set this value to the genre useState.

9. Now we could test to pass the values of genre's object from the fetch to the props of SideBar Component.
A point to observe is that if the fetched data from API do no not exists when the SideBar Component be rendered, the DOM gives an error because it is trying to load a undefined value from the unfeched genres useState value. Considering that, we should apply an if statement to load the SideBar Component just if the genres useState value would be true. 

```tsx
{genre && <Button />}
```

So, with that modifications the files should refactored like represented bellow:

```tsx

// App.tsx
...
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
```

10. Then, the SideBar should load all the data from the API. This should instance more Buttons Components as the number of objects inside the genres array from the API. This should be done, as the examples shows, by mapping the genres array and calling the Button Component from inside the SideBar Component to each object of that array. To do this, we should pass all the genres array as the SideBar props. However, the interface SideBarProps shouldchange to match an Array of Objects.

10.1. A simple test was done to verify what kind of synthetic data could be accepted as SideBar props. So, the GenreResponseProps was edited to match the types of each key of genres object that shall be passed as the props of SideBar Component

```tsx
// App.tsx
...
// define what the type of each key from genres object to receive from the fetch at useEffect(() => {}, [])
interface GenreResponseProps {
  genres: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }
}
...
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      ...
      { genres &&
            <SideBar
              genres={{id:3, name: 'action', title:'Jesus'}}
            />
      }
    </div>

```

10.2 The object defined by a synthetic data with "{id:3, name: 'action', title:'Jesus'}" was accepted by the genres props. The next step is switch the synthetic data with the data fetched from the useEffect at the Component mounted time at the DOM.

```tsx
// App.tsx 

// The format and types expected for the Genres from teh API were defined bellow
// interface GenreResponseProps {
interface GenreResponse {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

export function App() {
  // const [selectedGenreId, setSelectedGenreId] = useState(1);

  // Set genres value as a an Array of GenreResponse by passing this property 
  // between the < > tag before the () of the useState(). 
  // So we can tell which type we can store inside this state!
  // As the desired type is an array (list) of objects and not a single object,
  // the Array signal [] must be inserted after the GenreResponse type.   
  const [genres, setGenres] = useState<GenreResponse[]>([]);


  ...
  return (
    <SideBar
      genres={genres}
    />
  )

  //  Type 'GenreResponse[]' is missing the following properties from type '{ id: number; name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family"; title: string; }': id, name, titlets(2739)
  //   SideBar.tsx(10, 3): The expected type comes from property 'genres' which is declared here on type 'IntrinsicAttributes & SideBarProps'
  //   (JSX attribute) SideBarProps.genres: {
  //       id: number;
  //       name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  //       title: string;
  //   }

```

To fix this error, we need to complete the type of the SideBarProps with the correct types.

When we set a props key with Typescript, this value is passed as an value from an object key named genres.

For example when we pass an array of objects called genresResponse to the genres props,

```tsx
<SideBar
  genres={genresResponse}
/>
```
from inside the SideBar Component should arrive an props object

```tsx
props={genres:[obj1, obj2, obj3]}

```

Always that we use props in Typescript, its interface or type must set each props as an object. In the genres props example it should follow the next lines, since genres props is an array of objects:

```tsx
interface SideBarProps {
  genres: {
    id: sting;
    name: 'action' | 'commedy' ...;
    title: string;
  }[]
}
```

THe to pass it beyond as an array, for example we could set a const with a state or as props.genres.





15. Use an callback function to pros from child to parent to get the selectedGenreId from the SideBar.tsx component to its React Parent App.tsx

16. The movies response from the API is an array of objects that should be passed to the ContentProps and then to MovieCard component

The MovieCard component represents at 
title, poster, rating and runtime variables.

