import { useEffect, useState } from "react"
import Customer from "./Customer"
import AxiosInstance from '../Config/axiosInstance';
import Product from "./Product"

interface Cart {
    _id: string | undefined,
    description: string | undefined,
    unitPrice: number | '',
    qty: number | undefined,
    total: number
}

const Order: React.FC = ()=> {
    const styleObj: React.CSSProperties = {
        marginBottom:'20px'
    }
    const bottomContext: React.CSSProperties = {
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    }
    const totalText: React.CSSProperties = {
        color:'red',
        margin:'0'
    }

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Cart[]>([]);

    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState<number | ''>('');

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [, setName] = useState('');
    const [userQty, setUserQty] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState<number | ''>('');
    const [qtyOnHand, setQtyOnHand] = useState<number | ''>('');
    const [netTotal, setNetTotal] = useState<number>(0);

    useEffect(()=>{
        findAllCustomers();
        findAllProducts();
    }, [])

    const setTotal = ()=> {
        let amount = 0;
        setNetTotal(0);
        cart.map((data)=>{
            amount += data?.total;
            setNetTotal(amount);
        })
    }

    const findAllCustomers = async () => {
        const response = await AxiosInstance.get('/customers/find-all?searchText=&page=0&size=10');
        setCustomers(response.data);
    }

    const findAllProducts = async () => {
        const response = await AxiosInstance.get('/products/find-all?searchText=&page=0&size=10');
        setProducts(response.data);
    }

    const getCustomerById = async (id: string) => {
        const customer = await AxiosInstance.get('/customers/find-by-id/'+id);
        setSelectedCustomer(customer.data);
        setAddress(customer.data.address);
        setSalary(parseFloat(customer.data.salary));
    }

    const getProductById = async (id: string) => {
        const product = await AxiosInstance.get('/products/find-by-id/'+id);
        setSelectedProduct(product.data);
        setName(product.data.name);
        setDescription(product.data.description);
        setUnitPrice(parseFloat(product.data.unitPrice));
        setQtyOnHand(parseFloat(product.data.qtyOnHand));
    }

    const addToCart = async (newItem: Cart) => {
        setCart((prevState)=>[...prevState, newItem]);
        setTotal();
    }

    return (
        <>
          <br />
          <div className="container">
            <div className="row">
                <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                    <div className="form-group">
                        <label htmlFor="customer">Select Customer</label>
                        <select id="customer" className="form-control" onChange={(e)=>{
                            getCustomerById(e.target.value);
                        }}>
                            <option value="">Select Value</option>
                            {customers.map((customer, index)=> 
                                <option key={index} value={customer._id}>{customer.name}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                    <div className="form-group">
                        <label htmlFor="address">Customer Address</label>
                        <input value={address} disabled type="text" className="form-control" id='address'/>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                    <div className="form-group">
                        <label htmlFor="salary">Salary</label>
                        <input value={salary} disabled type="number" className="form-control" id='salary'/>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                    <div className="form-group">
                        <label htmlFor="product">Select Product</label>
                        <select id="product" className="form-control" onChange={(e)=>{
                            getProductById(e.target.value);
                        }}>
                            <option value="">Select Value</option>
                            {products.map((product, index)=> 
                                <option key={index} value={product._id}>{product.name}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="form-group">
                        <label htmlFor="description">Product Description</label>
                        <input value={description} disabled type="text" className="form-control" id='description'/>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-2">
                <div className="form-group">
                        <label htmlFor="price">Unit Price</label>
                        <input value={unitPrice} disabled type="number" className="form-control" id='price'/>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-2" style={styleObj}>
                    <div className="form-group">
                        <label htmlFor="qtyOnHand">QTY On Hand</label>
                        <input value={qtyOnHand} disabled type="number" className="form-control" id='qtyOnHand'/>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-2" style={styleObj}>
                    <div className="form-group">
                        <label htmlFor="qty">QTY</label>
                        <input onChange={(e)=>{setUserQty(parseFloat(e.target.value))}} type="number" className="form-control" id='qty'/>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-12">
                    <button className="btn btn-primary col-12" onClick={()=>{
                        const cartProduct:Cart = {
                            _id: selectedProduct?._id,
                            description: description,
                            unitPrice: unitPrice,
                            qty: userQty,
                            total: (userQty*(unitPrice ? unitPrice : 0))
                        }
                        addToCart(cartProduct);
                    }}>Add Product</button>
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
                                <th>Unit Price</th>
                                <th>QTY</th>
                                <th>Total</th>
                                <th>Delete Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((data, index)=> 
                                <tr key={index}>
                                    <td>{data._id}</td>
                                    <td>{data.description}</td>
                                    <td>{data.unitPrice}</td>
                                    <td>{data.qty}</td>
                                    <td>{data.total}</td>
                                    <td>
                                        <button 
                                            onClick={()=>{
                                                setCart((prevState)=>prevState.filter((cartData)=>cartData._id != data._id));
                                                setTotal();
                                            }}
                                            className="btn btn-outline-danger btn-sm">Remove</button>
                                    </td>
                                </tr>
                            )}
                            
                        </tbody>
                    </table>

                    <br />

                    <div className="bottom-context" style={bottomContext}>
                        <div className="total-outer">
                            <h2 style={totalText}>Total : {netTotal}</h2>
                        </div>
                        <div className="place-order-button-context">
                            <button className="btn btn-primary" onClick={async ()=>{
                                await AxiosInstance.post('/orders/create/',{
                                    date: new Date(),
                                    customerDetails: selectedCustomer,
                                    totalCost: 1500,
                                    products: cart
                                });
                            }}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </>
    )
}

export default Order;