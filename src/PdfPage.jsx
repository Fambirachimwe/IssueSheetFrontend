import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, Font } from '@react-pdf/renderer';
import Logo from './assets/logo.png'
import { Flex } from '@tremor/react';

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

const data = [
    { id: 'Date', name: 12 },
    { id: 'Month', name: '02' },
    { id: 'Year', name: '24' }
];

const TableRow = ({ id, name }) => (
    <View style={styles.row}>
        <Text style={{ padding: 5, width: "80%", borderRight: 1, }}>{id}</Text>
        <Text style={{ padding: 5, width: "100%", }}>{name}</Text>
    </View>
);

Font.register({
    family: 'OpenSans',
    src: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap'
});

const MyDocument = () => (
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
                            <Text style={{ fontSize: 10 }}>To : CITY OF KADOMA</Text>
                        </View>
                        <View style={{ flex: 0.4, alignItems: 'center', borderRight: 1, padding: 2, margin: 'auto' }}>
                            <Text style={{ textAlign: 'center', margin: 'auto' }}>Issue No.: </Text>
                        </View>
                        <View style={{ flex: 0.40, textAlign: 'center' }}>
                            <Text style={{ color: 'red' }}>003</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{ border: 1, borderTop: 'none', padding: 2 }}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold ' }}>Attention: CITY OF KADOMA</Text>
                        </View>

                    </View>

                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', border: "1px", borderTop: 'none', width: "100%" }}>

                        <View style={{ width: '90%', borderRight: "1px" }}>

                            <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>

                                <View style={{ width: '30%', borderRight: 1, padding: 2 }}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold ', paddingTop: 3 }}>Client</Text>
                                </View>

                                <View style={{ padding: 2 }}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold ', paddingTop: 3 }}> TOTAL ENERGIES</Text>
                                </View>

                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                <View style={{ width: '30%', borderRight: 1, padding: 2 }}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold ', paddingTop: 3 }}>Project Name</Text>
                                </View>

                                <View style={{ padding: 2 }}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold ' }}> TOTAL ENERGIES KADOMA</Text>
                                </View>

                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 0 }}>
                                <View style={{ width: '30%', borderRight: 1, padding: 2 }}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold ', paddingTop: 3 }}>Project No:</Text>
                                </View>

                                <View style={{ padding: 2 }}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold ', paddingTop: 3 }}> TOTAL ENERGIES</Text>
                                </View>

                            </View>





                        </View>



                        <View style={{ width: "30%" }}>


                            <View style={{ width: "100%", flex: 1 }}>
                                <View style={styles.table}>
                                    {data.map((row) => (
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

                        <View style={{ display: 'flex', flexDirection: 'row', border: "1px", borderTop: 'none', width: "100%" }}>
                            <View style={{ borderRight: 1, padding: 5, textAlign: 'start', flexGrow: "1", width: "10%" }}>
                                <Text>A06</Text>
                            </View>
                            <View style={{ textAlign: 'center', borderRight: 1, padding: 5, flexGrow: "1", width: "40%" }}>
                                <Text style={{ textAlign: 'start', fontSize: 8 }}>PROPOSED BUILDING FLOOR PLAN </Text>
                            </View>
                            <View style={{ textAlign: 'center', borderRight: 1, padding: 5, flexGrow: "1", width: "10%" }}>
                                <Text style={{ textAlign: 'center' }}>3</Text>
                            </View>

                            <View style={{ textAlign: 'center', borderRight: 1, padding: 5, flexGrow: "1", width: "10%" }}>
                                <Text style={{ textAlign: 'start' }}>A1</Text>
                            </View>

                            <View style={{ textAlign: 'center', padding: 5, flexGrow: "1", width: "10%" }}>
                                <Text style={{ textAlign: 'center' }}>0</Text>
                            </View>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', border: "1px", borderTop: 'none', width: "100%" }}>
                            <View style={{ borderRight: 1, padding: 5, textAlign: 'start', flexGrow: "1", width: "10%" }}>
                                <Text>A06</Text>
                            </View>
                            <View style={{ textAlign: 'center', borderRight: 1, padding: 5, flexGrow: "1", width: "40%" }}>
                                <Text style={{ textAlign: 'start', fontSize: 8 }}>PROPOSED BUILDING FLOOR PLAN </Text>
                            </View>
                            <View style={{ textAlign: 'center', borderRight: 1, padding: 5, flexGrow: "1", width: "10%" }}>
                                <Text style={{ textAlign: 'center' }}>3</Text>
                            </View>

                            <View style={{ textAlign: 'center', borderRight: 1, padding: 5, flexGrow: "1", width: "10%" }}>
                                <Text style={{ textAlign: 'start' }}>A1</Text>
                            </View>

                            <View style={{ textAlign: 'center', padding: 5, flexGrow: "1", width: "10%" }}>
                                <Text style={{ textAlign: 'center' }}>0</Text>
                            </View>
                        </View>



                    </View>

                </View>



                {/* remarks section */}

                <View style={{ marginTop: 40 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', border: "2px", borderBottom: '1', width: "100%", justifyContent: 'center', padding: 4, backgroundColor: '#800020' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Remarks</Text>
                    </View>

                    <View style={{ height: 100, paddingTop: 20, border: 2, borderTop: 'none' }}>

                        <View style={{ position: 'absolute', right: 0, bottom: 0, padding: 5, border: 1, borderBottom: 'none', borderRight: 'none' }}>
                            <View>
                                <Text>Issued For:  CONSTRUCTION</Text>
                            </View>

                            <View>
                                <Text>Media: PAPER</Text>
                            </View>


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
                                        <Text>Marson Gotora</Text>

                                    </View>

                                    <View style={{ padding: 20 }}>
                                        <Text>Marson Gotora</Text>

                                    </View>
                                    <View style={{ padding: 20 }}>
                                        <Text>Marson Gotora</Text>

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
                                        <Text>Marson Gotora</Text>

                                    </View>

                                    <View style={{ padding: 20, width: 100 }}>
                                        <Image src={"data:image/png;base64,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"} />

                                    </View>
                                    <View style={{ padding: 20 }}>
                                        <Text>Marson Gotora</Text>

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
);


const PdfPage = () => {
    return (
        <PDFViewer width={"100%"} height={"100%"}>
            <MyDocument />
        </PDFViewer>
    )
}

export default PdfPage
