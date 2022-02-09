import React, { useEffect, useReducer, useState } from 'react';
import TableContainer from '../containers/TableContainer';
import Categories from './Categories';
import ColumnSelect from './ColumnSelect';

export default function Navigator() {

    const [pageDetails, setPageDetails] = useState([
        { pageNo: 1, Component: Categories, props: { isActive: true, updateValidation, renderPageNo } },
        { pageNo: 2, Component: TableContainer, props: { isActive: false, updateValidation } },
        { pageNo: 3, Component: TableContainer, props: { isActive: false, updateValidation } }
    ]);

    const [pageContent, setPageContent] = useState({});

    const initialState = { currentPageNo: 1 }

    const [state, dispatch] = useReducer(reducer, initialState);

    const [isValidated, setValidated] = useState(false);

    useEffect(() => {
        let oldPageContent = { ...pageContent };
        pageDetails.map(({ pageNo, Component, props }) => {
            oldPageContent[pageNo] =
                <Component {...props} />;
        });
        setPageContent(oldPageContent);
    }, [pageDetails])

    useEffect(() => {
        showCurrentPage(state, true);
    }, [state])


    function reducer(state, action) {
        showCurrentPage(state, false);
        switch (action.type) {
            case 'increment':
                return { currentPageNo: state.currentPageNo + 1 };
            case 'decrement':
                return { currentPageNo: state.currentPageNo - 1 };
            case 'redirect':
                if (action.destinationPageNo) {
                    return { currentPageNo: action.destinationPageNo }
                }
                throw new Error();
            default:
                throw new Error();
        }
    }

    function showCurrentPage(state, isActive) { 
        const oldPageDetails = [...pageDetails];
        oldPageDetails.find(pageDetail => pageDetail.pageNo === state.currentPageNo).props.isActive = isActive;
        setPageDetails(oldPageDetails)
    }

    function updateValidation(status) {
        setValidated(status)
    }

    function renderPageNo(pageNo) {
        dispatch({ type: 'redirect', destinationPageNo: pageNo})
    }

    return (
        <div className='row'>
            <div className='col-md-6'>
                {
                    pageDetails.map(({ pageNo }) => {
                        return pageContent[pageNo]
                    })
                }
                <div className="float-end">
                    {(state.currentPageNo > 1) &&
                        <button className='btn btn-primary' onClick={() => dispatch({ type: 'decrement' })}>Previous</button>}
                    {(state.currentPageNo < Object.keys(pageContent).length) &&
                        < button className='btn btn-primary' disabled={!isValidated} onClick={() => dispatch({ type: 'increment' })}>Next</button>
                    }
                </div>
            </div>
        </div>
    )
}
