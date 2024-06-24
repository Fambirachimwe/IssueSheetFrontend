import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, Font } from '@react-pdf/renderer';
import Logo from './assets/logo.png'


// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        fontSize: 10,
        margin: 10,
        padding: 10,
        width: '100%',
        // fontFamily: "OpenSans"
    },
    section: {

        flexGrow: 1
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // flex: 1,
        margin: 20,
        marginRight: 40,
        border: '2px',
        height: 100,
        // width: 100
    },
    logo: {
        width: '100%'
    },

    table: { display: 'table', borderColor: '#000000', flex: 1 },
    rowHeader: { flexDirection: 'row', backgroundColor: '#f2f2f2', width: '100%', },
    row: { flexDirection: 'row', borderBottom: 1 },
    cellHeader: { padding: 5, fontWeight: 'bold', borderColor: '#000000', width: "100%" },
    cell: { padding: 5, borderRight: 1 },
});





function transformDateArray(inputArray) {
    // Extracting values from the input array
    let year = inputArray[0];
    let month = inputArray[1];
    let date = inputArray[2].split('T')[0]; // Split to get the date part

    // Creating the desired format
    let result = [
        { id: 'Date', name: parseInt(date, 10) }, // Converting date string to integer
        { id: 'Month', name: month },
        { id: 'Year', name: year.slice(-2) } // Getting the last two digits of the year
    ];

    return result;
}

const TableRow = ({ id, name }) => (
    <View style={styles.row}>
        <Text style={{ padding: 5, width: "80%", borderRight: 1, }}>{id}</Text>
        <Text style={{ padding: 5, width: "100%", }}>{name}</Text>
    </View>
);

