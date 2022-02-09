import React, { useEffect } from 'react';

export default function ProductList({ products, columns }) {
    useEffect(() => {
        // console.log("I am products");
    })
    return <div>
        {
            products.map((product, index) =>
                <h5 key={index}>
                    <strong>Name:</strong> {product["name"]}
                    <strong>, Price:</strong> {product["price"]}
                    {columns['active'].includes("warranty") && <strong>, Warranty:</strong>} {product["warranty"]}
                    {columns['active'].includes("stars") && <strong>, Star:</strong>} {product["stars"]}
                </h5>)
        }
    </div>;
}
