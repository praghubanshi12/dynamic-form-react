import React, { useEffect, useState } from "react";
import { useValidator } from "../providers/ValidationProvider";
import Table from "../components/Table";

const TableContainer = () => {
    const INITIAL_COLUMNS = { "ACTIVE": ["name", "price"], "INACTIVE": ["warranty", "stars"] }

    const { handleChange, handleInitialValidation, errors, setErrors } = useValidator();

    const [counter, setCounter] = useState(0);

    const [rowNo, setRowNo] = useState(0);

    const [products, setProducts] = useState([]);

    const [isValidated, setValidated] = useState(false);

    const [columns, setColumns] = useState({ active: INITIAL_COLUMNS.ACTIVE, hidden: INITIAL_COLUMNS.INACTIVE })

    //after column checkbox click
    useEffect(() => {
        setProducts([]);
        [...document.getElementsByClassName('dynamic-column')].forEach(col => {
            col.hidden = columns["hidden"].includes(col.getAttribute("name"))
        })
    }, [columns])

    useEffect(() => {
        var initialFormRow = [...document.getElementsByClassName("table-body-row")][0];
        [...initialFormRow.querySelectorAll("input, select")].forEach(input => {
            handleInitialValidation(input);
        })
    }, [])

    //after validation check; to disable/enable submit btn, 
    useEffect(() => {
        setValidated(Object.keys(errors["active"]).length === 0)
        console.log(errors);
    }, [errors])

    useEffect(() => {
        if (counter > 0) setRowNo(rowNo => rowNo + counter)
    }, [counter])

    useEffect(() => {
        if (rowNo > 0) {
            var cloneNode = document.getElementsByClassName("table-body-row")[0].cloneNode(true);
            cloneNode.replaceChild(getMinusButtonData(), cloneNode.lastChild);
            var prevErrors = { ...errors };
            [...cloneNode.querySelectorAll("input, select")].forEach(input => {
                input.value = "";
                input.addEventListener("input", (event) => {
                    handleChange(event);
                });

                handleInitialValidation(input);
            })
            setErrors(prevErrors);
            var tbody = document.getElementById("table-body");
            tbody.appendChild(cloneNode);
            setRowNo(0)
        }
    }, [rowNo])

    function updateColumns(e) {
        var columnName = e.target.name
        var newStatus = e.target.checked ? "active" : "hidden";
        var oldStatus = e.target.checked ? "hidden" : "active";

        var updatedColumns = { ...columns }
        //shift columns status from active to hidden, or vice versa
        updatedColumns[oldStatus] = updatedColumns[oldStatus].filter(col => {
            return col !== columnName
        });
        updatedColumns[newStatus].push(columnName);
        setColumns(updatedColumns)

        var updatedErrors = { ...errors };
        Object.keys(updatedErrors[oldStatus]).forEach(columnKey => {
            //shift error status from active to hidden, or vice versa
            if (columnKey.startsWith(columnName)) {
                updatedErrors[newStatus][columnKey] = updatedErrors[oldStatus][columnKey]
                delete updatedErrors[oldStatus][columnKey]
            }
        });
        setErrors(updatedErrors);
    }

    function addRow() {
        setCounter(counter => counter + 1)
    }

    function getMinusButtonData() {
        var minusButtonData = document.createElement("td");
        var minusButtonNode = document.createElement("button");
        minusButtonNode.type = "button";
        minusButtonNode.innerHTML = '-';
        minusButtonNode.className = 'btn btn-danger btn-remove';

        minusButtonNode.onclick = function () {
            this.closest('tr').remove();
            setErrors(prevErrors => {
                const errors = { ...prevErrors };
                removeErrorsFromRow(errors["active"]);
                removeErrorsFromRow(errors["hidden"]);
                return errors;
            })
        }
        minusButtonData.appendChild(minusButtonNode);
        return minusButtonData
    }

    function removeErrorsFromRow(errorState) {
        Object.keys(errorState).forEach(error => {
            if (error.endsWith(counter)) delete errorState[error]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        setProducts([]);
        [...document.getElementsByClassName("table-body-row")].forEach(function (row) {
            var updatedProducts = {};
            [...row.querySelectorAll('.form-control')].forEach(input => {
                var colName = input.placeholder || input.closest("td").getAttribute("name");
                if (columns['active'].includes(colName)) {
                    updatedProducts[colName] = input.value;
                }
            })
            setProducts(oldProducts => [...oldProducts, updatedProducts]);
        });
        // localStorage.setItem("products", JSON.stringify(products));
    }

    return (
        <Table
            updateColumns={updateColumns} addRow={addRow} handleSubmit={handleSubmit} handleChange={handleChange}
            products={products} isValidated={isValidated} columns={columns} rowNo={rowNo}
        />
    )
}

export default TableContainer;
