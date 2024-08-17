import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './weather-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  providers: [WeatherService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  weatherData: any;
  idWeather: number = 0;
  cityName: string = '';
  countryName: string ='';
  date: Date = new Date();
  daysOfTheWeek: string[] = ['Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dayName: string = this.daysOfTheWeek[this.date.getDay()]
  stringMonth: string = this.months[this.date.getMonth()]
  hours: number = this.date.getHours();
  minutes: number = this.date.getMinutes();
  dayMonth: number = this.date.getDate();
  year: number = this.date.getFullYear();
  zoneTime: string = '';
  degressCelsius: number = 0;
  FloorDegress: number = 0;
  humidity: number = 0;
  windSpeed: number = 0;
  pressure: number = 0;
  visibility: number = 0;
  seaLevel: number = 0;
  groundLevel: number = 0;
  states = {
    Drizzle: false,
    Rain: false,
    Thunderstorm: false, 
    Snow: false,
    Atmosphere: false,
    Clouds: false,
    Clear:false
  };
  
  constructor(private weatherService: WeatherService) {}
  
  ngOnInit(): void {
    this.weatherService.getWeather().subscribe(
      (data) => {
        this.weatherData = data;
        this.setZoneTime();
        this.cityName = data.name;
        this.countryName = data.sys.country;
        this.idWeather = data.weather[0].id;
        this.degressCelsius = data.main.temp;
        this.FloorDegress = Math.floor(this.dayMonth);
        this.humidity = data.main.humidity;
        this.windSpeed = data.wind.speed;
        this.pressure = data.main.pressure;
        this.visibility = data.visibility;
        this.seaLevel = data.main.sea_level;
        this.groundLevel = data.main.grnd_level;
        this.updateStates();
        console.log(this.weatherData = data);
        console.log(this.cityName = data.name);
        console.log(this.countryName = data.sys.country);
        console.log(this.idWeather = data.weather[0].id);
        console.log(this.degressCelsius = data.main.temp);
        console.log(this.FloorDegress = Math.floor(this.dayMonth));
        console.log(this.humidity = data.main.humidity);
        console.log(this.windSpeed = data.wind.speed);
        console.log(this.dayName);
        
      },
      (error: any) => { 
        console.log('Error fetching weather data:', error);
      }
    );

    const cityData ={
      cityName: this.cityName,
      imageUrl: `https://example.com/images/${this.cityName}.jpg` 
    } 

    // this.weatherService.cityWeather(cityData).subscribe(
    //   (data) => {
    //     console.log("response", data);
        
    //   },
    //   (error: any) => { 
    //     console.log('Error fetching weather data:', error);
    //   }
    // )
  }
  
  updateStates(): void {
    if (this.idWeather >= 200 && this.idWeather < 232) {
      this.states.Thunderstorm = true;
    }
    if (this.idWeather >= 300 && this.idWeather < 321) {
      this.states.Drizzle = true;
    }
    if (this.idWeather >= 500 && this.idWeather < 531) {
      this.states.Rain = true;
    }
    if (this.idWeather >= 600 && this.idWeather < 622) {
      this.states.Snow = true;
    }
    if (this.idWeather >= 701 && this.idWeather < 781  ) {
      this.states.Atmosphere = true;
    }
    if (this.idWeather >= 701 && this.idWeather < 781  ) {
      this.states.Atmosphere = true;
    }
    if (this.idWeather == 800 ) {
      this.states.Clear = true;
    }
    if (this.idWeather >= 801 && this.idWeather < 805) {
      this.states.Clouds = true;
    }
  }

  setZoneTime(){
    if(this.hours >= 0 && this.hours > 12){
      this.zoneTime = 'AM'
    }else{
      this.zoneTime = 'PM'
    }
  }
  
}
