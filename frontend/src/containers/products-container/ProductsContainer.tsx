import {Product} from "../../types/Product";
import {useState} from "react";

function mockCreateProduct(id: string,
                           name: string,
                           description: string,
                           price: number): Product {
    return {id, name, description, price};
}


export default function ProductsContainer({children = null}: any) {
    const [products, setProducts] = useState([]);

    return (
        <>
            {children}
        </>
    );
}
