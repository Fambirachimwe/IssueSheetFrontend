import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@tremor/react';
import React, { useRef, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import SignatureCanvas from 'react-signature-canvas'
import { updateUserSignature } from './util/api';
import { useNavigate } from 'react-router-dom';


const Signature = ({ setSigOpen }) => {

    // get the auth object 
    // save the signature in the  auth object and save it in the Users database
    //  update the issuedBy variable 

    const auth = useAuthUser();
    const queryClient = useQueryClient();

    const navigate = useNavigate()

    // console.log(auth)

    // update the issued users signature in the users schema 

    const updateUserSignatureMutation = useMutation({
        mutationFn: (props) => {
            return updateUserSignature(props)
        }
    })




    const [trimmedDataURL, setTrimmedDataURL] = useState(null);

    // console.log(trimmedDataURL)
    const sigPad = useRef();

    const clear = () => {
        // console.log(sigPad)
        sigPad.current.clear();
    };

    const trim = () => {

        // console.log(sigPad.current.getTrimmedCanvas())

        setTrimmedDataURL(sigPad.current.getTrimmedCanvas().toDataURL('image/png'));
        const props = {
            _id: auth?._id,
            signature: sigPad.current.getTrimmedCanvas().toDataURL('image/png')
        }



        updateUserSignatureMutation.mutate(props, {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['issuesheet'])
                sigPad.current.clear();
                setSigOpen(false)
                // console.log(data);

                // navigate to the dash board
                navigate('/')
            },
            onError: (err) => {
                alert(err.message)
                console.log(err)
            }
        })

    };

    return (
        <div>

            <h1 className='my-3'>Complete Profile by adding your signature</h1>
            <div className='border-gray-900 border'>




                <SignatureCanvas ref={sigPad} penColor='black'
                    canvasProps={{ width: 450, height: 200, className: 'sigCanvas' }} dotSize={1} />


            </div>
            <Button className='mt-3' onClick={clear}>Clear</Button>
            <Button className='mt-3 mx-5' onClick={trim}>Save</Button>

            {/* <div className='my-10'>
                {trimmedDataURL ? (
                    <img className="" src={trimmedDataURL} />
                ) : null}
            </div> */}

        </div>
    )
}

export default Signature
