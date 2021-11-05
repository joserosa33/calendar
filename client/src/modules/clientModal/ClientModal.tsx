import {Button, TextField} from '@material-ui/core';
import Modal from '../../components/modal';
import './clientModal.css';
import {useState} from 'react';
import {gql, useMutation} from '@apollo/client';

interface ClientModalProps {
    active: boolean;
    onClose: () => void;
}

const ADD_CLIENT = gql`
    mutation CreateClient($name: String!){
        createClient(name: $name) {
            id
        }
    }
`;

const ClientModal = ({active, onClose}: ClientModalProps) => {
    const [name, setName] = useState('');
    const [addClient] = useMutation(ADD_CLIENT);

    const createClient = async () => {
        if (!name) {
            return;
        }

        await addClient({ variables: { name } });
        onClose();
    }

    return (
        <Modal isOpen={active} onClose={onClose}>
            <div className={"modal-client"}>
                <div>New Client</div>
                <TextField
                    label={"Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <Button onClick={createClient}>Add</Button>
            </div>
        </Modal>
    )
}

export default ClientModal;