import { abi, address } from "../constants";
import { useState } from "react";
import { ethers } from "ethers";

const Products = () => {
    const [products, setProducts] = useState();

    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    async function getProduct() {
        if (typeof window.ethereum !== "undefined") {
            requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log(await signer.getAddress());

            const contract = new ethers.Contract(address, abi, provider);
            try {
                const data = await contract.getProducts();
                console.log("data: ", data);
                setProducts(data);
            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }

    if (products == null) {
        getProduct();
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "10%",
                    color: "grey.500",
                }}
            >
                <div class="lds-roller"></div>
            </div>
        );
    }
    return (
        <table
            style={{
                width: "80%",
                margin: "auto",
                marginTop: "5%",
                minWidth: 650,
            }}
        >
            <tr>
                <td>Sr. No.</td>
                <td align="left">Product Name</td>
                <td>Product ID</td>
                <td style={{ width: "40%" }}>Description</td>
                <td>Price</td>
                <td>Temp.</td>
            </tr>

            {ProductsList.map((row, iterator) => (
                <tr
                    key={iterator}
                    style={{
                        border: 0,
                    }}
                >
                    <td>{iterator + 1}</td>
                    <td style={{ textAlign: "left" }}>{row[1]}</td>
                    <td>{parseInt(row.id)}</td>
                    <td>{row.description}</td>
                    <td>{row.price}</td>
                    <td>{row.reqtemp}</td>
                </tr>
            ))}
        </table>
    );
};

export default Products;
