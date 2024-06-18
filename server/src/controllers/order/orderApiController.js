import orderController from "./orderController.js";
async function sentOrder(req, res) {
    const orderData = req.body;
    const { error, data } = await orderController.create(orderData);
    if (error) {
        res.status(500).json({ error });
    } else {
        res.status(201).json({ data });
    }
}
async function getOrder(req, res) {
    
}
export default { sentOrder , getOrder};
