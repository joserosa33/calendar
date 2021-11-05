import './header.css';
import { Button} from '@material-ui/core';
import StaffModal from '../staffModal';
import {useState} from 'react';
import ClientModal from "../clientModal";

const Header = () => {
    const [staffModalActive, setStaffModal] = useState(false);
    const [clientModalActive, setClientModal] = useState(false);

    return (
        <header>
            <div className={"title"}>Scheduler</div>
            <div className={"navigation"}>
                <Button onClick={() => setClientModal(!clientModalActive)}>New Client</Button>
                <Button onClick={()=> setStaffModal(!staffModalActive)}>New Staff Member</Button>
            </div>
            <StaffModal active={staffModalActive} onClose={() => setStaffModal(false)}/>
            <ClientModal active={clientModalActive} onClose={() => setClientModal(false)}/>
        </header>
    )
}

export default Header;