import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate()
    const [data, setData] = useState({ username: '', password: '', });//存登入寫的帳號密碼
    const [loginState, setLoginState] = useState()//存登入狀態
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const submit = async () => {
        try {
            const res = await axios.post(`/v2/admin/signin`, data);
            const { token, expired, success } = res.data;//解構取token
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            if (success) { navigate('/admin/products') }//登入成功後轉址
        } catch (error) {
            setLoginState(error.response.data);
        }

    };
    return (
        <div className="login-page d-flex justify-content-center align-items-center">
            <div className="login-card row g-0">
                <div className="col-md-6 left-panel d-flex flex-column justify-content-center align-items-start">
                    <h2 className="brand-title">測試封裝與其他服務</h2>
                    <p className="brand-desc">The most popular peer to peer lending at SEA</p>
                    <button className="btn btn-light btn-sm mt-3">Read More</button>
                </div>
                <div className="col-md-6 right-panel d-flex flex-column justify-content-center">
                    <div className="form-wrapper">
                        <h4 className="mb-2">歡迎使用-</h4>
                        <p className="text-muted mb-4">後台管理</p>
                        <div className={`alert alert-danger p-2 ${loginState.message ? 'd-block' : 'd-none'}`}>{loginState.message}</div>
                        <input type="text" className="form-control mb-3" name="username" placeholder="username" onChange={handleChange} />
                        <input type="password" className="form-control mb-3" name="password" placeholder="Password" onChange={handleChange} />
                        <button type="button" className="btn btn-primary w-100 mb-2" onClick={submit}>登入</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;