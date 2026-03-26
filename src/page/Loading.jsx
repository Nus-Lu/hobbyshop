// LoadingModal.jsx
export default function LoadingModal({ show, message = "Loading..." }) {
    if (!show) return null;
    return (
        <div className="modal-backdrop show d-flex justify-content-center align-items-center loading">
            <div className="text-center text-light">
                <div className="spinner-border text-light mb-2 spinner-s" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div>{message}</div>
            </div>
        </div>
    );
}