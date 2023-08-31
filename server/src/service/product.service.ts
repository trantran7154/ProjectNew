import productModel from "../models/product.model";

class Service {
    private message: string;
    private status: number;

    constructor(message: string, status: number) {
        this.message = message;
        this.status = status;
    }

    public async getAll() {
        try {
            const product = await productModel.find();

            this.setStatus(200);
            this.setMessage("OK");
            return product;
        } catch (error) {
            this.setStatus(500);
            this.setMessage("Connection error, please try again later !");
            return false;
        }
    }

    public async getId(params: any) {
        try {
            const { _id } = params;
            const product = await productModel.findById(_id)
            this.setStatus(200);
            this.setMessage("");
            return product;
        } catch (error) {
            this.setStatus(500);
            this.setMessage("Connection error, please try again later !");
            return false;
        }
    }

    public async editProduct(body: any, params: any) {
        try {
            const { _id } = params;
            const product = await productModel.findByIdAndUpdate(_id, body);

            this.setStatus(200);
            this.setMessage("Edit successful !");
            return product;
        } catch (error) {
            this.setStatus(500);
            this.setMessage("Connection error, please try again later !");
            return false;
        }
    }

    public async addProduct(body: any) {
        try {
            const product = await productModel.create(body);
            product.save();
            
            this.setStatus(200);
            this.setMessage("Add successful !");
            return product;
        } catch (error) {
            console.log(error);
            this.setStatus(500);
            this.setMessage("Connection error, please try again later !");
            return false;
        }
    }

    public async deleteProduct(params: any) {
        try {
            const { _id } = params;
            const product = await productModel.findByIdAndDelete(_id);
            
            this.setStatus(200);
            this.setMessage("Delete successful !");
            return product;
        } catch (error) {
            this.setStatus(500);
            this.setMessage("Connection error, please try again later !");
            return false;
        }
    }

    public getMessage = () => {
        return this.message
    }

    private setMessage = (message: string) => {
        this.message = message
    }

    public getStatus = () => {
        return this.status
    }

    private setStatus = (status: number) => {
        this.status = status
    }
}

export default new Service('', 0)