import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { User } from '../entity/User'
import { City } from '../entity/City'

@Entity()
export class Headquarters {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, user => user.id)
    user: User;

    @ManyToOne(type => City, city => city.id)
    city: City;
}
