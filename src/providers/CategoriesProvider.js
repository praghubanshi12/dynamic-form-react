import React, { useContext, useState } from 'react';

const CategoriesContext = React.createContext('');

export function useCategories() {
    return useContext(CategoriesContext);
}

export default function CategoriesProvider({ children }) {

    const [categories, setCategories] = useState(['Electronic Gadgets', 'Musical Instruments', 'Grocery Foods', 'Books']);

    return (
        <CategoriesContext.Provider value={{categories, setCategories}}>
            {children}
        </CategoriesContext.Provider>
    );
}
