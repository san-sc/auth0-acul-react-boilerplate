import SignupId from "@auth0/auth0-acul-js/signup-id";
import {useState} from "react";

const SignUpIdScreen = () => {
    const signUpManager = new SignupId();
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isDomainExist, setIsDomainExist] = useState(false);

    const onSubmit = async () => {
        if (email.endsWith("@sc-internal.io")) {
            setIsDomainExist(true);
            return;
        }

        await signUpManager.signup({
            email,
            phone: phoneNumber,
            firstName,
            lastName
        });
    }

    return (
        <div className="w-[100vw] min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md">
                {isDomainExist && (<h1 className="text-red-700">Domain Exists!!!!</h1>)}
                <input
                    type="email"
                    placeholder={signUpManager.screen.texts?.emailPlaceholder ?? "Enter your email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                />

                <input
                    type="tel"
                    placeholder={signUpManager.screen.texts?.phonePlaceholder ?? "Phone number"}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                />

                <input
                    type="text"
                    placeholder={signUpManager.screen.texts?.firstNamePlaceholder ?? "First Name"}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                />

                <input
                    type="text"
                    placeholder={signUpManager.screen.texts?.firstNamePlaceholder ?? "Last Name"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                />

                <button
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={onSubmit}
                >
                    Continue
                </button>

                {signUpManager.transaction.alternateConnections?.map(({ name, strategy }) => (
                    <button
                        key={name}
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => signUpManager.socialSignup({ connection: name })}
                    >
                        Continue with {strategy}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SignUpIdScreen;