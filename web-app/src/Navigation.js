import React, { Component } from 'react';

const homeLink = "http://localhost:8080";

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchKeyWord: ""			// corresponding to the search keyword inserted by user
		}
		this.handleSearch = this.handleSearch.bind(this)
		this.handleOnKeyUp = this.handleOnKeyUp.bind(this)
		this.onTextChange = this.onTextChange.bind(this)
	}

	// Handling the event when user click search button
	handleSearch() {
		this.props.onSearchKeyWordChange(this.state.searchKeyWord.trim())
	}

	// Handling the event when user press enter
	handleOnKeyUp(event) {
		if (event.keyCode === 13) {
			this.props.onSearchKeyWordChange(this.state.searchKeyWord.trim())
		}
	}

	// Handling text change on search box
	onTextChange(event) {
		this.setState({
			searchKeyWord: event.target.value
		})
	}

	// Rendering navigation
	render() {
		return(
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>                        
						</button>
						<a className="navbar-brand" href={homeLink}>Library</a>
					</div>
					<div className="collapse navbar-collapse" id="myNavbar">
						<ul className="nav navbar-nav">
							<li className="active"><a href={homeLink}>Trang chủ</a></li>
						</ul>
						<form className="navbar-form navbar-right" role="search" action='#'>
							<div className="form-group input-group">
								<input type="text" className="form-control" placeholder="Tìm kiếm tên sách..." onKeyUp={this.handleOnKeyUp} onChange={this.onTextChange}/>
								<span className="input-group-btn">
									<button className="btn btn-default" type="button" onClick={this.handleSearch}>
										<span className="glyphicon glyphicon-search"></span>
									</button>
								</span>
							</div>
						</form>
					</div>
				</div>
			</nav>
		)
	}
}

export default Navigation;