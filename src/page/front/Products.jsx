import { useEffect, useState } from "react";
import api from "../../api/api";
import Pagination from "../../components/Pagination";
import { useLoading } from "../../page/LoadingContext";
function Products() {
    const [products, setProducts] = useState([]);//商品
    const [pagination, setPagination] = useState({});//分頁
    const { showLoading, hideLoading } = useLoading();//loading
    const getProduct = async (page = 1) => {
        showLoading("商品載入中...");// 開loading
        const productResponse = await api.get(`/v2/api/${import.meta.env.VITE_API_PATH}/products?page=${page}`);
        console.log(productResponse.data);
        setProducts(productResponse.data.products);
        setPagination(productResponse.data.pagination);
        hideLoading();// 關loading
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            getProduct();//打api
        }, 0);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <div className="container mt-md-5 mt-3 mb-7 ">
                <div className="row min-vh-100">
                    {products.map((products) => {
                        return (
                            <div className="col-md-3" key={products.id}>
                                <div className="card border-0 mb-4 position-relative position-relative">
                                    <img src={products.imageUrl} className="card-img-top rounded-0" alt="..." />
                                    <div className="card-body p-0">
                                        <h4 className="mb-0 mt-3"><a href="#">{products.title}</a></h4>
                                        <p className="card-text text-muted mb-0">{products.description}</p>
                                        <p className="text-muted mt-3">NT$ {products.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <nav className="d-flex justify-content-center">
                    <Pagination pagination={pagination} changPage={getProduct} />
                </nav>
            </div>
        </>
    )
}
export default Products;