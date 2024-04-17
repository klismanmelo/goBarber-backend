import { Router, request, response } from 'express'
import { startOfHour, parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all()

    return response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body

    const parseDate = startOfHour(parseISO(date))

    const findAppointmentsInSameDate = appointmentsRepository.findByDte(parseDate)

    if(findAppointmentsInSameDate){
        return response.status(400).json({message: 'This appointments is alredy booked'})
    }

    const appointment = appointmentsRepository.create(provider, parseDate)

    return response.json(appointment)
})

export default appointmentsRouter