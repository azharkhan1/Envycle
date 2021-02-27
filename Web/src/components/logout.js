import axios from 'axios';
import url from '../core/index';
import { useGlobalState, useGlobalStateUpdate } from '../context/index';






export default function Logout() {
    const globalState = useGlobalState();
    const updateGlobalState = useGlobalStateUpdate();

    function logout() {
        axios({
            method: 'post',
            url: `${url}/logout`

        }).then((response) => {
            updateGlobalState((prevValue) => ({ ...prevValue, loginStatus: false, user: null, role: null }));
        }, (error) => {
            console.log("error=>", error);
        })
    }

    return (
        <span className="navbar-text" onClick={logout}>
            <a href="#" className="nav-link logout" title="">
                <span><i className="fa fa-sign-out" aria-hidden="true"></i></span>
                            Logout
                        </a>
        </span>
    )
}