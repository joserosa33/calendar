import {AppointmentModel, ClientModel, StaffModel} from '../models';
import {applicationContext} from '../index';

export default {
    Query: {
        staff: (parent: any, params: any, {repositories}: applicationContext) => repositories.staff.getAll(),
        clients: (parent: any, params: any, {repositories}: applicationContext) => repositories.client.getAll(),
        appointments: (parent: any, params: any, {repositories}: applicationContext) => repositories.appointment.getAll(),
    },
    Mutation: {
        createClient: (parent: any, clientModel: ClientModel, {repositories}: applicationContext) => repositories.client.add(clientModel),
        deleteClient: (parent: any, {id}: {id: string}, {repositories}: applicationContext) => repositories.client.delete(id),
        createStaff: (parent: any, staffModel: StaffModel, {repositories}: applicationContext) => repositories.staff.add(staffModel),
        deleteStaff: (parent: any, {id}: {id: string}, {repositories}: applicationContext) => repositories.staff.delete(id),
        createAppointment: (parent: any, appointmentModel: AppointmentModel, {repositories}: applicationContext) => repositories.appointment.add(appointmentModel),
        deleteAppointment: (parent: any, {id}: {id: string}, {repositories}: applicationContext) => repositories.appointment.delete(id),
    }
}