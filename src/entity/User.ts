import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from "typeorm";
import { Length } from "class-validator";
import { Headquarters } from '../entity/Headquarters'
import * as bcrypt from "bcrypt";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    identification: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    role: string;

    @Column()
    @Length(4, 100)
    password: string;

    @ManyToOne(type => Headquarters, headquarter => headquarter.id)
    headquarter: Headquarters;

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

}
