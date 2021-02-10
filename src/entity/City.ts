import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Headquarters } from '../entity/Headquarters'

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Headquarters, headquarters => headquarters.id)
    headquarters: Headquarters;
}
