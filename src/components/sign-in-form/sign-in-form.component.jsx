import { useState, useContext } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { signInwithGooglePopup, createUserDocumentFromAuth,signAuthUserWithEmailAndPassword } from "../../routes/utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () =>{
    const [formFields, setFormFiedls] = useState(defaultFormFields);
    const { email, password} =formFields;
    //METODOS
    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            await signAuthUserWithEmailAndPassword(email,password);
            resetFormFields();
        }catch(err){
            switch (err.code){
                case 'auth/wrong-password':
                    alert('Incorrect Password');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(err);
            }

        }

    };

    const logGoogleUser = async () => {
        await signInwithGooglePopup();
    };
    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFiedls({...formFields, [name]:value});
    };

    const resetFormFields = () =>{
        setFormFiedls(defaultFormFields);
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                    <Button type='submit' buttonType="">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={logGoogleUser}>Sign in bitch</Button>
                </div>
            </form>
        </div>
    );
}
export default SignInForm;