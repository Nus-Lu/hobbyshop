// import { useOutletContext } from "react-router-dom";

import { useEffect, useState } from "react";
import api from "../../api/api";
import { useParams } from "react-router-dom";
function Success() {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState({});
    const getCart = async (orderId) => {
        try {
            const res = await api.get(`/v2/api/${import.meta.env.VITE_API_PATH}/order/${orderId}`);
            setOrderData(res.data.order);
            console.log(res.data.order);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            getCart(orderId);
        }, 0);
        return () => clearTimeout(timer);
    }, [orderId]);

    return (
        <>
            <div className="container">
                <div style={{ minHeight: '400px', backgroundImage: `url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)`, backgroundPosition: 'center center' }}>
                </div>
                <div className="mt-5 mb-7">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Checkout Success</h2>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea</p>
                            <a href="./index.html" className="btn btn-outline-dark me-2 rounded-0 mb-4">Back To Home</a>
                        </div>
                        <div className="col-md-6">
                            <div className="card rounded-0 py-4">
                                <div className="card-header border-bottom-0 bg-white px-4 py-0">
                                    <h2>Order Detail</h2>
                                </div>
                                <div className="card-body px-4 py-0">
                                    <ul className="list-group list-group-flush">
                                        {Object.values(orderData?.products || {}).map((item) => {
                                            return (
                                                <li className="list-group-item px-0" key={item.id}>
                                                    <div className="d-flex mt-2">
                                                        <img src={item.product.imageUrl} alt="" className="me-2" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                                        <div className="w-100 d-flex flex-column">
                                                            <div className="d-flex justify-content-between fw-bold">
                                                                <h5>{item.product.title}</h5>
                                                                <p className="mb-0">x{item.qty}</p>
                                                            </div>
                                                            <div className="d-flex justify-content-between mt-auto">
                                                                <p className="text-muted mb-0"><small>NT${item.final_total}</small></p>
                                                                <p className="mb-0">NT${item.final_total}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-dark">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between text-white py-4">
                        <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
                        <ul className="d-flex list-unstyled mb-0 h4">
                            <li><a href="#" className="text-white mx-3"><i className="bi bi-facebook"></i></a></li>
                            <li><a href="#" className="text-white mx-3"><i className="bi bi-instagram"></i></a></li>
                            <li><a href="#" className="text-white ms-3"><i className="bi bi-line"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Success;