import { ButtomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export const SignIn = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"}/>
                <SubHeading label={"Enter your credentials to access your account"}/>
                <InputBox placeholder="Johndoe@gmail.com" label={"Email"}/>
                <InputBox placeholder="12345" label={"Password"}/>
            </div>
            <div className="pt-4">
                <Button label={"Sign in"}/>
            </div>
            <div>
                <ButtomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}