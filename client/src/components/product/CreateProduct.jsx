import { createProduct } from "../../utils/fetch";
import "./CreateProduct.css"
const CreateProduct = ({onCreate})=>{

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const name = e.target.product_name.value;
        const description = e.target.product_description.value;
        const model = e.target.product_model.value;
        const price = e.target.product_price.value;
        const type = e.target.product_type.value;
        const amount = e.target.product_amount.value;

        const data = {name,description,model,price,type,amount };
        console.log("name",data)
        const result = await createProduct(data);
        console.log("result",result)
        onCreate(result);
    }
    return (
        <form action="" className="create-project" onSubmit={handleSubmit}>

            <label htmlFor="name" >Name</label>
            <input type="text" name="name"/>

            <label htmlFor="description" >Description</label>
            <textarea name="description"></textarea>

            <label htmlFor="model" >Model</label>
            <input type="text" name="model"/>

            <label htmlFor="price" >Price</label>
            <input type="number" name="price"/>

            <label htmlFor="type" >Type</label>
            <select name="type" >
                <option value="mobile">Mobile</option>
                <option value="laptop">Laptop</option>
            </select>

            <label htmlFor="amount" >Stock</label>
            <input type="number" name="amount"/>

            <button type="submit">Create</button>
        </form>
    )
}
export default CreateProduct;