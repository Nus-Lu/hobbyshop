import { useOutletContext, Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { Input } from "../../components/FormElements";
function Checkout() {
    const { cartData, getCart } = useOutletContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
    });
    const onSubmit = (data) => {
        console.log(errors);
        console.log(data);
    };
    return (
        <div className='bg-light pt-5 pb-7'>
            <div className='container'>
                <div className='row justify-content-center flex-md-row flex-column-reverse'>
                    <form className='col-md-6' onSubmit={handleSubmit(onSubmit)}>
                        <div className='bg-white p-4'>
                            <h4 className='fw-bold'>外送資料</h4>
                            <div className='mb-2'>
                                <Input
                                    id='name'
                                    labelText='收件人姓名'
                                    type='name'
                                    errors={errors}
                                    register={register}
                                    rules={{
                                        required: '姓名必填',
                                        maxlength: {
                                            value: 10,
                                            message: '姓名不能超過10字'
                                        }
                                    }}
                                    className='form-control rounded-0 mt-1' placeholder='Name'>
                                </Input>
                            </div>
                            <div className='mb-2'>
                                <Input
                                    id='email'
                                    labelText='Email'
                                    type='email'
                                    errors={errors}
                                    register={register}
                                    rules={{
                                        required: 'Email必填',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Email格式不正確'
                                        }
                                    }}
                                    className='form-control rounded-0 mt-1' placeholder='example@gmail.com'>
                                </Input>
                            </div>

                            <div className='mb-2'>
                                <Input id='tel'
                                    labelText='聯絡電話'
                                    type='tel'
                                    errors={errors}
                                    register={register}
                                    rules={{
                                        required: '電話必填',
                                        pattern: {
                                            value: /^\d{6,12}$/,
                                            message: '電話號碼格式不正確，請輸入6到12位數字'
                                        }
                                    }}
                                    className='form-control rounded-0 mt-1' placeholder='0933-123-123'>
                                </Input>
                            </div>
                            <div className='mb-2'>
                                <Input id='address'
                                    labelText='運送地址'
                                    type='address'
                                    errors={errors}
                                    register={register}
                                    rules={{ required: '地址必填', }}
                                    className='form-control rounded-0 mt-1' placeholder='Address'>
                                </Input>
                            </div>
                        </div>
                        <div className='d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100'>
                            <Link className='text-dark mt-md-0 mt-3' to='/products'>
                                <i className='bi bi-chevron-left me-2'></i> 繼續選購
                            </Link>
                            <button type='submit' className='btn btn-dark py-3 px-7 rounded-0'>確認下單</button>
                        </div>
                    </form>
                    <div className='col-md-4'>
                        <div className='border p-4 mb-4'>
                            <h4 className='mb-4'>選購餐點</h4>
                            {cartData?.carts?.map((item) => {
                                return (
                                    <div className='d-flex' key={item.id}>
                                        <img src={item.product.imageUrl} alt='' className='me-2' style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                                        <div className='w-100'>
                                            <div className='d-flex justify-content-between fw-bold'>
                                                <p className='mb-0'>{item.product.title}</p>
                                                <p className='mb-0'>x{item.qty}</p>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <p className='text-muted mb-0'>
                                                    <small>NT$ {item.product.price}</small>
                                                </p>
                                                <p className='mb-0'>NT$ {item.final_total}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className='d-flex justify-content-between mt-4'>
                                <p className='mb-0 h4 fw-bold'>Total</p>
                                <p className='mb-0 h4 fw-bold'>NT$ {cartData.final_total}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Checkout;