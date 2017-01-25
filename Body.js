import React from 'react';
import store from './Store/WeatherStore.js'
import { observer } from 'mobx-react'



@observer
class Body extends React.Component {
	constructor(){
		super();		
	}	

	render() {	
		if(store.isLoading){
			return <h1 style={{'margin-left': 10}}>Loading is in progress</h1>;
		} else {
			if(store.weatherData != "" ){
				var jsonresponse = JSON.parse(store.weatherData);				
				return (<div>
						<h1 style={{'margin-left': 10}}>{jsonresponse.city.name}</h1>
						<table className="tablestyle">
							<thead>
								<tr>
									<th>Date</th>
									<th>Temp (in K)</th>
									<th>Min Temp (in K)</th>
									<th>Max Temp (in K)</th>
									<th>Humidity</th>
								</tr>		
							</thead>
							<tbody>				
								{jsonresponse.list.map((place, i) => 
								<Place key={i} loc={place} />)}
							</tbody>
						</table>
					</div>);					
			} else {
				return <h1 style={{'margin-left': 10}}>Enter a place</h1>;
			}
		}
			
	}
}

class Place extends React.Component {
	constructor(props){
		super(props);
		this.place = this.props.loc;
		console.log(this.place);
	}

	componentWillReceiveProps(newProps){
		this.place = newProps.loc;
	}

	render() {
		return (<tr>
				<td >{this.place.dt_txt}</td>
				<td >{this.place.main.temp}</td>
				<td >{this.place.main.temp_min}</td>
				<td >{this.place.main.temp_max}</td>
				<td >{this.place.main.humidity}</td>
				</tr>);
	}
}

export default Body;