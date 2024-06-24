import { RiAddCircleFill, RiArrowLeftSLine, RiFile2Fill, RiFilePdf2Fill, RiMore2Fill, RiMoreFill, RiMoreLine } from '@remixicon/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Badge, Button, Callout, Card, Dialog, DialogPanel, Divider, Icon, List, ListItem, MultiSelect, MultiSelectItem, NumberInput, SearchSelect, SearchSelectItem, Select, SelectItem, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addDrawingToIssueSheet, getDrawingsByProjectNumber, getIssueSheetById, saveIssueSheet } from './util/api'
import toast, { Toaster } from 'react-hot-toast';

import { PDFDownloadLink, Document, Page, PDFViewer } from '@react-pdf/renderer';
import IssueSheetTemplate from './IssueSheetTemplate'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Signature from './Signature'

const IssueSheetDetailPage = () => {

    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [sigOpen, setSigOpen] = useState(false)
    const navigate = useNavigate();

    const [pNumber, setPnumber] = useState("");

    // add issue sheet moddal state
    const [drawingId, setDraingId] = useState("");
    const [copies, setCopies] = useState(0);
    const queryClient = useQueryClient();

    const addDrawingToIssueSheetMutation = useMutation({
        mutationFn: (props) => {
            return addDrawingToIssueSheet(props)
        }
    })

    const saveIssueSheetMutation = useMutation({
        mutationFn: (id) => {
            return saveIssueSheet(id)
        }
    })

    const auth = useAuthUser()

    const handleAdd = () => {
        // console.log(drawingId, copies);
        const notify = () => toast.success('drawing added to Issue Sheet');
        const notify2 = () => toast.error('error Adding document');

        const data = {
            issueSheetId: id,
            data: {
                drawing: drawingId,
                copies: parseInt(copies)
            }
        }
        addDrawingToIssueSheetMutation.mutate(data, {
            onSuccess: (data) => {

                queryClient.invalidateQueries(['issuesheet'])
                notify()
                setIsOpen(false);
                setDraingId("");
                setCopies("")
                // console.log(data)
            },
            onError: (err) => {
                notify2()
                console.log(err)
            }
        })
    }


    const handleIssueSheetSave = () => {
        saveIssueSheetMutation.mutate(id, {
            onSuccess: (res) => {
                // console.log(res)
                queryClient.invalidateQueries(['issuesheet'])
            },

            onError: (err) => {
                console.log(err)
            }

        })
    }

    const issueSheet = useQuery({
        queryKey: ['issuesheet', id],
        queryFn: () => getIssueSheetById(id)
    });

    // console.log(issueSheet?.data?.data)

    // console.log("auth", auth)
    // console.log("issuesheet", issueSheet?.data?.data)

    useEffect(() => {
        if (issueSheet.isSuccess) {
            setPnumber(issueSheet?.data?.data?.projectNumber)
        }
    }, [issueSheet])

    let drawings = useQuery({
        queryKey: ["drawings", pNumber],
        queryFn: async () => {
            try {
                const drawingsData = await getDrawingsByProjectNumber(pNumber);
                return drawingsData;
            } catch (error) {
                // Handle error here
                // console.error("Error fetching drawings:", error);
                throw error; // Rethrow the error to be handled by React Query
            }
        }
    });

    // console.log(drawings?.data?.data)



    if (drawings.isLoading) {
        return <div>Loading...</div>; // Display loading indicator while data is being fetched
    }

    if (drawings.isError) {

        // console.log(drawings.error)
        return <div>Error: {drawings.error.message}</div>; // Display error message if query fails
    }


    // console.log(issueSheet?.data?.data?.issuedBy?.signature)


    return (
        <div className=''>

            <Toaster />

            {
                issueSheet?.data?.data?.drawingsIssued?.length === 0 && (<Callout className='my-5' title="Drawing list is empty .. " color="red">
                    Please add drawings to the issue sheet
                </Callout>)
            }

            <div className='flex justify-between items-center my-2'>
                <Icon className='hover:cursor-pointer' icon={RiArrowLeftSLine} onClick={() => navigate('/')} size='lg' variant='simple' tooltip="Back" />



                {/* if the drawing list is empty  hide the download button */}
                {
                    issueSheet?.data?.data?.drawingsIssued.length > 0 ? (<PDFDownloadLink document={<IssueSheetTemplate props={issueSheet?.data?.data} />} fileName="issueSheet.pdf">
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : <Button iconPosition='right' icon={RiFilePdf2Fill}>Export PDF</Button>
                        }
                    </PDFDownloadLink>) : (null)

                }


                {/* <PDFViewer width={"100%"} height={"100%"}>
                    <IssueSheetTemplate props={issueSheet?.data?.data} />
                </PDFViewer> */}

            </div>

            {/* adding drawings modal */}

            <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
                <DialogPanel>
                    <h3 className="text-lg font-semibold my-5 text-tremor-content-strong dark:text-dark-tremor-content-strong">Add drawing to issue sheet</h3>


                    <h3>Select drawing to add </h3>
                    <SearchSelect onValueChange={(value) => setDraingId(value)} >
                        {
                            drawings?.data?.data?.map(drawing => (
                                <SearchSelectItem key={drawing?._id} value={drawing?._id}>{drawing?.title} ({drawing?.drawingNumber})</SearchSelectItem >
                            ))
                        }
                    </SearchSelect>

                    <NumberInput onChange={(e) => setCopies(e.target.value)} className='my-3' placeholder='Number of copies' />


                    <Button onClick={handleAdd} className="mt-8 w-full" >
                        Add
                    </Button>
                </DialogPanel>
            </Dialog>

            {/* adding signature dialog */}
            <Dialog open={sigOpen} onClose={(val) => setSigOpen(val)} static={true}>
                <DialogPanel className="">
                    <Signature />

                </DialogPanel>


            </Dialog>


            <Card>

                <h3>Drawing issue sheet</h3>

                {/* list of the project details  */}

                <div className="details w-4/5">
                    <List className='container'>
                        <ListItem>
                            <span>Issue No:</span>
                            <Badge>{issueSheet?.data?.data?.issueSheetNumber}</Badge>
                        </ListItem>
                        <ListItem>
                            {/* to */}
                            <span>Recepient</span>
                            <span>{issueSheet?.data?.data?.to}</span>
                        </ListItem>
                        <ListItem>
                            <span>Attention</span>
                            <span>{issueSheet?.data?.data?.attention}</span>
                        </ListItem>

                        <ListItem>
                            <span>Project Number</span>
                            <span>
                                {issueSheet?.data?.data?.projectNumber}
                            </span>
                        </ListItem>

                        <ListItem>
                            <span>Project Name</span>
                            <span>{issueSheet?.data?.data?.projectName}</span>
                        </ListItem>

                        <ListItem>
                            <span>Issued Date</span>
                            <span>{issueSheet?.data?.data?.issuedBy?.date?.split("T")[0]}</span>
                        </ListItem>

                        <ListItem>
                            <span>Issued for </span>
                            <span>{issueSheet?.data?.data?.issuedFor?.replace(/^\w/, (c) => c.toUpperCase())}</span>
                        </ListItem>

                        <ListItem>
                            <span>Media</span>
                            <span>{issueSheet?.data?.data?.media?.replace(/^\w/, (c) => c.toUpperCase())}</span>
                        </ListItem>



                    </List>

                </div>
            </Card>

            <div className='my-5'>
                <h3>Drawings</h3>

                <Card>
                    <div className='flex justify-between items-center'>

                        <h2 className='my-5'>Issue sheet drawings</h2>

                        <Icon icon={RiAddCircleFill} size='lg' onClick={() => setIsOpen(true)} variant='simple' tooltip="Add Drawings" />
                    </div>

                    {/* drawings table */}

                    <Table className="mt-8">
                        <TableHead>
                            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    DWG no
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Drawing title
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    No of copies
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Size
                                </TableHeaderCell>
                                <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Revision Mark                        </TableHeaderCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* enter the data here  */}
                            {
                                issueSheet?.data?.data?.drawingsIssued?.map(drawing => (
                                    <TableRow key={drawing?._id}>
                                        <TableCell>{drawing?.drawing?.drawingNumber}</TableCell>
                                        <TableCell >{drawing?.drawing?.title}</TableCell>
                                        <TableCell>{drawing?.copies}</TableCell>
                                        <TableCell>{drawing?.drawing?.size}</TableCell>
                                        <TableCell className='text-right pr-20'>{drawing?.drawing?.revisions}</TableCell>
                                        <TableCell>{< Icon icon={RiMore2Fill} />}</TableCell>
                                    </TableRow>
                                ))
                            }




                        </TableBody>
                    </Table>



                    {/* remarks section */}
                    <div className='mt-10'>

                        <Card>

                            <div className="issued flex justify-between items-center">

                                <div className="left mr-4">
                                    <h3 className='font-bold'>Issued By</h3>

                                </div>

                                <div className="right flex-1 ">
                                    <Table >
                                        <TableHead className=''>
                                            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                    Name
                                                </TableHeaderCell>
                                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                    {
                                                        issueSheet?.data?.data?.issuedBy?.signature === undefined || issueSheet?.data?.data?.issuedBy?.signature === null ? (
                                                            <Button onClick={() => setSigOpen(true)}>Add Signature</Button>
                                                        ) : (
                                                            <img className='w-20' src={issueSheet?.data?.data?.issuedBy?.signature} alt="" srcset="" />

                                                        )
                                                    }
                                                </TableHeaderCell>
                                                <TableHeaderCell className=" text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                    Date
                                                </TableHeaderCell>




                                            </TableRow>
                                        </TableHead>

                                        <TableBody>

                                            <TableRow>
                                                <TableCell>{issueSheet?.data?.data?.issuedBy.name}</TableCell>
                                                <TableCell>ssdsdsdfs</TableCell>
                                                <TableCell>{issueSheet?.data?.data?.issuedBy?.date?.split("T")[0]}</TableCell>

                                            </TableRow>

                                        </TableBody>
                                    </Table>


                                </div>

                            </div>



                        </Card>

                    </div>
                </Card>
            </div>



            {/* save footer */}
            <div className='footer mt-10  flex justify-end items-center -bottom-0'>
                <div className="con flex gap-5">
                    <Button disabled={issueSheet?.data?.data?.isSaved === true ? true : false} onClick={handleIssueSheetSave} className='px-10'>Save</Button>
                    <Button className='px-10' variant='secondary'>Cancel</Button>
                </div>

            </div>
        </div>
    )
}

export default IssueSheetDetailPage
