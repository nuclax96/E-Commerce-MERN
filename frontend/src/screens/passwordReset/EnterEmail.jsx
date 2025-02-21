import React, { useState } from "react";
import { Form, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useConfirmEmailMutation } from "../../slices/usersApiSlice";
import { toast } from 'react-toastify';
const EnterEmail = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [confirmEmail,{data,error,isLoading}] = useConfirmEmailMutation();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // verify email exists in db
    try{
     const res = await confirmEmail({email}).unwrap();
     navigate('/forgotPassword/newPassword',{state:{email}});
     console.log(res);
    }catch(err){
      toast.error('Email does not exist' || err.error);
    }
    
    //navigate to enter new password page
    
  };

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
            Submit
        </Button>
    </Form>
  );
};

export default EnterEmail;
