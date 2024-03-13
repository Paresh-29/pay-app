import { ButtomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"}/>
                <SubHeading label={"Enter your information to create an account"}/>
                <InputBox onChange={e => {
                    setFirstName(e.target.value);
                }} placeholder="John" label={"First Name"}/>
                <InputBox onChange={e => {
                    setlastName(e.target.value);
                }} placeholder="Doe" label={"Last Name"}/>
                <InputBox onChange={e => {
                    setUserName(e.target.value);
                }} placeholder="JohnDoe@gmail.com" label={"Email"}/>
                <InputBox onChange={e => {
                    setPassword(e.target.value);
                }} placeholder="123456" label={"Password"}/>
                <div className="pt-4">
                    <Button onClick={ async () => {
                       const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token",response.data.token);
                        navigate("/dashboard");
                    }} label={"Sign Up"}/>
                </div>
                <ButtomWarning label={"Already have an acoount?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>

        </div>
    </div>
}