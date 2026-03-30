import { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import CouponModal from "../../components/CouponModal";
import DeleteModal from "../../components/DeletModal";
import Pagination from "../../components/Pagination";
import { useLoading } from "../../page/LoadingContext";
import { Modal } from "bootstrap";
function AdminCoupons() {
    const { showLoading, hideLoading, notify } = useLoading();//loading
    const [coupons, setCoupons] = useState([]);//優惠
    const [pagination, setPagination] = useState({});//分頁
    const [type, setType] = useState('create');//type 決定modal用途-->edit
    const [tempCoupon, setTempCoupon] = useState({});//edit target data
    const couponModal = useRef(null);//新增&編輯優惠modal
    const deleteModal = useRef(null);//刪除優惠modal
    const getCoupons = async (page = 1) => {
        showLoading("商品載入中...");// 開loading
        const res = await api.get(`/v2/api/${import.meta.env.VITE_API_PATH}/admin/coupons?page=${page}`);
        console.log(res);//登入取商品資料
        setCoupons(res.data.coupons);
        setPagination(res.data.pagination);
        hideLoading();// 關loading
    };
    useEffect(() => {
        couponModal.current = new Modal('#CouponModal', { backdrop: 'static', });//初始化 Modal
        deleteModal.current = new Modal('#DeleteModal', { backdrop: 'static', });//初始化 Modal
        const timer = setTimeout(() => {
            getCoupons();//打api
        }, 0);
        return () => clearTimeout(timer);
    }, []);
    // Product method
    const openCouponModal = (type, item) => {
        setType(type); setTempCoupon(item); couponModal.current.show();
    };
    const closedModal = () => { couponModal.current.hide(); };
    // Delet method
    const openDeleteModal = (product) => {
        setTempCoupon(product); deleteModal.current.show();
    };
    const closedDeleteModal = () => { deleteModal.current.hide(); };

    const deleteCoupon = async (id) => {
        try {
            showLoading("刪除中...");
            closedDeleteModal();
            const res = await api.delete(`/v2/api/${import.meta.env.VITE_API_PATH}/admin/coupon/${id}`);
            if (res.data.success) {
                getCoupons(); notify("已刪除");
            }
        } catch (error) {
            console.log(error);
        }
    }
    // 
    // Unix timestamp (秒) → YYYY-MM-DD
    const timestampToDateString = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp * 1000);
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    };
    return (
        <div className="p-3">
            <CouponModal closedModal={closedModal} getCoupons={getCoupons} type={type} tempCoupon={tempCoupon} timestampToDateString={timestampToDateString} />
            <DeleteModal closed={closedDeleteModal} Product={tempCoupon} Delete={deleteCoupon} ProductID={tempCoupon.id} />
            <h3>優惠卷列表</h3>
            <hr />
            <div className="text-end">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => openCouponModal('create', {})}>建立優惠卷</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">標題</th>
                        <th scope="col">折扣(%)</th>
                        <th scope="col">優惠碼</th>
                        <th scope="col">到期日</th>
                        <th scope="col">啟用狀態</th>
                        <th scope="col">編輯</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map((product) => {
                        return (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{product.percent}</td>
                                <td>{product.code}</td>
                                <td>{timestampToDateString(product.due_date)}</td>
                                <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                                <td>
                                    <button type="button" className="btn btn-primary btn-sm" onClick={() => openCouponModal('edit', product)}>編輯</button>
                                    <button type="button" className="btn btn-outline-danger btn-sm ms-2" onClick={() => openDeleteModal(product)}>刪除</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination pagination={pagination} changPage={getCoupons} />
        </div>
    );
}
export default AdminCoupons;