import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import {motion} from "framer-motion"

const SecondStep = (props) => {
  const{userData} = props
  const { register, handleSubmit, errors } = useForm({
    defaultValues:{
      user_email: userData.user_email,
      user_password: userData.user_password
    }
  });

  const onSubmit = data => {
    props.updateUserData(data)
    props.history.push("/third")
  };
  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div  
       initial={{ x: '-100vw' }}
       animate={{ x: 0 }}
       className="col-md-6 offset-md-3 bg-primary"
       style={{
         padding:30
       }}>
        <Form.Group controlid="email_address">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="user_email"
            placeholder="Enter email address"
            autoComplete="off"
            ref={register({
              required: 'Email is required',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid'
              }
            })}
            className={`${errors.user_email ? 'input-error' : ''}`}
          />
          {errors.user_email && (
            <p className="errorMsg">{errors.user_email.message}</p>
          )}
        </Form.Group>

        <Form.Group controlid="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="user_password"
            placeholder="Enter a password"
            autoComplete="off"
            ref={register({
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password should have at-least 6 characters'
              }
            })}
            className={`${errors.user_password ? 'input-error' : ''}`}
          />
          {errors.user_password && (
            <p className="errorMsg">{errors.user_password.message}</p>
          )}
        </Form.Group>
        <Button variant="info" type="submit">
          Next
        </Button>
      </motion.div>
    </Form>
  );
};

export default SecondStep;
