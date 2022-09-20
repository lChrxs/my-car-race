import { Pilot } from "./pilot.model"

export interface Car {
  carNumber:          number,
  color:              string,
  pilot?:             Pilot, 
  distanceTravelled:  number, //default 0
  status:             string, //Detenido (default), Avanzando
  start(): void,
  updateDistance(distance?: number): void //Recibe un valor entre 1 y 50 para aumentar distanceTravelled, si termino la carrera, siempre aumenta 50
  stop(): void
}