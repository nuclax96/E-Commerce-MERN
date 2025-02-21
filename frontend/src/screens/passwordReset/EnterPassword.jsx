import { Button, Form, Toast } from "react-bootstrap"
import { useState } from "react";
import { useResetPasswordMutation } from "../../slices/usersApiSlice";
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const EnterPassword = ()=>{
    const location = useLocation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const email = location.state.email;

    console.log(email)
    const [resetPassword] = useResetPasswordMutation();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newPassword !== confirmPassword){
           toast('Passwords do not match');
            return;
        }
        
        try{
            const res = await resetPassword({email,currentPassword, newPassword}).unwrap();
            toast('Password changed successfully');
            navigate('/login')
        }
        catch(err){
            toast(err.data.message);
        }

      };


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2" controlId='currentPassword'>
                <Form.Label>Current Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Current Password'
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='newPassword'>
                <Form.Label>Enter New Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='New Password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Submit
            </Button>
    </Form>
    )
}

export default EnterPassword