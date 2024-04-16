import { Router } from 'express'
import { startOfHour, parseISO, isEqual } from 'date-fns'

import Appointment from '../models/Appointments'

const appointmentsRouter = Router()

const appointments: Appointment[] = []

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body

    const parseDate = startOfHour(parseISO(date))

    const findAppointmentsInSameDate = appointments.find(appointment => 
        isEqual(parseDate, appointment.date)
    )

    if(findAppointmentsInSameDate){
        return response.status(400).json({message: 'This appointments is alredy booked'})
    }

    const appointment = new Appointment(provider, parseDate)

    appointments.push(appointment)

    return response.json(appointment)
})

export default appointmentsRouter