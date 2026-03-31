import { useEffect, useState, useContext } from "react";
import ConfirmButton from "../page/ConfirmButton";
import api from "../api/api";
import { useLoading } from "../page/LoadingContext";
import { MessageContext, handleSuccessMessage, handleFailMessage } from "../store/messageStore";
function ProductModal({ closedProductModal, getProduct, type, tempProduct }) {
    const { showLoading, hideLoading } = useLoading();//loading
    // Add Product
    const defaultData = { title: "", category: "", origin_price: 0, price: 0, unit: "", description: "", content: "", is_enabled: 0, imageUrl: "", imagesUrl: [], };
    const [tempData, setTempData] = useState(defaultData);//初始化
    // Edit Product
    const [, dispatch] = useContext(MessageContext);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (type === 'create') {
                setTempData({
                    ...defaultData,
                });
            } else if (type === 'edit') {
                setTempData({
                    ...defaultData,
                    ...tempProduct,
                });
            }
        }, 0);
        return () => clearTimeout(timer);
    }, [type, tempProduct]);
    const handleChange = (e) => {
        const { value, name } = e.target;
        if (['origin_price', 'price'].includes(name)) {
            setTempData({
                ...tempData,
                [name]: Number(value),
            })
        } else if (name === 'is_enabled') {
            setTempData({
                ...tempData,
                [name]: +e.target.checked,
            })
        } else {
            setTempData({
                ...tempData,
                [name]: value,
            })
        }
    }
    const submit = async () => {
        try {
            showLoading("更新中...");
            let apiAdress = `/v2/api/${import.meta.env.VITE_API_PATH}/admin/product`;
            let method = 'post';
            if (type === 'edit') {
                apiAdress = `/v2/api/${import.meta.env.VITE_API_PATH}/admin/product/${tempProduct.id}`;
                method = 'put';
            }
            const res = await api[method](apiAdress, { data: tempData });
            handleSuccessMessage(dispatch, res);
            getProduct();
        } catch (error) {
            handleFailMessage(dispatch, error);
        } finally {
            hideLoading();
            closedProductModal();
        }
    }
    // Add Product End
    return (
        <div className="modal fade" id="ProductModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='exampleModalLabel'>{type === 'edit' ? `編輯 ${tempData.title}` : '建立新商品'}</h1>
                        <button type='button' className='btn-close' aria-label='Close' onClick={closedProductModal} />
                    </div>
                    <div className='modal-body'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                {tempData.imageUrl && (
                                    <div className="mb-2 position-relative">
                                        <img src={tempData.imageUrl} alt="" className="img-fluid" />
                                        <ConfirmButton
                                            message="確定要刪除主圖嗎？"
                                            className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                            onConfirm={() => setTempData({ ...tempData, imageUrl: "" })}>刪除
                                        </ConfirmButton>
                                    </div>
                                )}
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='image'>輸入圖片網址
                                        <input type='text' name='imageUrl' id='image' placeholder='請輸入圖片連結' className='form-control' />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='customFile'>或 上傳圖片
                                        <input type='file' id='customFile' className='form-control' />
                                    </label>
                                </div>
                                {tempData.imagesUrl.map((img, idx) => img && (
                                    <div key={idx} className="position-relative mb-2">
                                        <img src={img} className="img-fluid" alt="" />
                                        <ConfirmButton
                                            message="確定要刪除這張圖片嗎？"
                                            className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                            onConfirm={() => {
                                                const newImages = [...tempData.imagesUrl];
                                                newImages.splice(idx, 1);
                                                setTempData({ ...tempData, imagesUrl: newImages });
                                            }}
                                        >
                                            刪除
                                        </ConfirmButton>
                                    </div>
                                ))}
                            </div>
                            <div className='col-sm-8'>
                                <pre>{JSON.stringify(tempData)}</pre>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='title'>標題
                                        <input type='text' id='title' name='title' placeholder='請輸入標題' className='form-control' onChange={handleChange} value={tempData.title} />
                                    </label>
                                </div>
                                <div className='row'>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='category'>分類
                                            <input type='text' id='category' name='category' placeholder='請輸入分類' className='form-control' onChange={handleChange} value={tempData.category} />
                                        </label>
                                    </div>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='unit'>單位
                                            <input type='unit' id='unit' name='unit' placeholder='請輸入單位' className='form-control' onChange={handleChange} value={tempData.unit} />
                                        </label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='origin_price'>原價
                                            <input type='number' id='origin_price' name='origin_price' placeholder='請輸入原價' className='form-control' onChange={handleChange} value={tempData.origin_price} />
                                        </label>
                                    </div>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='price'>售價
                                            <input type='number' id='price' name='price' placeholder='請輸入售價' className='form-control' onChange={handleChange} value={tempData.price} />
                                        </label>
                                    </div>
                                </div>
                                <hr />
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='description'>產品描述
                                        <textarea type='text' id='description' name='description' placeholder='請輸入產品描述' className='form-control' onChange={handleChange} value={tempData.description} />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='content'>說明內容
                                        <textarea type='text' id='content' name='content' placeholder='請輸入產品說明內容' className='form-control' onChange={handleChange} value={tempData.content} />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <div className='form-check'>
                                        <label className='w-100 form-check-label' htmlFor='is_enabled'>是否啟用
                                            <input type='checkbox' id='is_enabled' name='is_enabled' placeholder='請輸入產品說明內容' className='form-check-input' onChange={handleChange} checked={Boolean(tempData.is_enabled)} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' onClick={closedProductModal}>關閉</button>
                        <button type='button' className='btn btn-primary' onClick={submit}>儲存</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductModal;


