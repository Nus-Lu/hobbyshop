import React from "react";
function ConfirmButton({ message = "確定要執行此操作嗎？", onConfirm, children, className }) {
    const handleClick = () => {
        if (window.confirm(message)) {
            onConfirm();
        }
    };
    return (
        <button type="button" className={className} onClick={handleClick}>
            {children}
        </button>
    );
}
export default ConfirmButton;