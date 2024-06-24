import { useMutation } from '@tanstack/react-query';
import { Button, Card, Dialog, DialogPanel, TextInput } from '@tremor/react'
import React, { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from './util/api';
import Signature from './Signature';



const Login = () => {


    // login mutation
    const signIn = useSignIn()
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [sigOpen, setSigOpen] = useState(false);



    const loginMutation = useMutation({
        mutationFn: (props) => {
            return loginRequest(props)
        }
    })



    // console.log(email, password)


    const handleSubmit = async () => {
        const props = { email, password }

        // const login = await loginRequest(props)

        // console.log(props)
        loginMutation.mutate(props, {
            onSuccess: (res) => {
                // console.log(res?.data)


                // 
                if (signIn({
                    auth: {
                        token: res?.data?.accessToken,
                        // type: 'Bearer'
                    },
                    // refresh: res?.data?.refreshToken,
                    userState: res?.data?.user
                })) { // Only if you are using refreshToken feature
                    // Redirect or do-something;
                    if (!res.data.user.signature) {
                        setSigOpen(true);
                    } else {
                        navigate("/")
                    }

                } else {
                    //Throw error
                }
            },
            onError: () => {

            }
        })

    }



    return (
        <div className='absolute z-10 w-screen h-screen flex items-center justify-center bg-white top-0'>
            <Dialog
                open={sigOpen}
                onClose={() => setSigOpen(false)}
                static={true}
                className="z-[100]"
            >
                <DialogPanel className="max-w-sm">
                    <Signature setSigOpen={setSigOpen} />
                </DialogPanel>
            </Dialog>
            <div className='w-full'>
                <Card className='m-auto w-1/2'>

                    <h1 className='font-bold text-lg'>Login</h1>

                    <div className="form">
                        <TextInput onChange={(e) => setEmail(e.target.value)} className='my-5 p-1' placeholder='Email' type='email' />
                        <TextInput onChange={(e) => setPassword(e.target.value)} className='my-5 p-1' placeholder="Type password here" type="password" />

                        <div className="flex">
                            <Button type='submit' onClick={handleSubmit} className="mt-2 w-full"   >Signin</Button>
                        </div>


                    </div>
                </Card>
            </div>

        </div>
    )
}

export default Login
