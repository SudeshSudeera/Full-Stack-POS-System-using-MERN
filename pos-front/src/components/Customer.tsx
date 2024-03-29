import AxiosInstance from '../Config/axiosInstance';
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'

interface Customer {
    _id:string,
    name:string,
    address:string,
    salary:number
}

const Customer: React.FC = ()=> {

    const [customers, setCustomers] = useState<Customer[]>([]);
    
    const [modelState, setModelState] = useState<boolean>(false);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState<number | ''>('');

    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [updateAddress, setUpdateAddress] = useState('');
    const [updateSalary, setUpdateSalary] = useState<number | ''>('');

    useEffect(()=>{
        findAllCustomers()
    }, [])

    const findAllCustomers = async () => {
        const response = await AxiosInstance.get('/customers/find-all?searchText=&page=0&size=10');
        setCustomers(response.data);
    }

    const saveCustomer = async () => {
        try {
            const response = await AxiosInstance.post('/customers/create', {
                name, address, salary
            });
            console.log(response);
            
            setName('');
            setAddress('');
            setSalary('');

        } catch(e) {
            console.log(e);
        }
    }

    const deleteCustomer = async (id: string)=> {
        await AxiosInstance.delete('/customers/delete-by-id/'+id);
    }

    const loadModel = async (id: string)=> {
        const customer = await AxiosInstance.get('/customers/find-by-id/'+id);
        setSelectedCustomerId(customer.data._id)
        setUpdateName(customer.data.name);
        setUpdateAddress(customer.data.address);
        setUpdateSalary(parseFloat(customer.data.salary));
        setModelState(true);
    }

    const updateCustomer = async () => {
        try {
            await AxiosInstance.put('/customers/update/'+selectedCustomerId, {
                name: updateName, address: updateAddress, salary: updateSalary
            });
            setModelState(false);
            findAllCustomers();

        } catch(e) {
            console.log(e);
        }
    }

    return (
        <>
          <br />
          <div className="container">
            <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="form-group">
                        <label htmlFor="customerName">Customer Name</label>
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control" id='customerName'/>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="form-group">
                        <label htmlFor="customerAddress">Customer Address</label>
                        <input value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text" className="form-control" id='customerAddress'/>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="form-group">
                        <label htmlFor="customerSalary">Customer Salary</label>
                        <input value={salary} onChange={(e)=>{setSalary(e.target.value == '' ? '' : parseFloat(e.target.value))}} type="number" className="form-control" id='customerSalary'/>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-12">
                    <button onClick={saveCustomer} className="btn btn-primary col-12">Save Customer</button>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-12">
                    <form className="col-12">
                        <input type="search" className="form-control" placeholder="Search Customer Here" />
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
                                <th>Customer Name</th>
                                <th>Address</th>
                                <th>Salary</th>
                                <th>Delete Option</th>
                                <th>Update Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, index)=>
                              <tr key={index}>
                                <td>#{index}</td>
                                <td>{customer.name}</td>
                                <td>{customer.address}</td>
                                <td>{customer.salary}</td>
                                <td>
                                    <button 
                                        onClick={()=>{
                                            if(confirm('Are you sure?')){
                                                deleteCustomer(customer._id)
                                            }
                                        }}
                                        className="btn btn-outline-danger btn-sm">Delete</button>
                                </td>
                                <td>
                                    <button 
                                        onClick={()=>{
                                            loadModel(customer._id)
                                        }}
                                        className="btn btn-outline-success btn-sm">Update</button>
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
                <h2>Update Customer</h2>
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
                        <input defaultValue={updateAddress} type="text" 
                            onChange={(e)=>{setUpdateAddress(e.target.value)}}
                            className="form-control"/>
                    </div>
                </div>
                <br />
                <div className="col-12">
                    <div className="form-group">
                        <input defaultValue={updateSalary} type="text" 
                           onChange={(e)=>{setUpdateSalary(parseFloat(e.target.value))}}
                           className="form-control"/>
                    </div>
                </div>
                <br />
                <div className="col-12">
                    <button type="button" className="btn btn-success col-12"
                        onClick={()=>updateCustomer()}
                        >Update Customer</button>
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

export default Customer;