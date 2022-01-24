import React, { useContext, useState } from 'react';

const ValidationContext = React.createContext('');

export function useValidator() {
    return useContext(ValidationContext);
}

export default function ValidationProvider({children}) {
    const [errors, setErrors] = useState(
        {
            active: { name0: 'This name is required', price0: 'This price is required' },
            hidden: { warranty0: 'This warranty is required' }
        });

    const handleChange = (event) => {
        event.preventDefault();
        let name = event.target.name;
        let placeholder = event.target.placeholder;
        let val = event.target.value;

        validate(name, placeholder, val, event.target);
        // setValues({
        //     ...values,   //spread operator to store old values
        //     [name]: val,
        // })
    }

    const validate = (name, placeholder, value, input) => {
        if (value.length === 0) {
            if (!input.nextSibling) {
                var validation = `This ${placeholder} is required`;
                var prevErrors = { ...errors };
                prevErrors["active"][name] = validation;
                setErrors(prevErrors);

                var validationText = document.createElement("span");
                validationText.className = 'text-danger';
                validationText.innerHTML = validation
                input.parentNode.insertBefore(validationText, input.nextSibling)
            }
        } else {
            setErrors(prevErrors => {
                const errors = { ...prevErrors };
                delete errors["active"][name];
                return errors;
            })
            if (input.nextSibling) {
                input.parentNode.removeChild(input.nextSibling)
            }
        }
    }

    return (
        <ValidationContext.Provider value={{ handleChange, errors, setErrors }}>
            {children}
        </ValidationContext.Provider>
    )
}
