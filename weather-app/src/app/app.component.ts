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
  //api data array
  weatherData: any;

  idWeather: number = 0;
  cityName: string = 'Bogota';
  countryName: string ='';
  date: Date = new Date();
  daysOfTheWeek: string[] = ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
  searhValue: string = '';
  noCity: boolean = false;
  showWeather:boolean = false;
  states = {
    Drizzle: false,
    Rain: false,
    Thunderstorm: false, 
    Snow: false,
    Atmosphere: false,
    Clouds: false,
    Sunny:false
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
        
      },
      (error: any) => { 
        console.log('Error fetching weather data:', error);
      }
    );

    // const cityData ={
    //   cityName: this.cityName,
    //   imageUrl: `https://example.com/images/${this.cityName}.jpg` 
    // } 

    // this.weatherService.cityWeather(cityData).subscribe(
    //   (data) => {
    //     console.log("response", data);
        
    //   },
    //   (error: any) => { 
    //     console.log('Error fetching weather data:', error);
    //   }
    // )
  }

  searchCity(){
      if(this.searhValue === ''){
          this.noCity = true;
      }else{
        this.noCity = false;
        this.cityName = this.searhValue; 
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
            // this.cityName = data.name.filter(this.cityName => 
            //   this.cityName.includes(this.searhValue));    
          },
          (error: any) => { 
            console.log('Error searching the city:', error);
          }
        );
      }
  // Call the weather service to search for the city
  // this.weatherService.getCityWeather(this.searhValue).subscribe(
  //   (data: any) => {
  //     // Assuming the API returns a list of cities, filter them by the search term
  //     this.weatherData = data.filter((city: any) => 
  //       city.name.toLowerCase().includes(this.searhValue.toLowerCase())
  //     );
  //     console.log(this.weatherData);
  //   },
  //   (error: any) => {
  //     console.log('Error searching city:', error);
  //   }
  // );
  // getWeather(): Observable<any> {
  //   const url = `${this.apiUrl}?q=${this.cityName}&appid=${this.apiKey}&units=metric`;
  //   return this.http.get<any>(url);
  // }

  // getCityWeather(cityName: string): Observable<any> {
  //   const url = `${this.apiUrl}?q=${cityName}&appid=${this.apiKey}&units=metric`;
  //   return this.http.get<any>(url);
  // }
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
      this.states.Sunny = true;
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
