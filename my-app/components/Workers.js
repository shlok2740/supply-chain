import { abi, address } from "../constants";
import { useState } from "react";
import { ethers } from "ethers";

const Workers = () => {
    const [workers, setWorkers] = useState();

    async function getWorker() {
        if (typeof window.ethereum !== "undefined") {
            requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log(await signer.getAddress());

            const contract = new ethers.Contract(address, abi, provider);
            let workerData = null;
            try {
                workerData = await contract.getWorkersList();
                console.log("data: ", workerData);
                setWorkers(workerData);
            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }

    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    if (workers == null) {
        getWorker();
        return (
            <div style={{ textAlign: "center", padding: "10%" }}>
                <div class="lds-roller"></div>
            </div>
        );
    }

    return (
        <div>
            <table
                style={{
                    width: "50%",
                    margin: "auto",
                    marginTop: "5%",
                    minWidth: 650,
                    arialabel: "simple table",
                }}
            >
                <tr>
                    <td>Sr. No.</td>
                    <td style={{ textAlign: "left" }}>Name</td>
                    <td style={{ textAlign: "right" }}>WorkerID</td>
                </tr>
                {workersList.map((row, iterator) => (
                    <tr
                        key={iterator}
                        style={{
                            border: 0,
                        }}
                    >
                        <td>{iterator + 1}</td>
                        <td style={{ textAlign: "left" }}>{row[0]}</td>
                        <td style={{ textAlign: "right" }}>
                            {parseInt(row[1])}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default Workers;
