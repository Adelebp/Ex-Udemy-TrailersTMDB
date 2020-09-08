import React, { Component } from 'react';

class SearchBar extends Component {
	//on fait une classe au lieu d'une const si le composant a une logique, sinon c'est const
	constructor(props) {
		//sert à récéptionner des valeurs pour modifier l'input//
		super(props);
		this.state = { searchText: '', placeholder: 'Tapez votre film...' }; //le constructor est le seul endroit on où peut modifier le state avec un =, si on veut modifier une valeur du state, on passe par la fonction setState//
	}
	render() {
		return (
			<div className='row'>
				<div className='col-md-8'>
					<input
						type='text'
						// className pour agrandir la barre de recherche
						className='form-control input-lg' 
						onChange={this.handleChange.bind(this)} //bind(this) sert à lier les this à cet évènement (handleChange) sinon il est lié au state qui est dans le constructor et on ne veut pas que tout le state soit modifier, seulement une valeur//
						placeholder={this.state.placeholder}
					/>
				</div>
			</div>
		);
	}

	handleChange(event) {
		this.setState({ searchText: event.target.value });
	}
}

export default SearchBar;
