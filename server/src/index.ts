import { GraphQLServer } from 'graphql-yoga';
import resolvers from './graphql/resolvers';
import {AppointmentRepository, ClientRepository, StaffRepository} from './repositories';
import Database from './database';

export type applicationContext = {
    repositories: {
        client: ClientRepository,
        staff: StaffRepository,
        appointment: AppointmentRepository,
    },
};

(async () => {
    const db = new Database(`./db/calendar.db`);

    const context = {
        repositories: {
            client: new ClientRepository(db),
            staff: new StaffRepository(db),
            appointment: new AppointmentRepository(db),
        }
    };

    await context.repositories.client.createTable();
    await context.repositories.staff.createTable();
    await context.repositories.appointment.createTable();

    const server = new GraphQLServer({
        typeDefs: `./src/graphql/schema.graphql`,
        resolvers,
        context,
    });

    server.start(() => console.log('Server is running on localhost:4000'));
})();
