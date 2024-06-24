// 'use client';
import { useQueries, useQuery } from '@tanstack/react-query';
import {
    Badge,
    Icon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';
import { getAllIssuedDocuments } from './util/api';
import { RiMore2Fill } from '@remixicon/react';
import { Link, useNavigate } from 'react-router-dom';



export default function History({ setIsIssueDrawingModalOpen }) {

    // const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);

    // get list of issued docuemenst

    const getIssuedDocuments = useQuery({
        queryKey: ['issuesheets'],
        queryFn: () => getAllIssuedDocuments()
    });

    const navigate = useNavigate();

    // console.log(getIssuedDocuments?.data?.data)




    return (
        <>
            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
                <div>
                    <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Issued Documents
                    </h3>
                    <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        Overview of all Issued documents.
                    </p>
                </div>
                <button
                    onClick={() => setIsIssueDrawingModalOpen(true)}
                    type="button"
                    className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
                >
                    Issue Drawings
                </button>
            </div>
            <Table className="mt-8">
                <TableHead>
                    <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Sheet Number
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Project Number
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Client
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            To
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Drawings                        </TableHeaderCell>

                        <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Issued Date
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {


                        getIssuedDocuments?.data?.data.map((item) => {

                            if (item.drawingsIssued.length > 0) {
                                return (
                                    <TableRow key={item._id}>
                                        <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                            {item.issueSheetNumber}
                                        </TableCell>
                                        <TableCell>{item?.projectNumber}</TableCell>
                                        <TableCell>{item?.client}</TableCell>
                                        <TableCell>{item?.to}</TableCell>
                                        <TableCell><Badge>{item?.drawingsIssued?.length}</Badge></TableCell>
                                        <TableCell className="text-right">{item?.issuedBy?.date.split("T")[0]}</TableCell>
                                        <TableCell className="text-right"><Icon variant='shadow' onClick={() => navigate(`/issuesheet/${item?._id}`)} icon={RiMore2Fill} tooltip='view' /></TableCell>
                                    </TableRow>
                                )
                            } else {
                                return (null)
                            }



                        })

                    }
                </TableBody>
            </Table>
        </>
    );
}