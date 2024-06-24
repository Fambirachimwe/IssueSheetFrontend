import { Accordion, AccordionBody, AccordionHeader, AccordionList, Button, Callout, Card, Dialog, DialogPanel, Icon, List, ListItem, TextInput } from '@tremor/react'
import React, { useState } from 'react'
import RegisterDetailTable from './RegisterDetailTable'
import { addDrawingToRegister, getRegisterById } from './util/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { RiAddCircleFill, RiArrowLeftFill, RiArrowLeftLine, RiArrowLeftSLine } from '@remixicon/react';

import toast, { Toaster } from 'react-hot-toast';

const RegisterDetail = () => {

    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("")

    const [categoryError, setCategoryError] = useState(false);
    const navigate = useNavigate()


    const register = useQuery({
        queryKey: ["register", id],
        queryFn: () => getRegisterById(id)
    });

    // console.log(register.data.data)

    const addCategoryToRegisterMutation = useMutation({
        mutationFn: (category) => {
            return addDrawingToRegister(category)
        }
    })

    const queryClient = useQueryClient()

    const handleSave = () => {

        const props = {
            category: [{ title: categoryName, description: description }],
            registerId: id
        };

        addCategoryToRegisterMutation.mutate(props, {
            onSuccess: () => {
                queryClient.invalidateQueries("register")
                // console.log(data)
                setIsOpen(false)
                const notify = () => toast.success('Category added to successfully');
                notify();
            },

            onError: (err) => {

                const notify = () => toast.error('Error adding category to register');
                console.log(err);
                setCategoryError(true)
                setIsOpen(false);
                notify()
            }
        })
        console.log(categoryName, description)
    }




    return (
        <div>

            {/* error card */}

            {/* {
                categoryError && (
                    <Callout className='my-5' title="Error" color="red">
                        Error Validating input
                    </Callout>
                )
            } */}

            <Toaster />

            <Icon className='hover:cursor-pointer' icon={RiArrowLeftSLine} onClick={() => navigate('/')} size='lg' variant='simple' tooltip="Back" />


            <Card>

                <h3>Project Details</h3>

                {/* list of the project details  */}

                <div className="details w-4/5">
                    <List className='container'>
                        <ListItem>
                            <span>Project Name</span>
                            <span>{register?.data?.data?.projectName}</span>
                        </ListItem>
                        <ListItem>
                            <span>Project Number</span>
                            <span>{register?.data?.data?.projectNumber}</span>
                        </ListItem>
                        <ListItem>
                            <span>Descipline</span>
                            <span>{register?.data?.data?.projectDescipline}</span>
                        </ListItem>


                        <ListItem>
                            <span>Engineers</span>
                            <span>
                                {
                                    register?.data?.data?.projectEngineers.map(engineer => (
                                        <p className='inline-block mx-1'>{engineer},</p>
                                    ))

                                }
                            </span>
                        </ListItem>

                        <ListItem>
                            <span>Commencement date</span>
                            <span>{register?.data?.data?.commencementDate.split("T")[0]}</span>
                        </ListItem>

                    </List>

                </div>
            </Card>

            <Card className='my-5'>
                {/* categories */}

                <div className='flex justify-between items-center'>

                    <h2 className='my-5'>Drawing Register Categories</h2>

                    <Icon icon={RiAddCircleFill} onClick={() => setIsOpen(true)} size='lg' variant='simple' tooltip="Create New category" />
                </div>


                {/* category dialog */}
                <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
                    <DialogPanel className='p-5'>
                        <h3 className="text-lg  font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong font-mono">Add Drawing Category </h3>
                        {/* category  fields  */}
                        <TextInput placeholder='Category Name' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="my-2" />
                        <TextInput placeholder='Category Description' value={description} onChange={(e) => setDescription(e.target.value)} className="my-2" />


                        <Button className="mt-8 w-full" onClick={() => handleSave()}>
                            Save
                        </Button>
                    </DialogPanel>
                </Dialog>



                {/* display the categories here  */}
                <AccordionList>

                    {
                        register?.data?.data?.categories?.map(category => (
                            <Accordion >
                                <AccordionHeader className="bg-slate-100 text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    {category.title}
                                </AccordionHeader>
                                <AccordionBody className="leading-6">
                                    <RegisterDetailTable category={category} />
                                </AccordionBody>
                            </Accordion>
                        ))
                    }



                </AccordionList>
            </Card>
        </div>
    )
}

export default RegisterDetail
