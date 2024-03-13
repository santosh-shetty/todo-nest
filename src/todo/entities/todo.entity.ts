import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('')
export class Todo {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column({type: 'text', nullable:true})
    description: string;

    @Column({default:false})
    isCompleted: boolean;
}
