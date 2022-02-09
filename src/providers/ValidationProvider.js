import React, { useContext, useEffect, useState } from 'react';
import { useCategories } from './CategoriesProvider';

const ValidationContext = React.createContext('');

export function useValidator() {
    return useContext(ValidationContext);
}

export default function ValidationProvider({ children }) {
    
    const [dynamicErrors, setDynamicErrors] = useState({ active: {}, hidden: {} });

    const [errors, setErrors] = useState({});

    const {categories} = useCategories();

    const handleChange = (event) => {
        event.preventDefault();
        let name = event.target.name;
        let val = event.target.value;
        let placeholder = event.target.placeholder || event.target.closest("td").getAttribute("name");
        validate(name, val, placeholder, event.target);
    }

    const handleInitialValidation = (input) => {
        let name = input.name;
        let val = input.value;
        let placeholder = input.placeholder || input.closest("td").getAttribute("name");
        validate(name, val, placeholder, input);
    }

    const validate = (name, value, placeholder, input) => {
        var validationMsg;
        switch (placeholder) {
            case "warranty":
                if (value < 1 || value > 10) {
                    validationMsg = `This ${placeholder} value should be less than 10 years`
                    updateDynamicFormValidations(input, validationMsg);
                } else {
                    removeDynamicFormErrors(input, name);
                }
                break;

            case "category":
                if(value.length === 0){
                    validationMsg = `This ${placeholder} is required`
                    updateValidations(input, validationMsg);
                } else if(categories.includes(value)){
                    validationMsg = `This ${placeholder} already exists`;
                    updateValidations(input, validationMsg);
                } else {
                    removeErrors(input, name)
                }
                break;

            default:
                if (value.length === 0 || value <= 0) {
                    validationMsg = `This ${placeholder} is required`
                    updateDynamicFormValidations(input, validationMsg);
                } else {
                    removeDynamicFormErrors(input, name);
                }
                break;
        }
    }

    const updateDynamicFormValidations = (input, validationMsg) => {
        var prevErrors = { ...dynamicErrors };
        if (!prevErrors[input.closest("td").hidden ? "hidden" : "active"][input.name]) {
            prevErrors[input.closest("td").hidden ? "hidden" : "active"][input.name] = validationMsg;
            setDynamicErrors(prevErrors);
        }
        input.nextSibling?.remove();
        var validationText = document.createElement("span");
        validationText.className = 'text-danger';
        validationText.innerHTML = validationMsg
        input.parentNode.insertBefore(validationText, input.nextSibling)
    }

    const updateValidations = (input, validationMsg) => {
        setErrors({...errors, [input.placeholder]: validationMsg})
        input.nextSibling?.remove();
        var validationText = document.createElement("span");
        validationText.className = 'text-danger';
        validationText.innerHTML = validationMsg
        input.parentNode.insertBefore(validationText, input.nextSibling)
    }

    const removeDynamicFormErrors = (input, name) => {
        setDynamicErrors(prevErrors => {
            const dynamicErrors = { ...prevErrors };
            delete dynamicErrors["active"][name];
            return dynamicErrors;
        })
        if (input.nextSibling) {
            input.parentNode.removeChild(input.nextSibling)
        }
    }

    const removeErrors = (input, name) => {
        setErrors(prevErrors => {
            const errors = { ...prevErrors };
            delete errors[name];
            return errors;
        })
        if (input.nextSibling) {
            input.parentNode.removeChild(input.nextSibling)
        }
    }

    return (
        <ValidationContext.Provider value={{ handleChange, dynamicErrors, setDynamicErrors, handleInitialValidation, errors }}>
            {children}
        </ValidationContext.Provider>
    )
}
