import { auth,signInwithGooglePopup, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInwithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };
    return (
        <div>
            <h1>Sign in page jojos</h1>
            <Button buttonType='google' onClick={logGoogleUser}>Sign in bitch</Button>
            <SignUpForm/>
        </div>
    );
}

export default SignIn;