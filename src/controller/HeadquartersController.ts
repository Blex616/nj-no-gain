import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Headquarters } from "../entity/Headquarters";

export class HeadquartersController {

    private hquartersRepository = getRepository(Headquarters);

    async all(request: Request, response: Response, next: NextFunction) {
        return await this.hquartersRepository.find({relations : ["city"] })
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.hquartersRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            let hquarter = new Headquarters();
            hquarter.name = request.body.name;
            hquarter.city = request.body.city;
            const instance = await this.hquartersRepository.save(hquarter);
            response.status(200);
            return {
                "instance": instance,
                "hquarters": await this.hquartersRepository.find({ relations: ["city"] })
            };
        } catch (error) {
            response.status(500);
            return { "message_error": error }
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const hquarter = await this.hquartersRepository.findOne({ where: { id: request.body.id } });
            if (hquarter) {
                hquarter.name = request.body.name;
                hquarter.city = request.body.city;
                var new_instance = await this.hquartersRepository.save(hquarter);
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
            let hquarterToRemove = await this.hquartersRepository.findOne(request.params.id);
            let hquarterReturn = hquarterToRemove;
            await this.hquartersRepository.remove(hquarterToRemove);
            response.status(200)
            return hquarterReturn
        } catch (error) {
            response.status(500)
            return { "message_error": error }
        }
    }

    async hquartersCity(request: Request, response: Response, next: NextFunction) {
        try {
            let hquartersCity = await this.hquartersRepository.find({ relations: ['city'], where: { city: request.params.city } })
            response.status(200);
            return hquartersCity || []
        } catch (error) {
            response.status(500);
            return { "message_error": error }
        }
    }

}