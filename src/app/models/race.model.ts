import { Car } from "./car.model";

export interface Race {
  cars:       Car[],
  laps:       number,
  distance:   number, //KM * vuelta
  status:     string //Nueva, En proceso, Terminada
}