export const IssueSheetTemplate = ({ props }) => {

    // console.log(props)

    const _data = props.createdAt.split("-");

    // console.log(_data)
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Header of the issue sheet */}

                <View style={styles.header}>
                    {/* logo container */}

                    <View style={{ borderRight: '2px', padding: 10, width: "25%" }}>
                        <Image style={styles.logo} src={Logo} />
                        <Text wrap style={{ marginTop: 5, textAlign: 'center' }}>Quality Management System</Text>
                    </View>

                    {/* title container */}

                    <View style={{ flex: 1, textAlign: 'center', borderRight: '2px' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center', paddingTop: 40, fontWeight: "black" }}>Drawing Issue Sheet</Text>
                    </View>

                    {/* reference container */}

                    <View style={{ width: "35%", display: 'flex', flexDirection: 'column', }}>

                        <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottom: '2px' }}>

                            <View style={{ borderRight: '2px', padding: 3, width: "50%", height: '100%' }}>
                                <Text style={{ fontSize: 6.5 }}>Ref No</Text>
                            </View>

                            <View>
                                <Text style={{ fontSize: 6.5, padding: 5, }}>UIPA-QA-R-OPS-4-006</Text>
                            </View>
                        </View>

                        <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottom: '2px' }}>

                            <View style={{ borderRight: '2px', padding: 3, width: "50%", height: '100%' }}>
                                <Text style={{ fontSize: 6.5 }}>Rev</Text>
                            </View>

                            <View>
                                <Text style={{ fontSize: 6.5, padding: 5, textAlign: 'center' }}>00</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>

                            <View style={{ borderRight: '2px', padding: 3, width: "50%", height: '100%' }}>
                                <Text style={{ fontSize: 6.5 }}>Implemented on</Text>
                            </View>

                            <View>
                                <Text style={{ fontSize: 6.5, padding: 5, }}>30/90/2022</Text>
                            </View>
                        </View>

                    </View>
                </View>

                {/* sheet table */}

                <View style={{ margin: 20, marginRight: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: 11 }}>

                    <View>

                        <View style={{ display: 'flex', justifyContent: "space-between", flexDirection: 'row', border: '1px', padding: 0 }}>
                            <View style={{ flex: 0.65, borderRight: 1, padding: 2 }}>
                                <Text style={{ fontSize: 10 }}>To : {`${props.to}`}</Text>
                            </View>
                            <View style={{ flex: 0.4, alignItems: 'center', borderRight: 1, padding: 2, margin: 'auto' }}>
                                <Text style={{ textAlign: 'center', margin: 'auto' }}>Issue No.: </Text>
                            </View>
                            <View style={{ flex: 0.40, textAlign: 'center' }}>
                                <Text style={{ color: 'red' }}>{props?.issueSheetNumber}</Text>
                            </View>
                        </View>

                        <View>
                            <View style={{ border: 1, borderTop: 'none', padding: 2 }}>
                                <Text style={{ fontSize: 10, fontWeight: 'bold ' }}>Attention: {props?.attention}</Text>
                            </View>

                        </View>

                        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', border: "1px", borderTop: 'none', width: "100%" }}>

                            <View style={{ width: '90%', borderRight: "1px" }}>

                                <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>

                                    <View style={{ width: '30%', borderRight: 1, padding: 2 }}>
                                        <Text style={{ fontSize: 10, fontWeight: 'bold ', paddingTop: 3 }}>Client</Text>
                                    </View>

                                    <View style={{ padding: 2 }}>
                                        <Text style={{ fontSize: 10, fontWeight: 'bold ', paddingTop: 3 }}>{props?.client}</Text>
                                    </View>

                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                    <View style={{ width: '30%', borderRight: 1, padding: 2 }}>
                                        <Text style={{ fontSize: 10, fontWeight: 'bold ', paddingTop: 3 }}>Project Name</Text>
                                    </View>

                                    <View style={{ padding: 2 }}>
                                        <Text style={{ fontSize: 10, fontWeight: 'bold ' }}> {props.projectName}</Text>
                                    </View>

                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 0 }}>
                                    <View style={{ width: '30%', borderRight: 1, padding: 2 }}>
                                        <Text style={{ fontSize: 10, fontWeight: 'bold ', paddingTop: 3 }}>Project No:</Text>
                                    </View>

                                    <View style={{ padding: 2 }}>
                                        <Text style={{ fontSize: 10, fontWeight: 'bold ', paddingTop: 3 }}> {props?.projectNumber}</Text>
                                    </View>

                                </View>





                            </View>



                            <View style={{ width: "30%" }}>


                                <View style={{ width: "100%", flex: 1 }}>
                                    <View style={styles.table}>
                                        {transformDateArray(props.createdAt.split("-"))?.map((row) => (
                                            <TableRow key={row.id} {...row} />
                                        ))}
                                    </View>
                                </View>
                            </View>

                        </View>

                        <View>

                            <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 0, height: 20 }}>
                                {/* <Text>test</Text> */}
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', border: "1px", borderTop: 1, width: "100%" }}>

                                <View style={{ borderRight: 1, padding: 5, textAlign: 'center', flexGrow: "1", width: "10%" }}>
                                    <Text>DWG No</Text>
                                </View>
                                <View style={{ textAlign: 'center', borderRight: 1, padding: 5, flexGrow: "1", width: "40%" }}>
                                    <Text style={{ textAlign: 'center' }}>Drawing Title</Text>
                                </View>
                                <View style={{ textAlign: 'center', borderRight: 1, padding: 5, flexGrow: "1", width: "10%" }}>
                                    <Text style={{ textAlign: 'center' }}>No of copies</Text>
                                </View>

                                <View style={{ textAlign: 'center', borderRight: 1, padding: 5, flexGrow: "1", width: "10%" }}>
                                    <Text style={{ textAlign: 'center' }}>Size</Text>
                                </View>

                                <View style={{ textAlign: 'center', padding: 5, flexGrow: "1", width: "10%" }}>
                                    <Text style={{ textAlign: 'center' }}>Revision mark</Text>
                                </View>
                            </View>

                            {/* table roles */}

                            {
                                props?.drawingsIssued
                                    ?.map((drawing, key) => (
                                        <View style={{ display: 'flex', flexDirection: 'row', border: "1px", borderTop: 'none', width: "100%" }}>
                                            <View style={{ borderRight: 1, padding: 5, textAlign: 'start', flexGrow: "1", width: "10%" }}>
                                                <Text>{drawing?.drawing?.drawingNumber}</Text>
                                            </View>
                                            <View style={{ textAlign: 'center', borderRight: 1, padding: 5, flexGrow: "1", width: "40%" }}>
                                                <Text style={{ textAlign: 'start', fontSize: 8 }}>{drawing?.drawing?.title} </Text>
                                            </View>
                                            <View style={{ textAlign: 'center', borderRight: 1, padding: 5, flexGrow: "1", width: "10%" }}>
                                                <Text style={{ textAlign: 'center' }}>{drawing?.copies}</Text>
                                            </View>

                                            <View style={{ textAlign: 'center', borderRight: 1, padding: 5, flexGrow: "1", width: "10%" }}>
                                                <Text style={{ textAlign: 'start' }}>{drawing?.drawing?.size}</Text>
                                            </View>

                                            <View style={{ textAlign: 'center', padding: 5, flexGrow: "1", width: "10%" }}>
                                                <Text style={{ textAlign: 'center' }}>{drawing?.drawing?.revisions}</Text>
                                            </View>
                                        </View>

                                    ))
                            }







                        </View>

                    </View>



                    {/* remarks section */}

                    <View style={{ marginTop: 40 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', border: "2px", borderBottom: '1', width: "100%", justifyContent: 'center', padding: 4, backgroundColor: '#800020' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Remarks</Text>
                        </View>

                        <View style={{ height: 100, paddingTop: 20, border: 2, borderTop: 'none' }}>

                            <View style={{ position: 'absolute', right: 0, bottom: 0, padding: 5, border: 1, borderBottom: 'none', borderRight: 'none' }}>
                                <Text>Issued For:  {props.issuedFor}</Text>
                                <Text>Media: {props?.media}</Text>
                            </View>
                        </View>


                        <View style={{}}>
                            {/* issued by section */}

                            <View style={{ marginTop: 10, border: 2, borderRight: 'none', display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>

                                <View style={{ textAlign: 'center', width: '20%', padding: 5, borderRight: 1, justifyContent: 'center' }}>
                                    <Text>Issued By</Text>
                                </View>

                                <View style={{ textAlign: 'center', width: '80%', borderRight: 1 }}>

                                    {/* top */}

                                    <View style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', borderBottom: 1, marginHorizontal: "20" }}>
                                        <View style={{ padding: 20 }}>
                                            <Text>{props?.issuedBy?.name || ""}</Text>

                                        </View>

                                        <View style={{ padding: 20 }}>
                                            <Image style={{ width: 110 }} src={props?.issuedBy?.signature} />

                                        </View>
                                        <View style={{ padding: 20 }}>
                                            <Text>{props?.issuedBy?.date.split("T")[0]}</Text>

                                        </View>
                                    </View>

                                    {/* bottom */}

                                    <View style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', marginHorizontal: "20" }}>
                                        <Text>Name</Text>
                                        <Text>Signature</Text>
                                        <Text>Date</Text>
                                    </View>

                                </View>
                            </View>


                            {/* Received By */}
                            <View style={{ marginTop: 0, border: 2, borderTop: 'none', borderRight: 'none', display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>

                                <View style={{ textAlign: 'center', width: '20%', padding: 5, borderRight: 1, justifyContent: 'center' }}>
                                    <Text>Received By</Text>
                                </View>

                                <View style={{ textAlign: 'center', width: '80%', borderRight: 1 }}>

                                    {/* top */}

                                    <View style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', borderBottom: 1, marginHorizontal: "20" }}>
                                        <View style={{ padding: 20 }}>
                                            <Text></Text>

                                        </View>

                                        <View style={{ padding: 20 }}>
                                            <Text></Text>

                                        </View>
                                        <View style={{ padding: 20 }}>
                                            <Text></Text>

                                        </View>
                                    </View>

                                    {/* bottom */}

                                    <View style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', marginHorizontal: "20" }}>
                                        <Text>Name</Text>
                                        <Text>Signature</Text>
                                        <Text>Date</Text>
                                    </View>

                                </View>



                            </View>


                        </View>

                    </View>



                </View>




            </Page>
        </Document >
    )
}

export default IssueSheetTemplate
