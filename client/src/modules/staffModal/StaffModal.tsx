import {Button, TextField} from '@material-ui/core';
import Modal from '../../components/modal';
import './staffModal.css';
import {gql, useMutation} from "@apollo/client";
import {useState} from "react";

interface StaffModalProps {
    active: boolean;
    onClose: () => void;
}

const ADD_STAFF = gql`
    mutation CreateStaff($firstName: String!, $lastName: String!){
        createStaff(firstName: $firstName, lastName: $lastName) {
            id
        }
    }
`;

const StaffModal = ({active, onClose}: StaffModalProps) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addStaff] = useMutation(ADD_STAFF);

    const createStaff = async () => {
        if (!firstName || !lastName) {
            return;
        }

        await addStaff({ variables: { firstName, lastName } });
        onClose();
    }

    return (
        <Modal isOpen={active} onClose={onClose}>
            <div className={"modal-staff"}>
                <div>New Staff Member</div>
                <TextField
                    label={"First Name"}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
                <TextField
                    label={"Last Name"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
                <Button onClick={createStaff}>Add</Button>
            </div>
        </Modal>
    )
}

export default StaffModal;