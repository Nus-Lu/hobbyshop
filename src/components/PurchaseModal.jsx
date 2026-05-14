function PurchaseModal({ closedModal, tempOrder }) {
    return (
        <div
            className="modal fade"
            id="PurchaseModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {/* Header */}
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">
                            訂單詳細資訊
                        </h1>

                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={closedModal}
                        />
                    </div>
                    {/* Body */}
                    <div className="modal-body">

                        {/* 使用者資訊 */}
                        <div className="mb-4">
                            <h5>使用者資訊</h5>
                            <p>姓名：{tempOrder?.user?.name}</p>
                            <p>Email：{tempOrder?.user?.email}</p>
                            <p>電話：{tempOrder?.user?.tel}</p>
                            <p>地址：{tempOrder?.user?.address}</p>
                        </div>

                        {/* 訂單資訊 */}
                        <div className="mb-4">
                            <h5>訂單資訊</h5>
                            <p>訂單編號：{tempOrder?.id}</p>
                            <p>
                                總金額：
                                NT$ {tempOrder?.total}
                            </p>
                            <p>
                                付款狀態：
                                {tempOrder?.is_paid ? "已付款" : "未付款"}
                            </p>
                        </div>

                        {/* 商品列表 */}
                        <div>
                            <h5>商品列表</h5>

                            {
                                tempOrder?.products &&
                                Object.values(tempOrder.products).map((item) => (
                                    <div
                                        key={item.id}
                                        className="border rounded p-2 mb-2"
                                    >
                                        <p>商品名稱：{item.product.title}</p>
                                        <p>數量：{item.qty}</p>
                                        <p>單價：NT$ {item.final_total}</p>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={closedModal}
                        >
                            關閉
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default PurchaseModal;