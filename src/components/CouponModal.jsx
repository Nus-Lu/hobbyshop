import { useEffect, useState } from "react";
import ConfirmButton from "../page/ConfirmButton";
import api from "../api/api";
import { useLoading } from "../page/LoadingContext";
function CouponModal({ closedModal, getCoupons, type, tempCoupon, timestampToDateString }) {
    const { showLoading, hideLoading } = useLoading();//loading
    // YYYY-MM-DD → Unix timestamp
    const dateStringToTimestamp = (dateString) => {
        const date = new Date(dateString);
        return Math.floor(date.getTime() / 1000);
    };
    const getTodayDate = () => {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, "0");
        const d = String(today.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    };
    // Add Product
    const defaultData = {
        title: '',
        is_enabled: 1,
        percent: 80,
        due_date: 0,
        code: '',
    };
    const [date, setDate] = useState("");
    const [tempData, setTempData] = useState(defaultData);//初始化
    useEffect(() => {
        const timer = setTimeout(() => {
            if (type === 'create') {
                const todayStr = getTodayDate();
                setTempData({
                    ...defaultData,
                    due_date: dateStringToTimestamp(todayStr),
                });
                setDate(todayStr);
            } else if (type === 'edit') {
                const dueDateStr = timestampToDateString(tempCoupon.due_date);
                setTempData({
                    ...tempCoupon,
                    due_date: tempCoupon.due_date,
                });
                setDate(dueDateStr);
            }
        }, 0);
        return () => clearTimeout(timer);
    }, [type, tempCoupon]);

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
            let apiAdress = `/v2/api/${import.meta.env.VITE_API_PATH}/admin/coupon`;
            let method = 'post';
            if (type === 'edit') {
                apiAdress = `/v2/api/${import.meta.env.VITE_API_PATH}/admin/coupon/${tempCoupon.id}`;
                method = 'put';
            }
            const res = await api[method](apiAdress, { data: tempData });
            console.log(res);
            hideLoading();
            getCoupons();
            closedModal();
        } catch (error) {
            console.log(error);
        }
    }
    // Add Product End
    return (
        <div className="modal fade" id="CouponModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='exampleModalLabel'>{type === 'edit' ? `編輯 ${tempData.title}` : '建立憂患卷'}</h1>
                        <button type='button' className='btn-close' aria-label='Close' onClick={closedModal} />
                    </div>
                    <div className='modal-body'>
                        <div className='mb-2'>
                            <label className='w-100' htmlFor='title'>
                                標題<input type='text' id='title' placeholder='請輸入標題' name='title' className='form-control mt-1' onChange={handleChange} value={tempData.title} />
                            </label>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 mb-2'>
                                <label className='w-100' htmlFor='percent'>
                                    折扣（%）<input type='text' name='percent' id='percent' placeholder='請輸入折扣（%）' className='form-control mt-1' onChange={handleChange} value={tempData.percent} />
                                </label>
                            </div>
                            <div className='col-md-6 mb-2'>
                                <label className='w-100' htmlFor='due_date'>
                                    到期日<input type='date' id='due_date' name='due_date' placeholder='請輸入到期日' className='form-control mt-1' onChange={(e) => {
                                        const newDateStr = e.target.value;
                                        setDate(newDateStr); // 更新 input 顯示
                                        setTempData({
                                            ...tempData,
                                            due_date: dateStringToTimestamp(newDateStr), // 存回 timestamp
                                        });
                                    }} value={date} />
                                </label>
                            </div>
                            <div className='col-md-6 mb-2'>
                                <label className='w-100' htmlFor='code'>
                                    優惠碼<input type='text' id='code' name='code' placeholder='請輸入優惠碼' className='form-control mt-1' onChange={handleChange} value={tempData.code} />
                                </label>
                            </div>
                        </div>
                        <label className='form-check-label' htmlFor='is_enabled'>
                            <input className='form-check-input me-2' type='checkbox' id='is_enabled' name='is_enabled' onChange={handleChange} checked={Boolean(tempData.is_enabled)} />是否啟用
                        </label>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' onClick={closedModal}>關閉</button>
                        <button type='button' className='btn btn-primary' onClick={submit}>儲存</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CouponModal;