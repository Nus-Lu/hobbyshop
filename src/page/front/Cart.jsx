import { useOutletContext } from "react-router-dom";
function Cart() {
    const { cartData } = useOutletContext();
    console.log(cartData);//這裡是5 但map不出商品
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 bg-white py-5" style={{ minHeight: "calc(100vh - 56px - 76px)" }}>
                    <div className="d-flex justify-content-between">
                        <h2 className="mt-2">購物車</h2>
                    </div>
                    {!cartData?.carts?.length ? (
                        <p className="text-center mt-5">購物車是空的</p>
                    ) : (cartData?.carts?.map((item) => {
                        return (
                            <div className="d-flex mt-4 bg-light" key={item.id}>
                                <img
                                    className="object-cover"
                                    src={item.product.imageUrl}
                                    alt=""
                                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                />

                                <div className="w-100 p-3 position-relative">
                                    <p className="mb-0 fw-bold">{item.product.title}</p>
                                    <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
                                        {item.product.description}
                                    </p>

                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <p className="mb-0 ms-auto">NT${item.total}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    }))}
                    <table className="table mt-4 text-muted">
                        <tbody>
                            <tr>
                                <th scope="row" className="border-0 px-0 font-weight-normal">折扣</th>
                                <td className="text-end border-0 px-0">NT$24,000</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between mt-4">
                        <p className="mb-0 h4 fw-bold">總金額</p>
                        <p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
                    </div>
                    <button type="button" className="btn btn-dark w-100 rounded-3 py-3 mt-4">確認結帳&ensp;<i className="bi bi-cart-check"></i></button>

                </div>
            </div>
        </div>
    );
}
export default Cart;