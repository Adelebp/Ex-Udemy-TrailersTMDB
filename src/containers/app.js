import React, { Component } from 'react';
import SearchBar from '../components/search-bar';
import VideoList from './video-list';
import axios from 'axios';
import VideoDetail from '../components/video-detail';
import Video from '../components/video';
import "../components/style/style.css";

const API_END_POINT = 'https://api.themoviedb.org/3/';
const POPULAR_MOVIES_URL =
	'discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images';
const API_KEY = 'api_key=13c8acad6b071bebbae0a036d0dfbc2c';

class App extends Component {
	constructor(props) {
		super(props);
		// On crée deux state vides, un pour la liste de films à droite et un pour le film qui sera en avant.
		this.state = { movieList: {}, currentMovie: {} };
	}
	componentWillMount() {
		this.initMovies();
	}
	initMovies() {
		// On fait une requête GET pour aller chercher les infos qui nous intéressent dans l'api.

		axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(
			function (response) {
				// On modifie le state de movies après avoir regardé dans la console le chemin pour récupérer les infos. On le slice pour ne séléctionner que les 6 premiers films. Grâce à ça, notre state est rempli de 6 films.
				this.setState(
					{
						movieList: response.data.results.slice(1, 6),
						currentMovie: response.data.results[0],
					},
					function () {
						this.applyVideoToCurrentMovie();
						// function(){this.applyVideoToCurrentMovie()} permet de mettre à jour le state
					}
				);

				// console.log('', this.state.movieList);
			}.bind(this)
		);
		// on bind pour récupérer le this sinon il reste attaché au state et ne se modifie pas
	}

	applyVideoToCurrentMovie() {
		// On récupère l'url qui mène aux vidéos et on ajoute les const pour intégrer l'url et la key. On intègre le state qui va aller chercher chaque vidéo en fonction de l'id voulu
		axios
			.get(
				`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`
			)
			.then(
				function (response) {
					this.applyVideoToCurrentMovie();
					console.log('', response);
					// On récupère la vidéo et on stock
					const youtubeKey = response.data.videos.results[0].key;
					// Mettre à jour le state avec un nouveau champ avec l'id de la video: stocké dans youtubeKey, currentMovie devient NewCurrentMovieState
					let newCurrentMovieState = this.state.currentMovie;
					newCurrentMovieState.videoId = youtubeKey;
					this.setState({ currentMovie: newCurrentMovieState });
				}.bind(this)
			);
	}

	render() {
		// cette const permet de dire "si le state de movieList contient bien 5 film, return les 5 films sinon ne return rien"
		const renderVideoList = () => {
			if (this.state.movieList.length >= 5) {
				return <VideoList movieList={this.state.movieList} />;
				{
					/* On envoi la liste de film seléctionné dans VideoList */
				}
			}
		};
		return (
			<div>
				<div className='search_bar'>
					<SearchBar />
				</div>
				<div className='row'>
					<div className='col-md-8'>
						<Video videoId={this.state.currentMovie.videoId} />
						<VideoDetail
							title={this.state.currentMovie.title}
							description={this.state.currentMovie.overview}
						/>
					</div>
					<div className='col-md-4'>{renderVideoList()}</div>
				</div>

				{/* Le .title et le .overview sont les chemin de l'api pour récupérer le titre et la description */}
			</div>
		);
	}
}

export default App;
