import { Button, Card, Dialog, DialogPanel, Select, SelectItem, TextInput } from '@tremor/react'
import React, { useRef, useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import { registerUser } from '../src/util/api'
// import { SignatureCanvas } from 'react-signature-canvas'
// import Signature from './Signature';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');

    const navigate = useNavigate();

    const signupMutation = useMutation({
        mutationFn: (props) => {
            return registerUser(props);
        }
    });

    const handleSubmit = () => {
        if (!firstname || !lastname || !email || !password || !department) {
            console.log("All fields are required.");
            // Optionally, you can set an error state here and display an error message in your UI
            return;
        }

        console.log(firstname, lastname, email, password, department);

        const props = { firstname, lastname, email, password, department };

        signupMutation.mutate(props, {
            onSuccess: (data) => {
                console.log(data);
                navigate('/login')

            },

            onError: (err) => {
                console.log(err);
            }
        });
    };

    return (
        <div className='absolute z-10 w-screen h-screen flex items-center justify-center bg-white top-0'>
            <div className='w-full'>
                <Card className='m-auto w-1/2'>
                    <h1 className='font-bold text-lg'>Create Account</h1>

                    <div className="form">
                        <TextInput value={firstname} onChange={e => setFirstname(e.target.value)} className='my-5 p-1' placeholder='Firstname' type='text' />
                        <TextInput value={lastname} onChange={e => setLastname(e.target.value)} className='my-5 p-1' placeholder="Lastname" type="text" />
                        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} className='my-5 p-1' placeholder="Email" type="email" />
                        <TextInput className='my-5 p-1' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />

                        <h3 className='my-2'>Select your department</h3>
                        <Select defaultValue="ops" value={department} onChange={(e) => setDepartment(e)} placeholder='Please select your department'>
                            <SelectItem value="ops">Operations</SelectItem>
                            <SelectItem value="mgt">ManagementTwo</SelectItem>
                            <SelectItem value="fdm">Finance & Admin</SelectItem>
                        </Select>

                        <div className="flex">
                            <Button type='submit' onClick={handleSubmit} className="mt-2 w-full">Sign up</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};


export default Register
