import productController from './productController.js';

async function getAll(req, res) {
    const { error, data } = await productController.getAll();
    if (error) {
        res.status(500).json({ error });
    } else {
        res.json({ data });
    }
}

async function getById(req, res) {
    const id = req.params.id;
    const { error, data } = await productController.getById(id);
    if (error) {
        res.status(500).json({ error });
    } else {
        res.json({ data });
    }
}

async function create(req, res) {
    const productData = req.body;
    const { error, data } = await productController.create(productData);
    if (error) {
        res.status(500).json({ error });
    } else {
        res.status(201).json({ data });
    }
}

async function update(req, res) {
    const id = req.params.id;
    const productData = req.body;
    const { error, data } = await productController.update(id, productData);
    if (error) {
        res.status(500).json({ error });
    } else {
        res.json({ data });
    }
}

async function remove(req, res) {
    const id = req.params.id;
    const { error, data } = await productController.remove(id);
    if (error) {
        res.status(500).json({ error });
    } else {
        res.json({ data });
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    remove
};
