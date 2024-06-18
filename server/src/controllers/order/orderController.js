import orderModel from "../../models/orderModel.js";



const create = async (orderData) => {
    try {
      const order = new orderModel(orderData);
      await order.save();
      return { error: null, data: order };
    } catch (error) {
      return { error: error.message, data: null };
    }
  };


  
  export default { create }