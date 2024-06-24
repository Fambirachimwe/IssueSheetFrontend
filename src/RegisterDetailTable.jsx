// 'use client';
import { RiMore2Fill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
    Button,
    Dialog,
    DialogPanel,
    Icon,
    NumberInput,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    TextInput,
} from '@tremor/react';
import { useState } from 'react';
import { addDrawingToCategory, createIssueSheet } from './util/api';
import toast, { Toaster } from 'react-hot-toast';



export default function RegisterDetailTable({ category }) {
    const [isOpen, setIsOpen] = useState(false)

    const [drawingNumber, setDrawingNumber] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState("");
    const [revisions, setRevisions] = useState("");

    const addDrawingToCategoryMutation = useMutation({
        mutationFn: (drawing) => {
            return addDrawingToCategory(drawing)
        }
    });






    const queryClient = useQueryClient();

    const handleSave = () => {
        console.log({ drawingNumber, title, description, size, revisions, })

        const drawing = {
            drawingNumber, title, description, size, revisions: parseInt(revisions), categoryId: category._id
        }
        addDrawingToCategoryMutation.mutate(drawing, {
            onSuccess: () => {
                const notify = () => toast.success('Drawing Added');
                notify();
                queryClient.invalidateQueries("register")
                setIsOpen(false)
            },
            onError: () => {
                const notify = () => toast.error('Error adding drawing, try again later');
                notify();
                setIsOpen(false)
            }
        })

    }

    return (
        <>

            {/* adding drawing to category modal */}

            <Toaster />

            <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
                <DialogPanel className='p-5'>
                    <h3 className="text-lg  font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">Add Drawing</h3>
                    {/* drawing fields  */}



                    <TextInput placeholder='DWG No' value={drawingNumber} onChange={(e) => setDrawingNumber(e.target.value)} className="my-2" />
                    <TextInput placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} className="my-2" />
                    <TextInput placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} className="my-2" />
                    <TextInput placeholder='Size' value={size} onChange={(e) => setSize(e.target.value)} className="my-2" />
                    <NumberInput placeholder='Revision' value={revisions} onChange={(e) => setRevisions(e.target.value)} className="my-2" />


                    <Button className="mt-8 w-full" onClick={() => handleSave()}>
                        Save
                    </Button>
                </DialogPanel>
            </Dialog>
            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
                <div>

                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className="mt-20 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
                >
                    Add Drawing
                </button>

                {/* add drawing Modal  */}


            </div>


            <Table className="mt-8 ">
                <TableHead>
                    <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Drawing No
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Description
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Size
                        </TableHeaderCell>


                        <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Revision
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {category.drawings.map((drawing) => (
                        <TableRow key={drawing?._id}>
                            <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                {drawing?.drawingNumber}
                            </TableCell>
                            <TableCell>{drawing?.title}</TableCell>
                            <TableCell>{drawing?.size}</TableCell>
                            <TableCell className="text-right">{drawing?.revisions || 0}</TableCell>
                            <TableCell className="text-right"><Icon icon={RiMore2Fill} /></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}