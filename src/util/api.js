import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const getAllRegisters = async () => {
    const request = await axios.get('/register');
    return request;
}

export const createRegister = async (data) => {
    const request = await axios.post('/register', data);
    return request
};


export const getRegisterById = async (id) => {
    const request = await axios.get(`/register/${id}`);
    return request
}

// add drawing to category
// caegories/{categoryId}/add-drawing
export const addDrawingToCategory = async (props) => {
    const request = await axios.post(`/categories/${props.categoryId}/add-drawing`, { ...props });
    return request;
}


// add drawing to register
export const addDrawingToRegister = async (props) => {

    // console.log(props)
    const request = await axios.post(`/register/${props.registerId}/categories`, props.category);  // this is an array of categories
    return request
}


// delete a drawing from a category 
// /categories/{categoryId}/delete-drawing/{drawingId}

export const deleDrawingFromCategory = async (props) => {
    // console.log(props)
    const request = await axios.delete(`/categories/${props.categoryId}/delete-drawing/${props.drawingId}`);
    return request;
}


export const getDrawingById = async (drawingId) => {
    const request = await axios.get(`/register/drawings/${drawingId}`);
    return request
}


// get all issued documents

export const getAllIssuedDocuments = async () => {
    const request = await axios.get('/issue-sheets');
    return request
}

// get issueSheetById
export const getIssueSheetById = async (id) => {
    const request = await axios.get(`/issue-sheets/${id}`);
    return request;
}


// create issueSheet 
export const createIssueSheet = async (props) => {
    // console.log(props)
    const request = await axios.post('/issue-sheets', props);
    return request
}


// get drawing using projectnumber 

export const getDrawingsByProjectNumber = async (projectNumber) => {
    try {
        const request = await axios.get(`/categories/drawings/${projectNumber}`);
        return request; // Return only the data part of the response
    } catch (error) {
        // Handle errors, such as network issues or server errors
        console.error('Error fetching drawings by project number:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}


export const addDrawingToIssueSheet = async (props) => {
    /**
     * {
            issueSheetId: " ",
            data: {
                drawing: "string",
                copies: 5
            }
        }
     */
    const request = await axios.post(`/issue-sheets/${props?.issueSheetId}/addDrawing`, props?.data);
    return request;
}


export const loginRequest = async (props) => {

    // console.log(props)
    const request = await axios.post('/users/login', props);
    return request
}


export const saveIssueSheet = async (issueSheetId) => {
    const request = await axios.put(`/issue-sheets/${issueSheetId}`, { isSaved: true });
    return request
}


export const updateUserSignature = async (props) => {
    // console.log(props)
    const request = await axios.patch(`/users/${props._id}`, { signature: props.signature });
    return request;
}

export const getUserById = async (id) => {

    // console.log(id)
    const request = await axios.get(`/users/${id}`);
    return request
} 