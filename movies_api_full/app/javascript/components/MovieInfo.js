import React from 'react'

export class MovieInfo extends React.Component {

  constructor() {
     super();
     this.state = {
       movies: []
     };
   }

  componentDidMount(){
    fetch("/api/v1/movies")
    .then(resp => resp.json())
    .then(a => {
      this.setState({
        movies: a
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
      {this.state.movies.map(obj =>
        <p key={obj.id}>{obj.name}</p>

      )}
     </div>
  )
}

}
export default MovieInfo;
