import { UserController } from "./controller/UserController";
import { CityController } from "./controller/CityController";
import { HeadquartersController } from './controller/HeadquartersController'

export const Routes = [

    // User
    {
        method: "post",
        route: "/api/user/login",
        controller: UserController,
        action: "login",
        roles: []
    },
    {
        method: "get",
        route: "/api/users/hquarter/:hquarter",
        controller: UserController,
        action: "usersForHquarter",
        roles: []
    },
    {
        method: "get",
        route: "/api/users/hquarter/:city/:hquarter",
        controller: UserController,
        action: "usersForHquarterCity",
        roles: []
    },
    {
        method: "get",
        route: "/api/user/:id",
        controller: UserController,
        action: "one",
        roles: []
    },
    {
        method: "get",
        route: "/api/users",
        controller: UserController,
        action: "all",
        roles: []
    },
    {
        method: "post",
        route: "/api/user/save",
        controller: UserController,
        action: "save",
        roles: []
    },
    {
        method: "put",
        route: "/api/user/update",
        controller: UserController,
        action: "update",
        roles: []
    },
    {
        method: "delete",
        route: "/api/user/delete/:id",
        controller: UserController,
        action: "remove",
        roles: []
    },
    // City 
    {
        method: "get",
        route: "/api/city/:id",
        controller: CityController,
        action: "one",
        roles: []
    },
    {
        method: "get",
        route: "/api/citys",
        controller: CityController,
        action: "all",
        roles: []
    },
    {
        method: "post",
        route: "/api/city/save",
        controller: CityController,
        action: "save",
        roles: ["ADMIN"]
    },
    {
        method: "put",
        route: "/api/city/update",
        controller: CityController,
        action: "update",
        roles: []
    },
    {
        method: "delete",
        route: "/api/city/delete/:id",
        controller: CityController,
        action: "remove",
        roles: []
    },
    // HeadQuarter 
    {
        method: "get",
        route: "/api/headquarter/:id",
        controller: HeadquartersController,
        action: "one",
        roles: []
    },
    {
        method: "get",
        route: "/api/headquarters",
        controller: HeadquartersController,
        action: "all",
        roles: []
    },
    {
        method: "post",
        route: "/api/headquarter/save",
        controller: HeadquartersController,
        action: "save",
        roles: ["ADMIN"]
    },
    {
        method: "put",
        route: "/api/headquarter/update",
        controller: HeadquartersController,
        action: "update",
        roles: []
    },
    {
        method: "delete",
        route: "/api/headquarter/delete/:id",
        controller: HeadquartersController,
        action: "remove",
        roles: []
    },
    
];