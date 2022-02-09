import React, { useEffect, useState } from 'react';
import { useCategories } from '../providers/CategoriesProvider';
import { useValidator } from '../providers/ValidationProvider';

export default function Categories({ isActive, updateValidation, renderPageNo }) {
    const { categories, setCategories } = useCategories();

    const { handleChange, handleInitialValidation, errors } = useValidator();

    const [isValidated, setValidated] = useState(false);

    useEffect(() => {
        handleInitialValidation(document.getElementById('category-input'));
    }, [])

    useEffect(() => {
        setValidated(!errors.hasOwnProperty("category"));
        updateValidation(!errors.hasOwnProperty("category"))
    }, [errors])

    function createCategory() {
        let categoryInputVal = document.getElementById('category-input').value;
        setCategories([...categories, categoryInputVal]);
        document.getElementById('category-input').value = '';
        handleInitialValidation(document.getElementById('category-input'))
    }

    function createCategoryAndProceed() {
        createCategory();
        renderPageNo(2);
    }

    return <div hidden={!isActive}>
        <div className='input-group' style={{ width: '80%' }}>
            <span>
                <input className="form-control" type='text' name='category' placeholder='category' id='category-input'
                    onChange={handleChange} />
            </span>
            <button className='btn btn-primary' disabled={!isValidated} onClick={createCategory}>Create</button>
            <button className='input-group-text btn-secondary' disabled={!isValidated} onClick={createCategoryAndProceed} >Create & Add Products</button>
        </div>

        <div>
            <ul>
                {categories.map(category => { return <li>{category}</li> })}
            </ul>
        </div>
    </div>;
}
