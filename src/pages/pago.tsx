import React, { useState } from "react";
import "../styles/pago.css";

const PaymentPage: React.FC = () => {
    const [formErrors, setFormErrors] = useState({
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
        name: "",
    });

    const validateForm = (field: string, value: string) => {
        let error = "";
        switch (field) {
            case "cardNumber":
                if (!/^\d{16}$/.test(value)) {
                    error = "El número de tarjeta debe tener 16 dígitos.";
                }
                break;
            case "expiryMonth":
                if (!/^(0[1-9]|1[0-2])$/.test(value)) {
                    error = "El mes debe estar entre 01 y 12.";
                }
                break;
            case "expiryYear":
                if (!/^\d{2}$/.test(value)) {
                    error = "El año debe tener 2 dígitos.";
                }
                break;
            case "cvv":
                if (!/^\d{3,4}$/.test(value)) {
                    error = "El CVV debe tener 3 o 4 dígitos.";
                }
                break;
            case "name":
                if (value.trim() === "") {
                    error = "El nombre no puede estar vacío.";
                }
                break;
            default:
                break;
        }
        setFormErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        validateForm(id, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Verificar si hay errores pendientes
        const hasErrors = Object.values(formErrors).some((error) => error !== "");
        if (hasErrors) {
            alert("Por favor, corrige los errores en el formulario.");
            return;
        }

        alert("Pago realizado con éxito.");
    };

    return (
        <div className="payment-page">
            <h1 className="title">Elige tu método de pago preferido:</h1>

            <div className="container">
                <p className="text"></p>

                {/* Botón de PayPal */}
                <div id="paypal-button-container" style={{ marginTop: "20px" }}></div>

                <h2 className="subtitle"></h2>
                <div className="payment-options">
                    <button className="pay-option">
                        <img src="https://cdn.worldvectorlogo.com/logos/google-play-5.svg" alt="Google Pay" />
                        Google Pay
                    </button>
                    <button className="pay-option">
                        <img src="https://cdn.worldvectorlogo.com/logos/apple-pay-2.svg" alt="Apple Pay" />
                        Apple Pay
                    </button>
                    <button className="pay-option">
                        <img src="https://cdn.worldvectorlogo.com/logos/paypal-pure-.svg" alt="PayPal" />
                        PayPal
                    </button>
                </div>

                <h2 className="subtitle">O paga con tarjeta de crédito</h2>
                <form className="credit-card-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="cardNumber">Número de tarjeta:</label>
                        <input
                            type="text"
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            maxLength={16}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.cardNumber && <p className="error">{formErrors.cardNumber}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="expiryMonth">Fecha de vencimiento:</label>
                        <div className="expiry-select">
                            <select
                                id="expiryMonth"
                                onChange={(e) => handleInputChange({ target: { id: "expiryMonth", value: e.target.value } })}
                                required
                            >
                                <option value="">MM</option>
                                {[...Array(12)].map((_, index) => (
                                    <option key={index + 1} value={String(index + 1).padStart(2, "0")}>
                                        {String(index + 1).padStart(2, "0")}
                                    </option>
                                ))}
                            </select>
                            <span>/</span>
                            <select
                                id="expiryYear"
                                onChange={(e) => handleInputChange({ target: { id: "expiryYear", value: e.target.value } })}
                                required
                            >
                                <option value="">AA</option>
                                {[...Array(10)].map((_, index) => {
                                    const year = (new Date().getFullYear() + index).toString().slice(-2);
                                    return (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        {formErrors.expiryMonth && <p className="error">{formErrors.expiryMonth}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="cvv">CVV:</label>
                        <input
                            type="text"
                            id="cvv"
                            placeholder="123"
                            maxLength={4}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.cvv && <p className="error">{formErrors.cvv}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nombre en la tarjeta:</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Nombre completo"
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.name && <p className="error">{formErrors.name}</p>}
                    </div>
                    <button type="submit" className="pay-button">
                        Realizar pago
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
