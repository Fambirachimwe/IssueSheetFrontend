import { Card, Icon, List, ListItem, Divider, Dialog, DialogPanel, Button, TextInput, Textarea, DatePicker, Select, SelectItem, SearchSelect, SearchSelectItem } from '@tremor/react'
import React, { useEffect, useState } from 'react'
import { RiAddCircleFill, RiArrowRightLine, RiPagesFill, RiSendPlane2Line } from '@remixicon/react';
import History from './HistoryTable';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import RegisterDetail from './RegisterDetail';
import { createIssueSheet, createRegister, getAllRegisters, getRegisterById, getUserById } from './util/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import IssueSheetDetailPage from './IssueSheetDetailPage';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import PdfPage from './PdfPage';
import Signature from './Signature';

const Home = () => {

    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isIssueDrawingModalOpen, setIsIssueDrawingModalOpen] = useState(false);  // this is the state of the  issuesheet modal 
    const signOut = useSignOut()
    const [projectDescipline, setProjectDescipline] = useState("");
    const [projectNumber, setProjectNumber] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectEngineers, setProjectEngineers] = useState("");  // we should turn this into and array
    const [commencementDate, setCommencementDate] = useState(null);




    const authUser = useAuthUser()
    // state for issueing drawings
    const [project, setProject] = useState(null);
    const [issuedTo, setIssuedTo] = useState("");
    const [attention, setAttention] = useState("");
    const [client, setClient] = useState("");
    const [issuedFor, setIssuedFor] = useState("");
    const [media, setMedia] = useState("");
    const [issuedBy, setIssuedBy] = useState({})

    useEffect(() => {
        setIssuedBy({
            name: `${authUser?.firstname} ${authUser?.lastname}`,
            signature: `${authUser?.signature}`
        })
    }, [authUser]);

    const userById = useQuery({
        queryKey: ['id', authUser?._id],
        queryFn: () => {
            return getUserById(authUser?._id)
        }
    });

    // console.log(userById?.data)


    // get the user signature

    // get user by id 



    // issuedBy: {
    //     name: String,
    //     signature: String,
    //     date: { type: Date, default: Date.now() }
    // },



    // console.log(authUser)



    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    // get all the drawing registers 
    const registers = useQuery({
        queryKey: ["registers"],
        queryFn: () => getAllRegisters()
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const addRegisterMutation = useMutation({
        mutationFn: (register) => {
            return createRegister(register)
        }
    });

    const createIssueSheetMutation = useMutation({
        mutationFn: (props) => {
            return createIssueSheet(props)
        }
    })

    const handleSave = () => {
        // console.log({ projectDescipline, projectName, projectNumber, commencementDate, projectEngineers })
        const register = {
            "projectNumber": parseInt(projectNumber),
            "projectName": projectName,
            "projectDescipline": projectDescipline,
            "projectEngineers": [...projectEngineers.split(',')],
            "commencementDate": commencementDate,
            // "completionDate": "2024-04-23"

        }

        // console.log(register)

        addRegisterMutation.mutate(register, {
            onSuccess: (data) => {

                // close the modal
                setIsRegisterOpen(false);
                queryClient.invalidateQueries(["registers"])
                navigate(`/register/${data?.data?._id}`);
            },
            onError: (err) => {
                console.log(err)
            }
        })
    }

    const handleNext = () => {
        const issueSheet = {
            to: issuedTo,
            attention,
            client,
            projectName: project?.projectName,
            projectNumber: project?.projectNumber,
            issuedFor,
            issuedBy: {
                name: `${authUser?.firstname} ${authUser?.lastname}`,
                signature: `${userById?.data?.data?.signature}`
            },
            media
        };

        // console.log(issueSheet)

        createIssueSheetMutation.mutate(issueSheet, {
            onSuccess: (data) => {
                console.log('created issueSheet', data)
                setIsIssueDrawingModalOpen(false)
                navigate(`/issuesheet/${data?.data?._id}`)
            },
            onError: (err) => {
                console.log(err)
            }
        })
    }

    const handleLogout = () => {
        signOut();
        navigate('/login')
    }



    return (
        <div >
            <div className="flex">
                <div className="one p-10   border-r  max-w-[400px]  ">
                    <h3 className="text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Issue Sheet App
                    </h3>
                    <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        Manage your personal details, workspace governance and notifications.
                    </p>

                    {/* List of quich licks */}
                    <Card className='mt-10' onClick={() => setIsIssueDrawingModalOpen(true)}>
                        Issue Drawing
                    </Card>

                    {/* <Card className='mt-5'>
                        Create Register
                    </Card> */}

                    <Divider className='pt-5'></Divider>

                    <div className="registers mt-5">
                        <div className="flex justify-between items-center">
                            <h3 >Registers</h3>
                            <Icon onClick={() => setIsRegisterOpen(true)} icon={RiAddCircleFill} size='lg' variant='simple' tooltip="Create drawing register" />


                            {/* creating register modal */}
                            <Dialog open={isRegisterOpen} onClose={(val) => setIsRegisterOpen(val)} static={true}>
                                <DialogPanel>
                                    <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">Create drawing register</h3>

                                    <TextInput placeholder='Project Number' value={projectNumber} onChange={(e) => setProjectNumber(e.target.value)} className="my-2" />
                                    <TextInput placeholder='Project Name' value={projectName} onChange={(e) => setProjectName(e.target.value)} className="my-2" />
                                    <TextInput placeholder='Project Descipline' value={projectDescipline} onChange={(e) => setProjectDescipline(e.target.value)} className="my-2" />
                                    <label className='font-mono text-sm'>Project Engineers</label>
                                    <Textarea placeholder='Add comma separates names' value={projectEngineers} onChange={(e) => setProjectEngineers(e.target.value)} className="my-2" />
                                    <DatePicker placeholder='Commencement Date' value={commencementDate} onValueChange={(e) => setCommencementDate(e)} className="my-2" />

                                    <Button className="mt-8 w-full" onClick={() => handleSave()}>
                                        Save
                                    </Button>
                                </DialogPanel>
                            </Dialog>



                            {/* issueing drawings Modal */}
                            <Dialog open={isIssueDrawingModalOpen} onClose={(val) => setIsIssueDrawingModalOpen(val)} static={true}>
                                <DialogPanel>
                                    <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">Issue Drawings</h3>


                                    <TextInput onChange={(e) => setIssuedTo(e.target.value)} placeholder='Issued To' className="my-2" />
                                    <TextInput onChange={(e) => setAttention(e.target.value)} placeholder='Attention' className="my-2" />
                                    <TextInput onChange={(e) => setClient(e.target.value)} placeholder='Client' className="my-2" />


                                    {/* <TextInput placeholder='ProjectName' className="my-2" /> */}

                                    <div className="mb-2 mt-82 font-mono text-sm text-slate-500">
                                        Project Name
                                    </div>
                                    <SearchSelect onValueChange={(value) => setProject(value)}>
                                        {
                                            registers?.data?.data?.map(register => (
                                                <SearchSelectItem key={register?._id} value={register}>{register?.projectName}</SearchSelectItem>
                                            ))
                                        }

                                        {/* <SearchSelectItem value="2">Option 2</SearchSelectItem>
                                        <SearchSelectItem value="3">Option 3</SearchSelectItem> */}
                                    </SearchSelect>

                                    <div className="mb-2 mt-2  font-mono text-sm text-slate-500">
                                        Issued For
                                    </div>
                                    <Select defaultValue='preliminary' onValueChange={(value) => setIssuedFor(value)} >
                                        <SelectItem value="preliminary">Prelimary</SelectItem>
                                        <SelectItem value="approval">Approval</SelectItem>
                                        <SelectItem value="contruction">Construction</SelectItem>
                                        <SelectItem value="tender">Tender</SelectItem>
                                        <SelectItem value="measurement">Measurement</SelectItem>
                                    </Select>
                                    {/* <TextInput placeholder='Media' className="my-2" /> */}
                                    <div className="mb-2 mt-2  font-mono text-sm text-slate-500">
                                        Media Type
                                    </div>

                                    <Select onValueChange={(value) => setMedia(value)} placeholder="Select Media">
                                        <SelectItem value="electronic">Electronic</SelectItem>
                                        <SelectItem value="physical">Physical</SelectItem>
                                    </Select>

                                    <Button iconPosition='right' icon={RiArrowRightLine} className="mt-8 w-full" onClick={() => handleNext()}>
                                        Next
                                    </Button>
                                </DialogPanel>
                            </Dialog>

                        </div>

                        <div className="list h-96 overflow-y-scroll ">
                            {/* list of all registers */}
                            <List className='p-4'>

                                {
                                    registers?.data?.data?.map(register => (

                                        <Link key={register?._id} to={`/register/${register._id}`}>
                                            <ListItem className=''>
                                                <Card className='p-2 flex justify-between items-center hover:bg-slate-100'>
                                                    <p>{register?.projectName}</p>
                                                    <Icon className='' icon={RiArrowRightLine} size='md' variant='simple' />
                                                </Card>
                                            </ListItem>

                                        </Link>

                                    ))
                                }

                            </List>
                        </div>
                    </div>



                </div>
                <div className="two flex-1 p-10  bg-slate-50 ">

                    {/* main content here  */}


                    {/* NavBar */}

                    <Card className='mb-5' >
                        <div className='flex items-center  justify-end'>
                            <div className="flex flex-col items-center">

                                <div className='flex justify-between items-center gap-2'>

                                    <img src="https://via.placeholder.com/150" alt="Avatar" className="w-10 h-10 rounded-full shadow-md" />
                                    <p className='cursor-pointer tracking-wide' onClick={handleLogout}>Logout</p>
                                </div>

                                {/* <span class="mt-2 text-lg font-semibold text-gray-800">John Doe</span> */}
                            </div>
                        </div>
                    </Card>


                    {/* end of Nav */}


                    <Routes>

                        <Route element={<AuthOutlet fallbackPath='/login' />}>
                            <Route path='/' element={
                                <>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                                        <Card className='hover:bg-slate-50 shadow-xl'
                                        // decoration={"bottom"}

                                        >
                                            <p className="text-lg font-medium text-tremor-content dark:text-dark-tremor-content">
                                                Create Register
                                            </p>
                                            <div className="mt-2 flex items-baseline space-x-2.5">
                                                <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                    <Icon size='md' variant='simple' icon={RiPagesFill} />
                                                </p>

                                            </div>
                                        </Card>

                                        <Card className='hover:bg-slate-50 shadow-xl'>
                                            <p className="text-lg font-medium text-tremor-content dark:text-dark-tremor-content">
                                                Issue Drawing
                                            </p>
                                            <div className="mt-2 flex items-baseline space-x-2.5">
                                                <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                    <Icon size='md' variant='simple' icon={RiSendPlane2Line} />
                                                </p>

                                            </div>
                                        </Card>

                                    </div>

                                    <div className="history mt-7">
                                        <h1 className='my-5 '>History</h1>

                                        <Card>
                                            <History isIssueDrawingModalOpen={isIssueDrawingModalOpen} setIsIssueDrawingModalOpen={setIsIssueDrawingModalOpen} />
                                        </Card>
                                    </div>
                                </>
                            } />

                            {/* register detail page */}
                            <Route path='/register/:id' element={<RegisterDetail />} />
                            <Route path='/issuesheet/:id' element={<IssueSheetDetailPage />} />

                            <Route path='/pdf' element={<PdfPage />} />

                            <Route path='/sig' element={<Signature />} />



                        </Route>



                    </Routes>


                </div>
            </div>
        </div>
    )
}

export default Home
