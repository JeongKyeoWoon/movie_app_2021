import React from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from './Movie';
import "./App.css";

/* 
// 함수 컴포넌트
const foodILike = [
  {
    id: 1,
    name: "Kimchi",
    image: "https://www.alacartemall.com/images/sub/etc-store-list01.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Samgyeopsal",
    image: "https://www.alacartemall.com/images/sub/etc-store-list02.jpg",
    rating: 4.9
  },
  {
    id: 3,
    name: "Bibimbap",
    image: "https://www.alacartemall.com/images/sub/etc-store-list03.jpg",
    rating: 4.8
  },
  {
    id: 4,
    name: "Doncasu",
    image: "https://www.alacartemall.com/images/sub/etc-store-list04.jpg",
    rating: 5.5
  },
  {
    id: 5,
    name: "Kimbap",
    image: "https://www.alacartemall.com/images/sub/etc-store-list05.jpg",
    rating: 4.7
  }
]

function Food({ name, picture, rating }) {
  return <div>
    <h2>I like {name}</h2>
    <h4>{rating}/5.0</h4>
    <img src={picture} alt={name} />
  </div>;
}
// 해당 컴포넌트의 props의 타입 및 필수 체크
Food.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number
}

function App() {
  return (
    <div>
      {foodILike.map(dish => (
        <Food key={dish.id} name={dish.name} picture={dish.image} rating={dish.rating}/>
      ))}
    </div>
  );
} */

class App extends React.Component {
  /* 
  constructor(props){
    super(props);
    console.log("hello");
  }
  state = {
    count: 0
  };
  add= () => {
    this.setState(current => ({count: current.count + 1}));
  };
  minus= () => {
    this.setState(current => ({count: current.count - 1}));
  };
  componentDidMount() {
    console.log("component rendered");
  }
  componentDidUpdate() {
    console.log("I just updated")
  }
  componentWillUnmount() {
    console.log("Goodbye, cruel world")
  } */
  state = {
    isLoading: true,
    movies: []
  }
  // async는 비동기, 기다려야한다
  getMovies = async () => {
    // api 비동기식으로 가져와서 불러오기가 완료되면 영화정보, 로딩 상태 변경
    const { data: { data: { movies } } } = await axios.get("https://yts.mx/api/v2/list_movies.json"); // https://yts-proxy.now.sh/list_movie.json
    this.setState({ movies, isLoading: false }) // movies: movies
  }
  componentDidMount() {
    /* setTimeout(() => {
      this.setState({ isLoading: false }); // setState 해줄 때 미리 선언하지 않아도 상관없음
    }, 6000); */
    // 컴포넌트가 생성되면 영화정보 가져오기
    this.getMovies();
  }
  render() {
    // console.log("I'm rendering");
    /* return (
      <div>
        <h1>The number is: {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    ); */
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
            <div className="movies">
              {movies.map(movie => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              ))}
            </div>
          )}
      </section>
    );
  }
}
export default App;
