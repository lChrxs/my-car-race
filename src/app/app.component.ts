import { Component } from '@angular/core';
import { Race } from './models/race.model';
import { Pilot } from './models/pilot.model';
import { Car } from './models/car.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-car-race';

  constructor(){

    const pilot1: Pilot = {
      id: 1,
      name: 'Carlos',
      lastName: 'Sainz',
      nationality: 'Spanish'
    }
  
    const pilot2: Pilot = {
      id: 2,
      name: 'Max',
      lastName: 'Verstappen',
      nationality: 'Belgian-Dutch'
    }
  
    const pilot3: Pilot = {
      id: 3,
      name: 'Sergio',
      lastName: 'Perez',
      nationality: 'Mexican'
    }
  
    const pilot4: Pilot = {
      id: 4,
      name: 'Fernando',
      lastName: 'Alonso',
      nationality: 'Spanish'
    }

    function getRandomIntInclusive(min = 1, max = 50): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    let car1: Car = {
      carNumber: 55,
      color: 'Rojo',
      pilot: pilot1,
      distanceTravelled: 0,
      status: 'Detenido',
      start() {
        this.status = 'Avanzando';
        this.updateDistance(getRandomIntInclusive());
      },
      updateDistance(distance: number){
        this.distanceTravelled += distance ?? getRandomIntInclusive();
      },
      stop(){
        this.status = 'Detenido';
      }
    }

    let car2: Car = {
      carNumber: 1,
      color: 'Azul',
      pilot: pilot2,
      distanceTravelled: 0,
      status: 'Detenido',
      start() {
        this.status = 'Avanzando';
        this.updateDistance(getRandomIntInclusive());
      },
      updateDistance(distance: number){
        this.distanceTravelled += distance ?? getRandomIntInclusive();
      },
      stop(){
        this.status = 'Detenido';
      }
    }

    let car3: Car = {
      carNumber: 11,
      color: 'Verde',
      pilot: pilot3,
      distanceTravelled: 0,
      status: 'Detenido',
      start() {
        this.status = 'Avanzando';
        this.updateDistance(getRandomIntInclusive());
      },
      updateDistance(distance: number){
        this.distanceTravelled += distance ?? getRandomIntInclusive();
      },
      stop(){
        this.status = 'Detenido';
      }
    }

    let car4: Car = {
      carNumber: 14,
      color: 'Rosa',
      pilot: pilot4,
      distanceTravelled: 0,
      status: 'Detenido',
      start() {
        this.status = 'Avanzando';
        this.updateDistance(getRandomIntInclusive());
      },
      updateDistance(distance: number){
        this.distanceTravelled += distance ?? getRandomIntInclusive();
      },
      stop(){
        this.status = 'Detenido';
      }
    }

    let car5: Car = {
      carNumber: 10,
      color: 'Rosa',
      distanceTravelled: 0,
      status: 'Detenido',
      start() {
        this.status = 'Avanzando';
        this.updateDistance(getRandomIntInclusive());
      },
      updateDistance(distance: number){
        this.distanceTravelled += distance ?? getRandomIntInclusive();
      },
      stop(){
        this.status = 'Detenido';
      }
    }

    let race: Race = {
      cars: [car1, car2, car3, car4],
      laps: 3,
      distance: 150,
      status: 'Nueva'
    }

    this.startRace(race);

    do{
      this.showPositions(race);
    }while(race.status != 'Terminada')

    const ORDERLY_RACE: Car[] = this.checkPosition(race.cars);
    const {carNumber: winnerCar, pilot: winnerPilot} = ORDERLY_RACE[0];
    const {nationality, name, lastName} = winnerPilot!;
    
    const WINNER = `
    El ganador es:
    Nacionalidad: ${nationality}
    Piloto: ${name} ${lastName}
    Car: ${winnerCar}`;

    console.log(WINNER);

  }


  startRace(race: Race): void{
    if(race.status == 'Nueva'){ //Validar si la carrera tiene status de Nueva

      race.cars.forEach(car => car.start()); //Arrancar cada auto participante

      race.status = 'En Proceso';
    } else {
      console.log('La carrera tiene el status: ' + race.status);
    }
  }


  updateRace(race: Race): void{
    if(race.status == 'En Proceso'){ //Validar si la carrera tiene status de En Proceso
      const TOTAL_DISTANCE: number = race.distance * race.laps;
      let finishedCars: number = 0;

      race.cars.forEach(car => { //Actualizar la distancia recorrida de cada auto
        if(car.distanceTravelled < TOTAL_DISTANCE){
          car.updateDistance();
        }else if(car.distanceTravelled >= TOTAL_DISTANCE){
          car.updateDistance(50);
          finishedCars++;
        }
      })

      if(race.cars.length == finishedCars){ //Si el tamaño del arreglo de autos es igual a los autos que terminaron, quiere decir que todos los autos terminaron la carrera.
        race.status = 'Terminada';
      }

    }
  }


  showPositions(race: Race): void{
    this.updateRace(race);
    console.log('Status de la carrera: ' + race.status);

    let positions: any[] = [];
    const ORDERLY_RACE: Car[] = this.checkPosition(race.cars);

    ORDERLY_RACE.forEach((value, index) => {
      let car: any = {
        position: index+1,
        country: value.pilot?.nationality,
        name: value.pilot?.name + ' ' + value.pilot?.lastName,
        carNumber: value.carNumber
      }

      positions.push(car)
    })

    console.table(positions)

  }


/**
 * The function takes an array of cars, sorts them by distance travelled, and returns the sorted array
 * @param {Car[]} cars - Car[] - this is the array of cars that we are sorting.
 * @returns The cars are being sorted by the distance they have travelled.
 */
  checkPosition(cars: Car[]){
    return cars.sort(((a: Car, b: Car) => b.distanceTravelled - a.distanceTravelled));
  }

}
