import {gql, useQuery} from "@apollo/client";
import {AppointmentForm} from "@devexpress/dx-react-scheduler-material-ui";

const GET_CLIENTS = gql`
    query GetClients {
        clients {
            id
            name
        }
    }
`;

const GET_STAFF = gql`
    query GetStaff {
        staff {
            id
            firstName
            lastName
        }
    }
`;

const CalendarForm = (props: any) => {
    const { appointmentData, onFieldChange} = props;
    const { error: clientError, data: clientsData } = useQuery(GET_CLIENTS, {
        fetchPolicy: 'network-only'
    });
    const { error: staffError, data: staffData } = useQuery(GET_STAFF, {
        fetchPolicy: 'network-only'
    });

    let clientsArray = [];
    let staffArray = [];

    if(clientsData && clientsData.clients.length > 0 && clientsArray.length === 0) {
        clientsArray = clientsData.clients.map(({id, name}: any) => ({
            id,
            text: name,
        }));
    }

    if(staffData && staffData.staff.length > 0 && staffArray.length === 0) {
        staffArray = staffData.staff.map(({id, firstName, lastName}: any) => ({
            id,
            text: `${firstName} ${lastName}`,
        }));
    }

    if(clientError || staffError) {
        console.error({
            clientError,
            staffError,
        });
    }

    const onStaffChange = (nextValue: number|string) => {
        onFieldChange({staff: nextValue});
    }

    const onClientChange = (nextValue: number|string) => {
        onFieldChange({client: nextValue});
    }

    return (
        <AppointmentForm.BasicLayout {...props}>
            <AppointmentForm.Select  onValueChange={onStaffChange} value={appointmentData.staff || 1} availableOptions={staffArray} type={"filledSelect"} />
            <AppointmentForm.Select  onValueChange={onClientChange} value={appointmentData.client || 1} availableOptions={clientsArray} type={"filledSelect"} />
        </AppointmentForm.BasicLayout>
    )
}

export default CalendarForm;