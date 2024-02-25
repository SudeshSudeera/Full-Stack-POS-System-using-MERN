import { useEffect, useState } from "react";
import DefaultCard from "./cards/DefaultCard";
import DefaultChart from "./cards/DefaultChart";
import MinQtyCard from "./cards/MinQtyCard";
import Product from "./Product.tsx";
import AxiosInstance from '../Config/axiosInstance';

const Home: React.FC = ()=> {

  const [products, setProducts] = useState<Product[]>([]);
  const [productCount, setProductCount] = useState<number | ''>();
  const [orderCount, setOrderCount] = useState<number | ''>();
  const [customerCount, setCustomerCount] = useState<number | ''>();
  const [income, setIncome] = useState<number | ''>();

  useEffect(()=>{
    findAllProducts();
    findAllCount();
  }, [])

  const findAllProducts = async () => {
    const response = await AxiosInstance.get('/products/find-all-min');
    setProducts(response.data);
  }

  const findAllCount = async () => {
    const productCount = await AxiosInstance.get('/products/find-all-count');
    setProductCount(productCount.data);

    const orderCount = await AxiosInstance.get('/orders/find-acount');
    setOrderCount(orderCount.data);

    const customerCount = await AxiosInstance.get('/customers/find-count');
    setCustomerCount(customerCount.data);

    const income = await AxiosInstance.get('/orders/find-income');
    setIncome(income.data);
  }

    return (
        <>
        <br />
          <div className="container">
            <div className="row">

              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <DefaultCard thumbnail="https://img.freepik.com/free-photo/woman-cafe-with-laptop_1208-198.jpg?size=626&ext=jpg&ga=GA1.1.1421873016.1685940207&semt=sph" 
                            description="This is a wider card with text." 
                            title="Customers" 
                            value={customerCount} 
                            key={1}/>
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <DefaultCard thumbnail="https://img.freepik.com/free-photo/young-man-working-warehouse-with-boxes_1303-16616.jpg?w=360&t=st=1707904094~exp=1707904694~hmac=d88a74a0fdcc32568ba92d0e581e2ba566df24202b8c6b5e183acd5739195649" 
                            description="This is a text below as a natural lead." 
                            title="Orders" 
                            value={orderCount} 
                            key={2}/>
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <DefaultCard thumbnail="https://img.freepik.com/free-photo/full-shot-man-holding-tablet_23-2149214308.jpg?w=360&t=st=1707904668~exp=1707905268~hmac=baff1fb0c044e9a426eee979110bc13c7712dcb2186b077d534dcdbabcf594ae" 
                            description="This content is a little bit longer." 
                            title="Products" 
                            value={productCount}
                            key={3}/>
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <DefaultCard thumbnail="https://img.freepik.com/free-photo/person-carrying-lot-cash_53876-65367.jpg?w=360&t=st=1707900167~exp=1707900767~hmac=6f811de809e7bd6a4ed0d6940189cc6e56019482ae6cc6f2a9dcd765eaa6b5bd" 
                            description="Supporting text below as a natural." 
                            title="Income" 
                            value={income} 
                            key={4}/>
              </div>

            </div>
            <br />
            <div className="row">
                <div className="col-12 col-md-9">
                    <div className="context">
                        <DefaultChart />
                    </div>
                </div>
                <div className="col-12 col-md-3">
                  {products.map((prod, index)=>
                     <MinQtyCard name={prod.name} image={prod.image} description={prod.description} key={index} />
                  )}
                </div>
            </div>
          </div>
        </>
    )
}

export default Home;