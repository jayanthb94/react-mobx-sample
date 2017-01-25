import { observable, computed, action, autorun, reaction } from 'mobx';
import React from 'react';

var baseUrl = "http://api.openweathermap.org/data/2.5/forecast?q=";
var appid = "&APPID=350de55550d0910b17ca50a1e502fb91";	
var cnt =  "&cnt=15";


class WeatherStore {
	@observable searchString = ""
	@observable weatherData = ""
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

	@action fetchWeatherData(query) {
		var that = this;
		this.startLoading();	
		//console.log(query + "from here yo dude")
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

	subscribeToLocationChanges() {
		reaction(
			() => this.searchString,
			search => this.fetchWeatherData(search)
		);
	}

}

var store = window.store = new WeatherStore

export default store;