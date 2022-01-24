import React, { useEffect, useState } from "react";
import { useValidator } from "../providers/ValidationProvider";
import Table from "../Table";

const TableContainer = () => {
    const { handleChange, errors, setErrors } = useValidator();

    const [counter, setCounter] = useState(2);

    const [products, setProducts] = useState([]);

    const [isValidated, setValidated] = useState(false);

    const [columns, setColumns] = useState({ active: ["name", "price"], hidden: ["warranty"] })

    useEffect(() => {
        setValidated(Object.keys(errors["active"]).length === 0)
    }, [errors])

    useEffect(() => {
        setProducts([]);
        [...document.getElementsByClassName('dynamic-column')].forEach(col => {
            col.hidden = columns["hidden"].includes(col.getAttribute("name"))
        })
    }, [columns])

    function updateColumns() {
        [...document.getElementsByClassName("checkbox")].forEach(element => {
            var updatedColumns = { ...columns }
            var checkboxColName = element.getAttribute("name");
            var updatedErrors = { ...errors };

            if (element.checked) {
                updatedColumns["hidden"].pop(checkboxColName);
                updatedColumns["active"].push(checkboxColName);

                Object.keys(updatedErrors["hidden"]).forEach(key => {
                    if (key.startsWith(checkboxColName)) {
                        updatedErrors["active"][key] = updatedErrors["hidden"][key]
                        delete updatedErrors["hidden"][key]
                    }
                });
            } else {
                updatedColumns["active"].pop(checkboxColName);
                updatedColumns["hidden"].push(checkboxColName);

                Object.keys(updatedErrors["active"]).forEach(key => {
                    if (key.startsWith(checkboxColName)) {
                        updatedErrors["hidden"][key] = updatedErrors["active"][key]
                        delete updatedErrors["active"][key]
                    }
                });
            }
            setErrors(updatedErrors);
            setColumns(updatedColumns)
        });
    }

    function addRow() {
        document.getElementById("table-body").appendChild(getNodes(columns));
    }

    function getNodes(columns) {
        setCounter(counter => counter + 1);
        var newRowNode = document.createElement("tr");
        newRowNode.className = "table-row";
        newRowNode.id = `row-${counter}`;

        columns["active"].forEach(colName => {
            newRowNode.appendChild(getInputDatas(colName, false));
        });

        columns["hidden"].forEach(colName => {
            newRowNode.appendChild(getInputDatas(colName, true));
        });

        newRowNode.appendChild(getMinusButtonData());
        return newRowNode;
    }

    function getInputDatas(colName, isHidden) {
        var cloneNode = document.getElementsByName(`${colName}0`)[0].cloneNode(true);
        cloneNode.addEventListener("change", (event) => {
            handleChange(event);
        })

        cloneNode.name = `${colName}${[counter]}`;
        cloneNode.value = '';

        var inputData = document.createElement("td");
        inputData.className = 'dynamic-column';
        inputData.hidden = isHidden;
        inputData.setAttribute("name", colName);
        inputData.appendChild(cloneNode);

        var validationText = document.createElement("span");
        validationText.className = 'text-danger';
        validationText.innerHTML = `This ${colName} is required`;
        inputData.appendChild(validationText);
        var errorState = isHidden ? "hidden" : "active";

        var prevErrors = { ...errors };
        prevErrors[errorState][cloneNode.name] = `This ${colName} is required`;
        // setErrors(error => ({
        //     ...error, [cloneNode.name]: `This ${colName} is required`
        // }))
        setErrors(prevErrors)
        return inputData;
    }

    function getMinusButtonData() {
        var minusButtonData = document.createElement("td");
        var minusButtonNode = document.createElement("button");
        minusButtonNode.type = "button";
        minusButtonNode.innerHTML = '-';
        minusButtonNode.className = 'btn btn-danger btn-remove';
        minusButtonNode.id = counter;

        minusButtonNode.onclick = function (event) {
            var id = event.target.id;
            document.getElementById(`row-${id}`).remove();

            setErrors(prevErrors => {
                const errors = { ...prevErrors };
                delete errors["active"][`name${id}`];
                delete errors["active"][`price${id}`];
                delete errors["active"][`warranty${id}`];
                delete errors["hidden"][`warranty${id}`];
                return errors;
            })
        }

        minusButtonData.appendChild(minusButtonNode);
        return minusButtonData
    }

    function handleSubmit(e) {
        e.preventDefault();

        // [...document.getElementsByTagName("input")].forEach(input => {
        //     handleSave(input);
        // })

        setProducts([]);
        [...document.getElementsByClassName("table-row")].forEach(function (row) {
            var updatedProducts = {};
            columns['active'].forEach(colName => {
                updatedProducts[colName] = row.querySelector(`.${colName}-input`).value
            })
            setProducts(oldProducts => [...oldProducts, updatedProducts]);
        });

        // localStorage.setItem("products", JSON.stringify(products));
    }

    return (
        <Table 
            updateColumns={updateColumns} addRow={addRow} handleSubmit={handleSubmit} handleChange={handleChange} 
            products={products} isValidated={isValidated} columns={columns}
            />
    )
}

export default TableContainer;
