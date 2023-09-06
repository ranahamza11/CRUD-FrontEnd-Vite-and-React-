import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

const EditPage = () => {
    let {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        quantity: "",
        price: "",
        image: ""
    });
    const navigate = useNavigate();

    const getProduct = async() => {

        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/products/${id}`);

            setProduct({
                name: response.data.name,
                quantity: response.data.quantity,
                price: response.data.price,
                image: response.data.image
            });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }

    }

    const updateProduct = async(e) => {
        e.preventDefault();
        if(product.name === '' || product.quantity === "" || product.price === "" || product.image === "") {
            toast.error('please fill out all the fields');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.put(`http://localhost:3000/api/products/${id}`, product);
            toast.success(`Update ${response.data.name} sucessfully`);
            setIsLoading(false);
            navigate('/');
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, [])
    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Update the Product
            </h2>
            <form action="" onSubmit={updateProduct}>
                <div className="space-y-2">
                    <div>
                        <label>Name</label>
                        <input type="text" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value}) } className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name"/>
                    </div>

                    <div>
                        <label>Quantity</label>
                        <input type="number" value={product.quantity} onChange={(e) => setProduct({...product, quantity: e.target.value}) } className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Quantity"/>
                    </div>

                    <div>
                        <label>Price</label>
                        <input type="number" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value}) } className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Price"/>
                    </div>

                    <div>
                        <label>Image URL</label>
                        <input type="text" value={product.image} onChange={(e) => setProduct({...product, image: e.target.value}) } className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Image URL"/>
                    </div>
                    <div>
                        {!isLoading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Update</button>)}
                        
                    </div>



                </div>
            </form>
        </div>
    );
}

export default EditPage;