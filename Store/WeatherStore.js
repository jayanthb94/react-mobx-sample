import { observable, computed, action, autorun, reaction } from 'mobx';
import React from 'react';

var baseUrl = "http://api.openweathermap.org/data/2.5/forecast?q=";
var appid = "&APPID=350de55550d0910b17ca50a1e502fb91";	
var cnt =  "&cnt=15";


class WeatherStore {
	//search string is city name to be searched
	//changed in header.js
	@observable searchString = ""
	
	//weather data is stored here
	//weather data is rendered in body.js
	@observable weatherData = ""
	
	//to determine whether loading is in progress or not
	@observable isLoading = false	

  	@action startLoading() {
    	this.isLoading = true;
  	}

  	@action stopLoading() {
    	this.isLoading = false;
	}

  	@action updateData(data) {
    	this.weatherData = data;
    	//console.log(this.weatherData)
  	}	

	//Get new weather data from api
	//query is the city name
	@action fetchWeatherData(query) {
		var that = this;
		this.startLoading();	
		fetch(baseUrl + query + appid + cnt)
            .then( (response) => {
                return response.json() })   
                    .then( (json) => {
                        //console.log(json)
                        that.updateData(JSON.stringify(json));
                    });
	    this.stopLoading();
	}	

	constructor(){
		this.subscribeToLocationChanges()
	}	

	//Reaction to auto fetch weather data when search string changes
	subscribeToLocationChanges() {
		reaction(
			() => this.searchString,
			search => this.fetchWeatherData(search)
		);
	}

}

var store = window.store = new WeatherStore

export default store;