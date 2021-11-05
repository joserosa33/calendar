import {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import CalendarForm from './CalendarForm';
import {
    ViewState,
    EditingState,
    IntegratedEditing,
    ChangeSet,
} from '@devexpress/dx-react-scheduler';
import {
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    ConfirmationDialog,
    Scheduler,
    DayView,
    Toolbar,
    ViewSwitcher,
    WeekView,
    CurrentTimeIndicator,
    DateNavigator,
    MonthView,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
    gql,
    useMutation,
    useQuery
} from '@apollo/client';


const getToday = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getUTCDate()}`
}

const ADD_APPOINTMENT = gql`
    mutation CreateAppointement($name: String!, $start: String!, $end: String!, $staff: String!, $client: String!, $notes: String!){
        createAppointment(name: $name, start: $start, end: $end, staff: $staff, client: $client, notes: $notes) {
            id
        }
    }
`;

const DELETE_APPOINTMENT = gql`
    mutation DeleteAppointement($id: String!){
        deleteAppointment(id: $id) {
            id
        }
    }
`;

const GET_APPOINTMENTS = gql`
    query GetAppointments {
        appointments {
            id
            name
            start
            end
            staff
            client
            notes
        }
    }
`;

type Appointment = {
    id: string,
    title: string,
    startDate: string,
    endDate: string,
    client: string,
    staff: string,
    notes: string,
};

const Calendar = () => {
    const [data, setData] = useState<Appointment[]>([]);
    const {error, data: appointmentsData} = useQuery(GET_APPOINTMENTS);
    const [addAppointment] = useMutation(ADD_APPOINTMENT);
    const [deleteAppointment] = useMutation(DELETE_APPOINTMENT);

    if (appointmentsData && appointmentsData.appointments.length > 0 && data.length === 0) {
        const normalizedData = appointmentsData.appointments.map(({id, name, start, end, client, staff, notes}: any) => ({
            id,
            title: name,
            startDate: start,
            endDate: end,
            client,
            staff,
            notes
        }));

        setData(normalizedData);
    }

    if (error) {
        console.error({error}, 'Error loading appointments');
    }

    const commitChanges = ({added, deleted}: ChangeSet) => {
        if (added) {
            const newAppointment: Appointment = {
                id: '',
                title: added.title || 'No title',
                startDate: added.startDate.toISOString(),
                endDate: added.endDate.toISOString(),
                client: added.client?.toString() || '1',
                staff: added.staff?.toString() || '1',
                notes: added.notes || '',
            };

            addAppointment({
                variables: {
                    name: newAppointment.title,
                    start: newAppointment.startDate,
                    end: newAppointment.endDate,
                    client: newAppointment.client,
                    staff: newAppointment.staff,
                    notes: newAppointment.notes,
                }
            }).then(({data: addAppointmentResult}) => {
                newAppointment.id = addAppointmentResult.createAppointment.id.toString();
                setData([...data, newAppointment]);
            })
        }

        if (deleted !== undefined) {
            const newData = data.filter(appointment => appointment.id !== deleted);
            setData(newData);
            deleteAppointment({
                variables: {
                    id: deleted,
                }
            }).then(({data: addAppointmentResult}) => {
                console.log('Deleted ' + addAppointmentResult.deleteAppointment.id);
            });
        }
    }

    return (
        <Paper>
            <Scheduler
                data={data}
                height={660}
            >
                <ViewState
                    defaultCurrentDate={getToday()}
                    defaultCurrentViewName="Week"
                />
                <EditingState
                    onCommitChanges={commitChanges}
                />
                <IntegratedEditing/>
                <DayView/>
                <WeekView/>
                <MonthView/>
                <ConfirmationDialog/>
                <Toolbar/>
                <ViewSwitcher/>
                <Appointments/>
                <AppointmentTooltip/>
                <AppointmentForm basicLayoutComponent={CalendarForm}/>
                <DateNavigator/>
                <TodayButton/>
                <CurrentTimeIndicator
                    updateInterval={10000}
                />
            </Scheduler>
        </Paper>
    )
}

export default Calendar;