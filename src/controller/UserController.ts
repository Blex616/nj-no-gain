import { getRepository, In } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { generateAccessToken } from "./../middleware/JWT";
import { User } from "../entity/User";
import { Headquarters } from "../entity/Headquarters";

export class UserController {

    private userRepository = getRepository(User);
    private hquartersRepository = getRepository(Headquarters);

    async login(request: Request, response: Response, next: NextFunction) {
        let { identification, password } = request.body;
        if (!(identification && password)) {
            response.status(400);
            return { "accessToken": null, "message_error": "Datos vacios" }
        }
        try {
            let user = await this.userRepository.findOne({ identification: identification });
            if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
                response.status(401);
                return { "accessToken": null, "message_error": "Email o contraseña incorrecta" }
            }
            const userData = {
                "id": user.id,
                "identification": user.identification,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "role": user.role,
            };
            const accessToken = generateAccessToken(userData);
            response.status(200);
            return { "accessToken": accessToken, "message_error": null }

        }catch(error){
            return { "accessToken": null, "message_error": error }
        }
    }

    async usersForHquarter(request: Request, response: Response, next: NextFunction) {
        try {
            let usersHquarter = await this.userRepository.find({ relations: ["headquarter"], where: { headquarter: request.params.hquarter  } })
            response.status(200);
            return usersHquarter || []
        } catch (error) {
            response.status(500);
            return { "message_error": error }
        }
    }

    async usersForHquarterCity(request: Request, response: Response, next: NextFunction) {
        try {
            let hquarter = await this.hquartersRepository.find({ where: { id: request.params.hquarter, city: request.params.city } })
            let usersHquarter = await this.userRepository.find({ relations: ["headquarter"], where: { headquarter: In(hquarter.map(a => a.id)) } })
            response.status(200);
            return usersHquarter || []
        } catch (error) {
            response.status(500);
            return { "message_error": error }
        }
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return await this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            let validateUser = await this.userRepository.findOne({ where: { identification: request.body.identification }});
            if (validateUser) {
                response.status(400);
                return { "message_error": "El usuario ya se encuentra registrado en la aplicación" }
            }
            let user = new User();
            user.identification = request.body.identification;
            user.firstName = request.body.firstName;
            user.lastName = request.body.lastName;
            user.password = request.body.password;
            user.role = request.body.role;
            user.headquarter = request.body.headquarter;
            const instance = await this.userRepository.save(user);
            response.status(200);
            return instance;
        } catch (error) {
            response.status(500);
            return { "message_error": error }
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const user = await this.userRepository.findOne({ where: { id: request.body.id } });
            if (user) {
                // user.identification = request.body.identification;
                user.firstName = request.body.firstName;
                user.lastName = request.body.lastName;
                var new_instance = await this.userRepository.save(user);
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
            let userToRemove = await this.userRepository.findOne(request.params.id);
            let userReturn = userToRemove;
            await this.userRepository.remove(userToRemove);
            response.status(200)
            return userReturn
        } catch (error) {
            response.status(500)
            return { "message_error": error }
        }
    }

}