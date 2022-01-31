import React, { useContext, useState } from 'react';

const ValidationContext = React.createContext('');

export function useValidator() {
    return useContext(ValidationContext);
}

export default function ValidationProvider({ children }) {
    const [errors, setErrors] = useState({ active: {}, hidden: {} });

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
                    updateValidations(input, validationMsg);
                } else {
                    removeError(input, name);
                }
                break;

            default:
                if (value.length === 0 || value <= 0) {
                    validationMsg = `This ${placeholder} is required`
                    updateValidations(input, validationMsg);
                } else {
                    removeError(input, name);
                }
                break;
        }
    }

    const updateValidations = (input, validationMsg) => {
        var prevErrors = { ...errors };
        if (!prevErrors[input.closest("td").hidden ? "hidden" : "active"][input.name]) {
            prevErrors[input.closest("td").hidden ? "hidden" : "active"][input.name] = validationMsg;
            setErrors(prevErrors);
        }
        input.nextSibling?.remove();
        var validationText = document.createElement("span");
        validationText.className = 'text-danger';
        validationText.innerHTML = validationMsg
        input.parentNode.insertBefore(validationText, input.nextSibling)
    }

    const removeError = (input, name) => {
        setErrors(prevErrors => {
            const errors = { ...prevErrors };
            delete errors["active"][name];
            return errors;
        })
        if (input.nextSibling) {
            input.parentNode.removeChild(input.nextSibling)
        }
    }

    return (
        <ValidationContext.Provider value={{ handleChange, errors, setErrors, handleInitialValidation }}>
            {children}
        </ValidationContext.Provider>
    )
}
