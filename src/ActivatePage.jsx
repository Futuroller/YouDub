import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiRequest from "./api/apiRequest";

const ActivatePage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("Загрузка...");
    const activated = useRef(false);

    useEffect(() => {
        if (!token || activated.current) return;
        activated.current = true;

        apiRequest(`/auth/activate/${token}`, "GET")
            .then((response) => {
                if (response.status === 200) {
                    setStatus("✅ Аккаунт успешно активирован!");
                    setTimeout(() => navigate("/auth/login"), 3000);
                } else {
                    setStatus("❌ Ошибка при активации аккаунта!");
                }
            })
            .catch((error) => {
                console.error("Ошибка активации:", error);
                setStatus("❌ Ошибка при активации аккаунта!");
            });
    }, [token]);

    return (
        <div style={{ textAlign: "center", padding: "50px", color: "white" }}>
            <h2>{status}</h2>
        </div>
    );
};

export default ActivatePage;