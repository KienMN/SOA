import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation';
import Jumbotron from './Jumbotron';
import BookList from './BookList';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchKeyWord: ""	// corresponding to search keyword provided by user
		}
		this.changeKeyWord = this.changeKeyWord.bind(this);
	}

	// Handling search keyword change
	changeKeyWord(newKeyWord) {
		if (newKeyWord !== this.state.searchKeyWord) {
			this.setState({
				searchKeyWord: newKeyWord
			})
		}
	}

	// Rendering entire interface to the user
	render() {
		const title = (this.state.searchKeyWord === "") ? <div></div> : <div>Kết quả tìm kiếm cho tên sách: {this.state.searchKeyWord} </div>
		return (
			<div className="App">
				<Navigation onSearchKeyWordChange={this.changeKeyWord}/>
				<Jumbotron />
				{title}
				<br />
				<BookList searchKeyword={this.state.searchKeyWord} />
			</div>
		);
	}
}

export default App;