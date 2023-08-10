import React, { useState } from "react";
import { Input, List, Card } from "antd";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";

const { Search } = Input;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    setLoading(true);
    axios
      .get(`http://www.omdbapi.com/?apikey=b005432&s=${value}`)
      .then((response) => {
        setLoading(false);
        if (response.data && response.data.Search) {
          setMovies(response.data.Search);
        } else {
          setMovies([]);
        }
      })
  };

  return (
    <div class="container-fluid p-3 mb-2 bg-dark text-white">
    <h1>Movie Search App <span><i class="bi bi-film"></i></span></h1>
      <Search
        placeholder="Enter movie title"
        onSearch={handleSearch}
        enterButton
      />

    <div className="App">
    
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={movies}
        loading={loading}
        renderItem={(movie) => (
          <List.Item>
            <Card title={movie.Title}>
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{ width: "100%" }}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>

    </div>
  );
};

export default App;
