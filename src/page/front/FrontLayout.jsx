import { Outlet } from "react-router-dom";
import api from "../../api/api";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
function FrontLayout() {
    const [cartData, setCartData] = useState({});
    const getCart = async () => {
        try {
            const res = await api.get(`/v2/api/${import.meta.env.VITE_API_PATH}/cart`);
            setCartData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            getCart();
        }, 0);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <Navbar cartData={cartData} />
            <Outlet context={{ getCart, cartData }}></Outlet>
            <div className="bg-dark FT">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between text-white py-4">
                        <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
                        <ul className="d-flex list-unstyled mb-0 h4">
                            <li><a href="#" className="text-white mx-3"><i className="fab fa-facebook"></i></a></li>
                            <li><a href="#" className="text-white mx-3"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="#" className="text-white ms-3"><i className="fab fa-line"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
export default FrontLayout;