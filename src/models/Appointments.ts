import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('time with time zone')
    date: Date;
}

export default Appointment;