import { useEffect, useState } from "react";
import storage from "../Config/firebase";
import AxiosInstance from '../Config/axiosInstance';
import { Modal } from "react-bootstrap";

interface Product {
    _id:string,
    name:string,
    description:string,
    image:string,
    unitPrice:number
    qtyOnHand:number
}

const Product: React.FC = ()=> {
    
    const [products, setProducts] = useState<Product[]>([]);
    const [modelState, setModelState] = useState<boolean>(false);

    const [name, setName] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState<number | ''>('');
    const [qtyOnHand, setQtyOnHand] = useState<number | ''>('');

    const [selectedProductId, setSelectedProductId] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateUnitPrice, setUpdateUnitPrice] = useState<number | ''>('');
    const [updateQtyOnHand, setUpdateQtyOnHand] = useState<number | ''>('');

    useEffect(()=>{
        findAllProducts()
    }, [])

    const findAllProducts = async () => {
        const response = await AxiosInstance.get('/products/find-all?searchText=&page=0&size=10');
        setProducts(response.data);
    }

    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>)=>{
        setImage(event.target.files?.[0] || null);
    }

    const saveProduct = async ()=> {
        let imageUrl = "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4041392.jpg&fm=jpg";
        if(image){
            try {
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`images/${Math.random()+'-'+image.name}`);
                const snapShot = await imageRef.put(image);
                imageUrl = await snapShot.ref.getDownloadURL();
            } catch (error) {
                console.log(error);
            }
        }

        try {
            await AxiosInstance.post('/products/create', {
                name, description, unitPrice, qtyOnHand, image:imageUrl
            });
            setName('');
            setDescription('');
            setUnitPrice('');
            setQtyOnHand('');

            findAllProducts();

        } catch(e) {
            console.log(e);
        }
    }

    const updateProduct = async () => {
        try {
            await AxiosInstance.put('/products/update/'+selectedProductId, {
                name: updateName, description: updateDescription, unitPrice: updateUnitPrice, qtyOnHand: updateQtyOnHand
            });
            setModelState(false);
            findAllProducts();

        } catch(e) {
            console.log(e);
        }
    }

    const deleteProduct = async (id: string)=> {
        await AxiosInstance.delete('/products/delete-by-id/'+id);
        findAllProducts();
    }

    const loadModel = async (id: string)=> {
        const product = await AxiosInstance.get('/products/find-by-id/'+id);
        setSelectedProductId(product.data._id)
        setUpdateName(product.data.name);
        setUpdateDescription(product.data.description);
        setUpdateUnitPrice(parseFloat(product.data.unitPrice));
        setUpdateQtyOnHand(parseFloat(product.data.qtyOnHand));
        setModelState(true);
    }

    const styleObj: React.CSSProperties = {
        marginBottom:'20px'
    }

    return (
        <>
          <br />
          <div className="container">
            <div className="row">
                <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                    <div className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input value={name} type="text" onChange={(e)=>setName(e.target.value)} className="form-control" id='productName'/>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="form-group">
                        <label htmlFor="price">Unit Price</label>
                        <input value={unitPrice} type="number" onChange={(e)=>setUnitPrice(parseFloat(e.target.value))} className="form-control" id='price'/>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="form-group">
                        <label htmlFor="qty">Qty On Hand</label>
                        <input value={qtyOnHand} type="number" onChange={(e)=>setQtyOnHand(parseFloat(e.target.value))} className="form-control" id='qty'/>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                    <div className="form-group">
                        <label htmlFor="image">Product Image</label>
                        <input onChange={handleFile} type="file" className="form-control" id='image'/>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={5} className="form-control" id='description'/>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-12">
                    <button onClick={saveProduct} className="btn btn-primary col-12">Save Product</button>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-12">
                    <form className="col-12">
                        <input type="search" className="form-control" placeholder="Search Product Here" />
                    </form>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-12">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Product Name</th>
                                <th>QTY On Hand</th>
                                <th>Unit Price</th>
                                <th>Delete Option</th>
                                <th>Update Option</th>
                                <th>See More</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map((product, index)=>
                            <tr key={index}>
                                <td>#{index}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.unitPrice}</td>
                                <td>{product.qtyOnHand}</td>
                                <td>
                                    <button 
                                        onClick={()=>{
                                            if(confirm('Are you sure?')){
                                                deleteProduct(product._id)
                                            }
                                        }}
                                        className="btn btn-outline-danger btn-sm">Delete</button>
                                </td>
                                <td>
                                    <button 
                                        onClick={()=>{
                                            loadModel(product._id)
                                        }}
                                        className="btn btn-outline-success btn-sm">Update</button>
                                </td>
                                <td>
                                    <button 
                                        onClick={()=>{
                                            loadModel(product._id)
                                        }}
                                        className="btn btn-outline-info btn-sm">View</button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>

          {/* ==================== */}
          <Modal show={modelState}>
            <div className="p-4">
                <h2>Update Product</h2>
                <hr />
                <div className="col-12">
                    <div className="form-group">
                        <input defaultValue={updateName} type="text" 
                            onChange={(e)=>{setUpdateName(e.target.value)}}
                            className="form-control"/>
                    </div>
                </div>
                <br />
                <div className="col-12">
                    <div className="form-group">
                        <input defaultValue={updateDescription} type="text" 
                            onChange={(e)=>{setUpdateDescription(e.target.value)}}
                            className="form-control"/>
                    </div>
                </div>
                <br />
                <div className="col-12">
                    <div className="form-group">
                        <input defaultValue={updateUnitPrice} type="text" 
                           onChange={(e)=>{setUpdateUnitPrice(parseFloat(e.target.value))}}
                           className="form-control"/>
                    </div>
                </div>
                <br />
                <div className="col-12">
                    <div className="form-group">
                        <input defaultValue={updateQtyOnHand} type="text" 
                           onChange={(e)=>{setUpdateQtyOnHand(parseFloat(e.target.value))}}
                           className="form-control"/>
                    </div>
                </div>
                <br />
                <div className="col-12">
                    <button type="button" className="btn btn-success col-12"
                        onClick={()=>updateProduct()}
                        >Update Product</button>
                    <br />
                    <br />
                    <button type="button" className="btn btn-secondary col-12" onClick={()=>setModelState(false)}>Close</button>
                </div>
            </div>
          </Modal>
          {/* ==================== */}

        </>
    )
}

export default Product;