import { useOutletContext,Link } from "react-router-dom";
import { useLoading } from "../LoadingContext";
import { useState } from "react";
import api from "../../api/api";

function Cart() {
    const { showLoading, notify } = useLoading();//loading
    const { cartData, getCart } = useOutletContext();
    const [loadingItems, setLoadingItems] = useState([]); // State to track loading items
    const removeCartItem = async (id) => {
        showLoading("移除中...");
        try {
            const res = await api.delete(`/v2/api/${import.meta.env.VITE_API_PATH}/cart/${id}`);
            console.log(res);
            getCart(); // Call getCart to update the cart data after removal
        } catch (error) {
            console.error("Error removing cart item:", error);
        } finally {
            notify("已移除商品");
        }
    }
    const updateCartItem = async (item, qty) => {
        const data = {
            "data": {
                "product_id": item.product_id,
                "qty": qty
            }
        }
        showLoading("更新中...");
        setLoadingItems([...loadingItems, item.id]); // Add item to loading state
        try {
            const res = await api.put(`/v2/api/${import.meta.env.VITE_API_PATH}/cart/${item.id}`, data);
            console.log(res);
            getCart();
        } catch (error) {
            console.error("Error updating cart item:", error);
        } finally {
            setLoadingItems(loadingItems.filter((loadObject) => loadObject !== item.id)); // Remove item from loading state
            notify("已更新商品數量");
        }
    }
    return (
        <div className="container">
            <div className="row justify-content-center ">
                <div className="col-md-6 bg-white py-5 w-75" style={{ minHeight: "calc(100vh - 56px - 76px)" }}>
                    <div className="d-flex justify-content-between">
                        <h2 className="mt-2">購物車</h2>
                    </div>
                    {!cartData?.carts?.length ? (
                        <p className="text-center mt-5">購物車是空的</p>
                    ) : (cartData?.carts?.map((item) => {
                        return (
                            <div className="d-flex mt-4 bg-light" key={item.id}>
                                <img className="object-cover" src={item.product.imageUrl}  alt={item.product.title}  style={{ width: "120px", height: "120px", objectFit: "cover" }}/>
                                <div className="w-100 p-3 position-relative">
                                    <button onClick={() => removeCartItem(item.id)} className="position-absolute top-0 end-0 btn btn-link text-danger">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                    <p className="mb-0 fw-bold">{item.product.title}</p>
                                    <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
                                        {item.product.description}
                                    </p>
                                    <div className='d-flex justify-content-end align-items-center w-50 ms-auto'>
                                        <div className='input-group w-50 align-items-center'>
                                            <select name='' className='form-select' id='' value={item.qty} disabled={loadingItems.includes(item.id)} onChange={(e) => { updateCartItem(item, e.target.value * 1); }} >
                                                {[...new Array(20)].map((i, num) => {
                                                    return (
                                                        <option value={num + 1} key={num}>{num + 1}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end align-items-center w-50 ms-auto">
                                        <p className="mb-0 ms-auto">NT${item.total}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    }))}

                    <div className="d-flex justify-content-between mt-4">
                        <p className="mb-0 h4 fw-bold">總金額</p>
                        <p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
                    </div>
                    <Link className="btn btn-dark w-100 rounded-3 py-3 mt-4" to="/checkout">確認結帳&ensp;<i className="bi bi-cart-check"></i></Link>
                </div>
            </div>
        </div>
    );
}
export default Cart;