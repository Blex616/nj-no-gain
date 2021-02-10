import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { City } from "../entity/City";
// import * as jwt from "jsonwebtoken";

export class CityController {

    private cityRepository = getRepository(City);

    async all(request: Request, response: Response, next: NextFunction) {
        return await this.cityRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.cityRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            let city = new City();
            city.name = request.body.name;
            const instance = await this.cityRepository.save(city);
            response.status(200);
            return instance;
        } catch (error) {
            response.status(500);
            return { "message_error": error }
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const city = await this.cityRepository.findOne({ where: { id: request.body.id } });
            if (city) {
                city.name = request.body.name;
                var new_instance = await this.cityRepository.save(city);
                response.status(200);
                return new_instance;
            } else {
                response.status(404);
                return { "message_error": "No se encontro ningún registro" }
            }
        } catch (error) {
            response.status(500);
            return { "message_error": error }
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            let cityToRemove = await this.cityRepository.findOne(request.params.id);
            let cityReturn = cityToRemove;
            await this.cityRepository.remove(cityToRemove);
            response.status(200)
            return cityReturn
        } catch (error) {
            response.status(500)
            return { "message_error": error }
        }
    }

}