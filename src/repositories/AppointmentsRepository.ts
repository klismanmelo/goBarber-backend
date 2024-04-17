import { isEqual } from "date-fns";
import Appointment from "../models/Appointments";

interface CreateAppointmentsDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments: Appointment[]

    constructor() {
        this.appointments = []
    }

    public all(): Appointment[] {
        return this.appointments
    }

    public findByDte(date: Date): Appointment | null {
        const findAppointments = this.appointments.find(appointment => 
            isEqual(date, appointment.date)
        )

        return findAppointments || null
    }

    public create({ provider, date }: CreateAppointmentsDTO): Appointment{
        const appointment = new Appointment({provider, date})

        this.appointments.push(appointment)

        return appointment;
    }
}

export default AppointmentsRepository