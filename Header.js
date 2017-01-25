import React from 'react';
import { observer } from 'mobx-react';
import store from './Store/WeatherStore.js'

var HeaderStyles = {
	logostyle : {
		width: 200		
	}
};

@observer
class Header extends React.Component {
	constructor(props){
		super();
		this.logo = "./logo.png";	
		this.state = {
			inputBox: ""
		};

	}			

	searchRepos() {  		
		if(this.state.inputBox.length > 0){
			store.searchString = this.state.inputBox;
		}
	}

	handleChange(e) {
		const newurl = e.target.value;
		this.setState({inputBox: newurl});		
	}

	render() {		
		//<button>Trending Topics</button>	
		return (
			<header className="floatwrapper">
				<img style={HeaderStyles.logostyle} src={this.logo} />	
				<div className="searchBar">
					<input type="input" onChange={this.handleChange.bind(this)}/>
					<button onClick={this.searchRepos.bind(this)}>Search Github</button>									
				</div>						
			</header>
		);
	}
}

export default Header;