import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListProduct() {
    const [product, setProduct] = useState([]);

    useEffect(function () {
        async function getProduct() {
            try {
                const response = await axios.get("http://localhost:8088/product");
                setProduct(response.data);
            } catch (error) {
                console.log("error", error);
            }
        }
        getProduct();
    }, []);

    return (
        <div className="flex flex-col p-1.5 px-14 items-center">
            <div>
                <h2 className="py-2 text-left text-xl font-bold  text-gray-900 dark:text-gray-900">
                    List Product
                    <p className="mt-6">
                        <Link to="newproduct" className="py-4 mt-4 items-start font-semibold text-left text-lg text-blue-900 dark:text-blue-900">
                            Add Product
                        </Link>
                    </p>
                </h2>
                <hr />
            </div>

            <div className=" min-w-full inline-block">
                <table className=" align-middle min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Edit</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {product &&
                            product.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td>
                                            <Link to={`/product/${item._id}`} className="px-6">
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className="px-6  pl-8 items-center py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-900">{item.price}</td>
                                        <td className="px-6  pl-8 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-900">{item.category}</td>
                                        <td className="px-6  pl-8 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-900">
                                            <Link to={`/product/${item._id}`} className="btn btn-warning">
                                                View
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/produc/editt/${item._id}`}
                                                className="text-blue-500 font-semibold pl-6  hover:text-blue-700"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/produc/deletet/${item._id}`}
                                                className="text-red-500 pl-6 font-semibold hover:text-red-700"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListProduct;