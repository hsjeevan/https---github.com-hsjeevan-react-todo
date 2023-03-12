import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';


function LoginComponent() {

    const [username, setUsername] = useState('hsjeevan');
    const [password, setPassword] = useState('');

    const [showErrorMessage, setshowErrorMessage] = useState(false);

    const navigate = useNavigate();

    const authContext = useAuth();

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }
    function handleSubmit() {
        if (authContext.login(username, password)) {
            navigate(`/welcome/${username}`)
        }
        else {
            setshowErrorMessage(true)
        }
    }

    return (
        <div className="LoginComponent">
            <h1>Time to Login!</h1>
            <div>
                {showErrorMessage && <div className="ErrorMessageComponent">Authentication Failed. Please check your credentials</div>}
                <div className="LoginForm">
                    <div>
                        <label>User Name:</label>
                        <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" onChange={handlePasswordChange} />
                    </div>
                    <div>
                        <button name="login" onClick={handleSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;