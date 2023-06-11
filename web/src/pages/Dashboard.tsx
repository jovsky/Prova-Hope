import { useEffect, useState } from "react";
import { ProductInterface } from "../interfaces/interfaces";
import { getProducts } from "../api/APIService";

const Dashboard = () => {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        getProducts().then(({ products, errorMsg }) => {
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
