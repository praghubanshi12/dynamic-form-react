import React from 'react'


export default function Table({ updateColumns, addRow, handleSubmit, handleChange, products, isValidated, columns, rowNo }) {

    return (
        <div className='row'>
            <div className='col'>
                <label>Warranty</label>
                <input type="checkbox" name="warranty" onChange={updateColumns} />

                <label>Stars</label>
                <input type="checkbox" name="stars" onChange={updateColumns} />

                <form onSubmit={handleSubmit}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>S.N.</th>
                                <th name='name' className='dynamic-column'>Name</th>
                                <th name='price' className='dynamic-column'>Price</th>
                                <th name='warranty' className='dynamic-column'>Warranty (years)</th>
                                <th name='stars' className='dynamic-column'>Stars</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                            <tr className="table-body-row" id={`row${[rowNo]}`}>
                                <td>{rowNo + 1}</td>
                                <td name='name' className='dynamic-column'>
                                    <input type="text" placeholder='name' name={`name${[rowNo]}`} onChange={handleChange} className='form-control' />
                                </td>
                                <td name='price' className='dynamic-column'>
                                    <input type="number" placeholder='price' name={`price${[rowNo]}`} onChange={handleChange} className='form-control' />
                                </td>
                                <td name='warranty' className='dynamic-column'>
                                    <input type="number" min='1' max='10' placeholder='warranty' name={`warranty${[rowNo]}`} onChange={handleChange} className='form-control' />
                                </td>
                                <td name='stars' className='dynamic-column'>
                                    <select name={`stars${[rowNo]}`} className='form-control' onChange={handleChange}>
                                        <option value=''>Choose a star</option>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </select>
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
                            <strong>, Price:</strong> {product["price"]}
                            {columns['active'].includes("warranty") && <strong>, Warranty:</strong>} {product["warranty"]}
                            {columns['active'].includes("stars") && <strong>, Star:</strong>} {product["stars"]}
                        </h5>)}
            </div>
        </div>
    )
}
