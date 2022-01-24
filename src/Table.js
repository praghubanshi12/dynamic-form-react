import React from 'react'


export default function Table({ updateColumns, addRow, handleSubmit, handleChange, products, isValidated, columns }) {
    
    return (
        <div className='row'>
            <div className='col'>
                <label>Warranty</label>
                <input type="checkbox" className='checkbox' name="warranty" onChange={updateColumns} />

                <form onSubmit={handleSubmit}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th name='name' className='dynamic-column'>Name</th>
                                <th name='price' className='dynamic-column'>Price</th>
                                <th name='warranty' className='dynamic-column'>Warranty (years)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                            <tr className="table-row">
                                <td name='name' className='dynamic-column'>
                                    <input type="text" placeholder='name' name="name0" onChange={handleChange} className='form-control name-input' />
                                    <span className='text-danger'>This name is required</span>
                                </td>
                                <td name='price' className='dynamic-column'>
                                    <input type="number" placeholder='price' name="price0" onChange={handleChange} className='form-control price-input' />
                                    <span className='text-danger'>This price is required</span>
                                </td>
                                <td name='warranty' className='dynamic-column'>
                                    <input type="number" min='1' max='10' placeholder='warranty' name="warranty0" onChange={handleChange} className='form-control warranty-input' />
                                    <span className='text-danger'>This warranty is required</span>
                                </td>
                                <td><button type="button" onClick={addRow} className='btn btn-primary'>+</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit" style={{ textAlign: 'center' }} className='btn btn-primary' disabled={!isValidated}>Submit</button>
                </form>
            </div>
            <div className='col'>
                {
                    products.map((product, index) =>
                        <h5 key={index}>
                            <strong>Name:</strong> {product["name"]}
                            ,<strong>Price:</strong> {product["price"]}
                            ,{columns['active'].includes("warranty") && <strong>Warranty:</strong>} {product["warranty"]}

                        </h5>)}
            </div>
        </div>
    )
}
