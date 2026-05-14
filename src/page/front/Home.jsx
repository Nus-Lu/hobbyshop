import { useEffect, useState } from "react";
import api from "../../api/api";
import { useLoading } from "../LoadingContext";
import { Link } from "react-router-dom";
function Home() {
    const [products, setProducts] = useState([]);
    const { showLoading, hideLoading } = useLoading();
    const getProduct = async () => {
        showLoading("請稍後...");
        try {
            const productResponse = await api.get(`/v2/api/${import.meta.env.VITE_API_PATH}/products/all`);
            setProducts(productResponse.data.products);
        } catch (error) {
            console.log(error);

        } finally {
            hideLoading();
        }
    };
    useEffect(() => {
        getProduct();
    }, []);
    // unit
    const recommendProducts = products.filter(
        item => item.unit === "01"
    );
    // MG 
    const mgProducts = products.filter(
        item => item.category === "MG"
    );
    return (
        <>
            <div className="container py-5">
                <div className="row align-items-center flex-md-row-reverse">
                    <div className="col-md-6">
                        <img src="https://images.unsplash.com/photo-1526038335545-4b96864eaee7?auto=format&fit=crop&w=1867&q=80" alt="" className="img-fluid rounded" />
                    </div>
                    <div className="col-md-6 mt-4 mt-md-0">
                        <h1 className="fw-bold display-5">Gunpla Hobby Shop</h1>
                        <p className="text-muted mt-3 fs-5">
                            專注於鋼彈模型、組裝模型與收藏模型，
                            帶給你最完整的模型體驗。
                        </p>
                        <Link to="/products" className="btn btn-dark rounded-0 px-4 mt-3" >
                            開始選購
                        </Link>
                    </div>

                </div>
            </div>
            {/* unit */}
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">推薦商品</h2>
                    <Link to="/products" className="text-dark" >
                        查看更多
                    </Link>
                </div>
                <div className="row">
                    {recommendProducts.slice(0, 4).map((item) => (
                        <div className="col-md-3 col-sm-6 mb-4" key={item.id}>
                            <div className="card h-100 border-0 shadow-sm">
                                <img
                                    src={item.imageUrl}
                                    className="card-img-top"
                                    alt={item.title}
                                    style={{
                                        height: "320px",
                                        objectFit: "cover"
                                    }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <p className="text-muted mb-1">
                                        {item.category}
                                    </p>
                                    <h5 className="card-title">
                                        {item.title}
                                    </h5>
                                    <p className="text-muted small flex-grow-1">
                                        {item.description}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <p className="mb-0 fw-bold">
                                            NT$ {item.price}
                                        </p>
                                        <Link to={`/product/${item.id}`} className="btn btn-outline-dark btn-sm rounded-0">
                                            立即購買
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* MG */}
            <div className="bg-light py-5">
                <div className="container">
                    <h2 className="fw-bold mb-4">MG 系列商品</h2>
                    <div className="row">
                        {mgProducts.slice(0, 4).map((item) => (
                            <div className="col-md-3 col-sm-6 mb-4" key={item.id} >
                                <div className="card border-0 h-100">
                                    <img
                                        src={item.imageUrl}
                                        className="card-img-top"
                                        alt={item.title}
                                        style={{
                                            height: "280px",
                                            objectFit: "cover"
                                        }}
                                    />
                                    <div className="card-body px-0">
                                        <h5>
                                            {item.title}
                                        </h5>
                                        <p className="text-muted small">
                                            {item.content}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="mb-0 fw-bold">
                                                NT$ {item.price}
                                            </p>
                                            <Link to={`/product/${item.id}`} className="btn btn-dark btn-sm rounded-0" >
                                                立即購買
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container py-7">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h2 className="fw-bold">
                            關於我們
                        </h2>
                        <p className="text-muted mt-4 lh-lg">
                            我們專注於鋼彈模型與組裝模型收藏，
                            提供最新商品、熱門模型與經典系列，
                            希望每位模型玩家都能找到屬於自己的收藏。
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-dark text-white py-7">
                <div className="container text-center">
                    <h2 className="fw-bold">
                        開始你的模型收藏
                    </h2>
                    <p className="mt-3">
                        探索更多熱門鋼彈模型與限定商品
                    </p>
                    <Link to="/products" className="btn btn-light rounded-0 mt-3 px-4">
                        前往商品列表
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Home;