import { Outlet, useNavigate, Link } from "react-router-dom";
//import axios from "axios";
import { useEffect, useReducer } from "react";
import { Offcanvas } from "bootstrap";
import Message from "../../components/Message";
import { MessageContext, messageReducer, initState } from "../../store/messageStore";
import api from "../../api/api";
function Dashboard() {
    const reducer = useReducer(messageReducer, initState);
    const navigate = useNavigate()
    const token = document.cookie.split('; ').find((row) => row.startsWith('hexToken='))?.split('=')[1];
    const logout = () => {
        document.cookie = `hexToken=;`;
        navigate('/login');
    }
    useEffect(() => {//檢查token的有無與正確與否
        if (!token) { return navigate('/login'); }
        (async () => {
            try {
                await api.post('/v2/api/user/check')
            } catch (error) {
                if (!error.response.data.success) { navigate('/login'); }
            }
        })();
    }, [navigate, token])
    const closeOffcanvas = () => {
        const offcanvasElement = document.getElementById('adminSidebar');
        const offcanvasInstance = Offcanvas.getInstance(offcanvasElement);

        if (offcanvasInstance) {
            offcanvasInstance.hide();
        }
    };
    return (
        <MessageContext.Provider value={reducer}>
            <Message />
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <p className="text-white mb-0">
                        後台管理系統
                    </p>
                    <button className="navbar-toggler d-md-none bg-white border-0 shadow-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#adminSidebar" >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
            <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
                {/* desktop sidebar */}
                <div className="bg-light border-end d-none d-md-block" style={{ width: '220px' }} >
                    <ul className="list-group list-group-flush">
                        <Link className="list-group-item list-group-item-action py-3" to="/admin/products">
                            <i className="bi bi-cup-fill me-2" />
                            產品列表
                        </Link>
                        <Link className="list-group-item list-group-item-action py-3" to="/admin/coupons">
                            <i className="bi bi-ticket-perforated-fill me-2" />
                            優惠卷列表
                        </Link>

                        <Link className="list-group-item list-group-item-action py-3" to="/admin/orders">
                            <i className="bi bi-receipt me-2" />
                            訂單列表
                        </Link>
                        <button type="button" className="list-group-item list-group-item-action py-3" onClick={logout}>
                            登出
                        </button>
                    </ul>
                </div>
                {/* mobile offcanvas */}
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="adminSidebar" >
                    <div className="offcanvas-body p-0">
                        <ul className="list-group list-group-flush">
                            <Link className="list-group-item list-group-item-action py-3" to="/admin/products" onClick={closeOffcanvas}>
                                <i className="bi bi-cup-fill me-2" />
                                產品列表
                            </Link>
                            <Link className="list-group-item list-group-item-action py-3" to="/admin/coupons" onClick={closeOffcanvas}>
                                <i className="bi bi-ticket-perforated-fill me-2" />
                                優惠卷列表
                            </Link>
                            <Link className="list-group-item list-group-item-action py-3" to="/admin/orders" onClick={closeOffcanvas} >
                                <i className="bi bi-receipt me-2" />
                                訂單列表
                            </Link>
                            <button type="button" className="list-group-item list-group-item-action py-3" onClick={logout}>
                                登出
                            </button>
                        </ul>
                    </div>
                </div>
                {/* content */}
                <div className="flex-grow-1 overflow-auto">
                    <Outlet />
                </div>

            </div>
        </MessageContext.Provider>
    )
}

export default Dashboard;