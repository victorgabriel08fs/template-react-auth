import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

const LoginForm = () => {
    const context = useAuth();
    const navigate = useNavigate();

    function handleLogin(e: FormEvent) {
        e.preventDefault();
        context.Login({ email, password });
        navigate("/");

    }
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    return (
        <form onSubmit={(e) => handleLogin(e)}>
            <input type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <button>Login</button>
        </form>
    );
}

export default LoginForm;