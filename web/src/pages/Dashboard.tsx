import { useContext, useEffect, useState } from "react";
import { ProductInterface } from "../interfaces/interfaces";
import { getProducts } from "../api/APIService";
import { AuthContext } from "../context/AuthContext";
import history from "../history";

const Dashboard = () => {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const { sessionToken, isLogged } = useContext(AuthContext);

    if (!isLogged()) {
        history.push("/login");
        return;
    }

    useEffect(() => {
        getProducts(sessionToken!).then(({ products, errorMsg }) => {
            setErrorMsg(errorMsg ?? null);
            setProducts(products);
        });
    }, []);

    return (
        <>
            {errorMsg ? (
                <span>{errorMsg}</span>
            ) : (
                <div>
                    <h1>Data from API:</h1>
                    <ul>
                        {products.map((item) => (
                            <li key={item.id}>{item.nome}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Dashboard;
