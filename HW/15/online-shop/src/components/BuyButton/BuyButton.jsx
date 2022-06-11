import * as React from "react";

export default function BuyButton({item, handleClose, addOrders}) {
    return (
        <button key={item.id}
                onClick={(event) => {
                    event.stopPropagation();
                    handleClose();
                    addOrders(item);
                }
                }
                style={{
                    padding: "12px 18px",
                    backgroundColor: "#f0c041",
                    color: "#000",
                    outline: "none",
                    border: "none",
                    cursor: "pointer"
                }}>
            Add to Card
        </button>)
}
