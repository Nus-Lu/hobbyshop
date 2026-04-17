import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { useLoading } from "../LoadingContext";
function ProductDetail() {
    const [product, setProduct] = useState({});//商品
    const { showLoading, hideLoading } = useLoading();//loading
    const { id } = useParams();//取ID
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
    return (
        <div className="container">
            <div style={{ minHeight: '400px', backgroundImage: `url(${product.imageUrl})`, backgroundPosition: 'center center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}></div>
            <div className="row justify-content-between mt-4 mb-7">
                <div className="col-md-7">
                    <h2 className="mb-0">{product.title}</h2>
                    <p className="fw-bold">NT${product.price?.toLocaleString()}</p>
                    <p>{product.description}</p>
                    <div className="my-4">
                        {product.imagesUrl?.map((url, index) => (
                            <img key={index} src={url} alt="" className="img-fluid mt-4" />
                        ))}
                    </div>
                    <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
                        <div className="card border-0">
                            <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                <div className="d-flex justify-content-between align-items-center pe-1">
                                    <h4 className="mb-0">
                                        Lorem ipsum
                                    </h4>
                                    <i className="bi bi-dash"></i>
                                </div>
                            </div>
                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="card-body pb-5">
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                                </div>
                            </div>
                        </div>
                        <div className="card border-0">
                            <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                <div className="d-flex justify-content-between align-items-center pe-1">
                                    <h4 className="mb-0">
                                        Lorem ipsum
                                    </h4>
                                    <i className="bi bi-plus"></i>
                                </div>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="card-body pb-5">
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                                </div>
                            </div>
                        </div>
                        <div className="card border-0">
                            <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingThree" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                <div className="d-flex justify-content-between align-items-center pe-1">
                                    <h4 className="mb-0">
                                        Lorem ipsum
                                    </h4>
                                    <i className="bi bi-plus"></i>
                                </div>
                            </div>
                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div className="card-body pb-5">
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="input-group mb-3 border mt-3">
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon1">
                                <i className="bi bi-dash"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control border-0 text-center my-auto shadow-none" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon2">
                                <i className="bi bi-plus"></i>
                            </button>
                        </div>
                    </div>
                    <a href="./checkout.html" className="btn btn-dark btn-block rounded-0 py-3">Lorem ipsum</a>
                </div>
            </div>
        </div>
    )
}
export default ProductDetail;