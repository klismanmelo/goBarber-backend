import { startOfHour } from "date-fns";
import { getCustomRepository } from 'typeorm'
import Appointment from "../models/Appointments";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository)
        const appointmentDate = startOfHour(date)

        const findAppointmentsInSameDate =  await appointmentsRepository.findByDate(appointmentDate)
    
        if(findAppointmentsInSameDate){
            throw Error('This appointments is alredy booked')
        }
    
        const appointment = appointmentsRepository.create({ 
            provider, 
            date: appointmentDate 
        })

        await appointmentsRepository.save(appointment)

        return appointment
    }
}

export default CreateAppointmentService