function DeleteModal({ closed, Product, Delete, ProductID }) {
    return (
        <div className='modal fade mt-5' id="DeleteModal" tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true' >
            <div className='modal-dialog'>
                <div className='modal-content'>
                    {/* <div className='modal-header bg-danger'>
                        <h1 className='modal-title text-white fs-5' id='exampleModalLabel'>刪除確認</h1>
                        <button type='button' className='btn-close' aria-label='Close' onClick={closed} />
                    </div> */}
                    <div className='modal-body'>是否確認刪除：{Product.title}？</div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' onClick={closed}>
                            取消
                        </button>
                        <button type='button' className='btn btn-danger' onClick={() => Delete(ProductID)}>
                            確認刪除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DeleteModal;