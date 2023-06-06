import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { BsCloudUpload } from "react-icons/bs"
import { ImagetoBase64 } from '../../utility/ImagetoBase64'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const EditProduct = () => {
    const [data, setData] = useState({
        name: "",
        category: "",
        image: "",
        price: "",
        description: ""
    })
    let navigate = useNavigate();
    const { id } = useParams();
    console.log("edit peoduct  id", id)
    useEffect(() => {
        async function editProd() {
            try {
                const response = await axios.get(`http://localhost:8088/product/edit/${id}`);
                console.log("res edit", response)
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        editProd();
    }, [id]);

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }

    const uploadImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0])
        setData((preve) => {
            return {
                ...preve,
                image: data
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, image, category, price } = data

        if (name && image && category && price) {
            await axios.put(`http://localhost:8088/uploadProduct/${id}`, data)

            navigate('/manage-product')

        }
        else {
            toast("Enter required Fields")
        }


    }
    return (
        <div className="p-4">
            <form className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type={"text"} name="name" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name} />

                <label htmlFor='category'>Category</label>
                <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
                    <option value={"other"}>select category</option>
                    <option value={"Bread"}>Bread</option>
                    <option value={"Sandwich"}>Sandwich</option>
                    <option value={"Roll"}>Roll</option>
                    <option value={"Pastry"}>Pastry</option>
                    <option value={"Pizza"}>Pizza</option>
                    <option value={"Salads"}>Salads</option>
                    <option value={"Burek"}>Burek</option>

                </select>

                <label htmlFor='image'>Image
                    <div className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
                        {
                            data.image ? <img src={data.image} className="h-full" /> : <span className='text-5xl'><BsCloudUpload /></span>
                        }


                        <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className="hidden" />
                    </div>
                </label>


                <label htmlFor='price' className='my-1'>Price</label>
                <input type={"text"} className='bg-slate-200 p-1 my-1' name='price' onChange={handleOnChange} value={data.price} />

                <label htmlFor='description'>Description</label>
                <textarea rows={2} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>

                <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
            </form>
        </div>
    )
}

export default EditProduct