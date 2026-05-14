import { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import PurchaseModal from "../../components/PurchaseModal";
// import DeleteModal from "../../components/DeletModal";
import Pagination from "../../components/Pagination";
import { useLoading } from "../../page/LoadingContext";
import { Modal } from "bootstrap";
function AdminOrders() {
    const { showLoading, hideLoading } = useLoading();//loading
    const [orders, setOrders] = useState([]);//訂單
    const [pagination, setPagination] = useState({});//分頁
    // const [type, setType] = useState('create');//type 決定modal用途-->edit
    const [tempOrder, setTempOrder] = useState({});//edit target data
    const Purchase = useRef(null);//新增&編輯訂單modal
    
    // const deleteModal = useRef(null);//刪除訂單modal
    const getOrder = async (page = 1) => {
        showLoading("訂單載入中...");// 開loading
        const orderResponse = await api.get(`/v2/api/${import.meta.env.VITE_API_PATH}/admin/orders?page=${page}`);
        setOrders(orderResponse.data.orders);
        setPagination(orderResponse.data.pagination);
        hideLoading();// 關loading
    };
    useEffect(() => {
            Purchase.current = new Modal('#PurchaseModal', { backdrop: 'static', });//初始化 Modal
        // deleteModal.current = new Modal('#DeleteModal', { backdrop: 'static', });//初始化 Modal
        const timer = setTimeout(() => {
            getOrder();//打api
        }, 0);
        return () => clearTimeout(timer);
    }, []);
    // Order method
    const openPurchaseModal = (order) => {
        setTempOrder(order);
        Purchase.current.show();
    };
    const closedPurchaseModal = () => { 
        document.activeElement.blur();
        Purchase.current.hide(); };
    // Delet method
    // const openDeleteModal = (order) => {
    //     setTempOrder(order); deleteModal.current.show();
    // };
    // const closedDeleteModal = () => { deleteModal.current.hide(); };

    // const deleteOrder = async (id) => {
    //     try {
    //         showLoading("刪除中...");
    //         closedDeleteModal();
    //         const res = await api.delete(`/v2/api/${import.meta.env.VITE_API_PATH}/admin/order/${id}`);
    //         if (res.data.success) {
    //             getOrder(); notify("已刪除");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // const [order, setOrder] = useState({
    //     "user": {
    //         "name": "test",
    //         "email": "test@gmail.com",
    //         "tel": "0912346768",
    //         "address": "kaohsiung"
    //     },
    //     "message": "這是留言"
    // });//假訂單
    // const postOrder = async () => {
    //     let apiAdress = `/v2/api/${import.meta.env.VITE_API_PATH}/order`;
    //     let method = 'post';
    //     try {
    //         const res = await api[method](apiAdress, { data: order });
    //         getOrder();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <div className="p-3">
            {/* <button className="btn btn-primary" onClick={() => openOrderModal('create', {})}>新增訂單</button> */}
            {/* <button className="btn btn-primary" onClick={postOrder}>新增訂單</button> */}

            <PurchaseModal closedModal={closedPurchaseModal} tempOrder={tempOrder} />
            {/* <DeleteModal closed={closedDeleteModal} Order={tempOrder} Delete={deleteOrder} OrderID={tempOrder.id} /> */}
            <h3>訂單列表</h3>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">買家姓名</th>
                        <th scope="col">信箱</th>
                        <th scope="col">總價</th>
                        <th scope="col">地址</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        return (
                            <tr key={order.id}>
                                <td>{order.user.name}</td>
                                <td>{order.user.email}</td>
                                <td>NT.{order.total}</td>
                                <td>{order.user.address}</td>
                                <td>
                                    <button type="button" className="btn btn-primary btn-sm" onClick={() => openPurchaseModal(order)}>檢視</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination pagination={pagination} changPage={getOrder} />
        </div>
    );
}
export default AdminOrders;