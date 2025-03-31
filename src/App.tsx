import React, {useEffect, Suspense} from "react";
import {getCurrentScreen} from "@auth0/auth0-acul-js";

const LoginIdScreen = React.lazy(() => import("./screens/LoginId"));
const SignupIdScreen = React.lazy(() => import("./screens/SignupId"));


const App: React.FC = () => {
    const [screen, setScreen] = React.useState("login-id");
    useEffect(() => {
        const current = getCurrentScreen();
        setScreen(current!);
    }, []);

    const renderScreen = () => {
        switch (screen) {
            case "login-id":
                return <LoginIdScreen/>;
            case "signup-id":
                return <SignupIdScreen/>
            default:
                return <>No screen rendered</>;
        }
    };

    return <Suspense fallback={<div>Loading...</div>}>{renderScreen()}</Suspense>;
};

export default App;
