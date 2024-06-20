import { createProduct } from "../../utils/fetch";
import "./CreateProduct.css"
const CreateProduct = ({onCreate})=>{

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const result = await createProduct(data);
        onCreate(result);
    };
    return (
        <form action="" style={{display:"flex", flexDirection:"column"}} className="create-project" onSubmit={handleSubmit}>

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
            <option value=""> choose type</option>
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