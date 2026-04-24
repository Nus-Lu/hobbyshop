import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import api from "../../api/api";
import { useLoading } from "../LoadingContext";
import SliderImport from "react-slick";
const Slider = SliderImport.default || SliderImport;
function ProductDetail() {
    const [product, setProduct] = useState({});//商品
    const { showLoading, hideLoading, notify } = useLoading();//loading
    const [cartQty, setCartQty] = useState(1);//購物車數量
    const { id } = useParams();//取ID
    const { getCart } = useOutletContext();//取getCart
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const getProduct = async (id) => {
        showLoading("商品詳細載入中...");// 開loading
        try {
            const productResponse = await api.get(`/v2/api/${import.meta.env.VITE_API_PATH}/product/${id}`);
            setProduct(productResponse.data.product);
        } catch (error) {
            console.log(error);
        } finally {
            hideLoading();// 關loading
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            getProduct(id);//打api
        }, 0);
        return () => clearTimeout(timer);
    }, [id]);

    const addToCart = async () => {
        showLoading("請稍後...");
        const Data = { data: { product_id: product.id, qty: cartQty } };
        try {
            await api.post(`/v2/api/${import.meta.env.VITE_API_PATH}/cart`, Data);
            notify("已加入購物車");
            getCart();
            hideLoading();
        } catch (error) {
            console.log(error);
            notify("加入購物車失敗");
            hideLoading();
        }
    };
    return (
        <div className="container">
            <div style={{ minHeight: '400px', backgroundImage: `url(${product.imageUrl})`, backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
            <div className="row justify-content-between mt-4 mb-7">
                <div className="col-md-7">
                    <h2 className="mb-0">{product.title}</h2>
                    <p className="fw-bold">NT${product.price?.toLocaleString()}</p>
                    <p>{product.content}</p>
                    <div className="Slider">
                        {product.imagesUrl?.length > 0 && (
                            <Slider {...settings}>
                                {product.imagesUrl.map((url, index) => (
                                    <div className="my-4 wrap" key={index}>
                                        <img src={url} alt="" className="img-fluid mt-4" />
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                    <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
                        <div className="card border-0">
                            <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                <div className="d-flex justify-content-between align-items-center pe-1">
                                    <h4 className="mb-0">
                                        {product.category}
                                    </h4>
                                    <i className="bi bi-dash"></i>
                                </div>
                            </div>
                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="card-body pb-5">
                                    {product.description}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-4">
                    <div className="input-group mb-3 border  rounded-3 mt-3">
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" onClick={() => setCartQty((qty) => Math.max(qty - 1, 1))}>
                                <i className="bi bi-dash-lg"></i>
                            </button>
                        </div>
                        <span className="form-control border-0 text-center my-auto shadow-none">{cartQty}</span>
                        < input type="hidden" readOnly value={cartQty} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" onClick={() => setCartQty((qty) => qty + 1)}>
                                <i className="bi bi-plus-lg"></i>
                            </button>
                        </div>
                    </div>
                    <button type="button" className="btn btn-dark w-100 rounded-3 py-3" onClick={() => addToCart()}>Add to Cart&ensp;<i className="bi bi-cart-plus"></i></button>
                </div>
            </div>
        </div>
    )
}
export default ProductDetail;