import { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeletModal";
import Pagination from "../../components/Pagination";
import { useLoading } from "../../page/LoadingContext";
import { Modal } from "bootstrap";
function AdminProducts() {
    const { showLoading, hideLoading, notify } = useLoading();//loading
    const [products, setProducts] = useState([]);//商品
    const [pagination, setPagination] = useState({});//分頁
    const [type, setType] = useState('create');//type 決定modal用途-->edit
    const [tempProduct, setTempProduct] = useState({});//edit target data
    const productModal = useRef(null);//新增&編輯商品modal
    const deleteModal = useRef(null);//刪除商品modal
    const getProduct = async (page = 1) => {
        showLoading("商品載入中...");// 開loading
        const productResponse = await api.get(`/v2/api/${import.meta.env.VITE_API_PATH}/admin/products?page=${page}`);
        //console.log(productResponse);//登入取商品資料
        setProducts(productResponse.data.products);
        setPagination(productResponse.data.pagination);
        hideLoading();// 關loading
    };
    useEffect(() => {
        productModal.current = new Modal('#ProductModal', { backdrop: 'static', });//初始化 Modal
        deleteModal.current = new Modal('#DeleteModal', { backdrop: 'static', });//初始化 Modal
        const timer = setTimeout(() => {
            getProduct();//打api
        }, 0);
        return () => clearTimeout(timer);
    }, []);
    // Product method
    const openProductModal = (type, product) => {
        setType(type); setTempProduct(product); productModal.current.show();
    };
    const closedProductModal = () => { productModal.current.hide(); };
    // Delet method
    const openDeleteModal = (product) => {
        setTempProduct(product); deleteModal.current.show();
    };
    const closedDeleteModal = () => { deleteModal.current.hide(); };

    const deleteProduct = async (id) => {
        try {
            showLoading("刪除中...");
            closedDeleteModal();
            const res = await api.delete(`/v2/api/${import.meta.env.VITE_API_PATH}/admin/product/${id}`);
            if (res.data.success) {
                getProduct(); notify("已刪除");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="p-3">
            <ProductModal closedProductModal={closedProductModal} getProduct={getProduct} type={type} tempProduct={tempProduct} />
            <DeleteModal closed={closedDeleteModal} Product={tempProduct} Delete={deleteProduct} ProductID={tempProduct.id} />
            <h3>產品列表</h3>
            <hr />
            <div className="text-end">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => openProductModal('create', {})}>建立新商品</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">分類</th>
                        <th scope="col">名稱</th>
                        <th scope="col">售價</th>
                        <th scope="col">啟用狀態</th>
                        <th scope="col">編輯</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        return (
                            <tr key={product.id}>
                                <td>{product.category}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                                <td>
                                    <button type="button" className="btn btn-primary btn-sm" onClick={() => openProductModal('edit', product)}>編輯</button>
                                    <button type="button" className="btn btn-outline-danger btn-sm ms-2" onClick={() => openDeleteModal(product)}>刪除</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination pagination={pagination} changPage={getProduct} />
        </div>
    );
}
export default AdminProducts;