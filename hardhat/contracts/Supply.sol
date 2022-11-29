// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

contract Supply {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    uint256 product_id = 0;
    uint256 worker_id = 0;

    struct Product {
        uint256 id;
        string name;
        string price;
        string description;
        string reqtemp;
        uint256 timestamp;
    }

    struct Worker {
        string name;
        uint256 id;
        uint256 timestamp;
    }


    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    Product[] public products_list;
    Product private productInfo;
    Worker[] public workers_list;
    Worker private workerInfo;

    mapping(uint256 => Product) public products;
    mapping(uint256 => Worker) public workers;

    function setWorker(string memory name) public payable {
        workerInfo = Worker(name, worker_id, block.timestamp);
        workers[worker_id] = workerInfo;
        workers_list.push(workerInfo);
        worker_id++;
    }

    function AddProduct(
        string memory name,
        string memory price,
        string memory description,
        string memory reqtemp
    ) public payable {
        productInfo = Product(
            product_id,
            name,
            price,
            description,
            reqtemp,
            block.timestamp
        );
        products[product_id] = (productInfo);
        products_list.push(productInfo);
        product_id++;
    }


    function getWorkersList() public view returns (Worker[] memory) {
        return workers_list;
    }

    function getProducts() public view returns (Product[] memory) {
        return products_list;
    }
}
