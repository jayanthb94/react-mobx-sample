import React from 'react';
import Header from './Header.js'
import Body from './Body.js'
import Footer from './Footer.js'
import DevTools from 'mobx-react-devtools';


class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			searchstring: ""
		};	
	}

	setUrl(searchstring){
		this.setState({searchstring});
		console.log(searchstring);
	}

   render() {
      return (
         <div>
         	 <DevTools />
         	 <Header seturl={this.setUrl.bind(this)}/>
	         <section id="body">
	         	<Body searchstring={this.state.searchstring}/>
	         </section>
	         <DevTools />
	         <Footer />
         </div>
      );
   }
}



export default Main;
