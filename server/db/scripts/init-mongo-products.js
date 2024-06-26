db = db.getSiblingDB('shop'); // Selecciona la base de datos 'shop'

db.createCollection('products');

db.products.insertMany([
    {

        _id: ObjectId("60b8d2955f4e5d2d5c17f0e1"),
        product_image: "https://res.cloudinary.com/grover/image/upload/e_trim/b_white,c_pad,dpr_2.0,h_500,w_520/f_auto,q_auto/v1686317722/pk5uyikn8lkez5cupgs5.png",
        product_name: "iPhone 14",
        product_description: "Latest iPhone model with advanced features",
        product_model: "iPhone 14",
        product_price: 999,
        product_type: "mobile",
        product_comments: [],
        product_amount: 50,
    },
    {
        _id: ObjectId("66698a9d9a8450d7e55ea45f"),
        product_image: "https://m.media-amazon.com/images/I/618nXc9a7gL._AC_UF894,1000_QL80_.jpg",
        product_name: "Samsung Galaxy S21",
        product_description: "High-end Android smartphone",
        product_model: "Galaxy S21",
        product_price: 799,
        product_type: "mobile",
        product_comments: [],
        product_amount: 40,
    },
    {
        _id: ObjectId("66698a9d9a8450d7e55ea460"),
        product_image: "https://i.ebayimg.com/images/g/EGUAAOSwSWhjxdjA/s-l1600.jpg",
        product_name: "MacBook Pro 16\"",
        product_description: "Powerful laptop for professionals",
        product_model: "MacBook Pro 16",
        product_price: 2399,
        product_type: "laptop",
        product_comments: [],
        product_amount: 30,
    },
    {
        _id: ObjectId("66698a9d9a8450d7e55ea461"),
        product_image: "https://amso.eu/spa_pl_Nuevo-portatil-Dell-XPS-13-PLUS-9320-i5-1240P-8GB-512GB-1920x1080-Windows-11-Professional-244133_4.jpg",
        product_name: "Dell XPS 13",
        product_description: "Compact and powerful ultrabook",
        product_model: "XPS 13",
        product_price: 1099,
        product_type: "laptop",
        product_comments: [],
        product_amount: 25,
    },
    {
        _id: ObjectId("66698a9d9a8450d7e55ea462"),
        product_image: "https://m.media-amazon.com/images/I/716n8eAia+L._AC_UF894,1000_QL80_.jpg",
        product_name: "Google Pixel 6",
        product_description: "Latest Google phone with excellent camera",
        product_model: "Pixel 6",
        product_price: 699,
        product_type: "mobile",
        product_comments: [],
        product_amount: 35,
    },
    {
        _id: ObjectId("66698a9d9a8450d7e55ea463"),
        product_image: "https://m.media-amazon.com/images/I/81biZOciQ3L._AC_UF894,1000_QL80_.jpg",
        product_name: "HP Spectre x360",
        product_description: "Versatile 2-in-1 laptop",
        product_model: "Spectre x360",
        product_price: 1299,
        product_type: "laptop",
        product_comments: [],
        product_amount: 20,
    },
    {
        _id: ObjectId("66698a9d9a8450d7e55ea464"),
        product_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy8u5ZbHrEpPqs2kZGDbbXJ15gMlhs1x07dA&s",
        product_name: "OnePlus 9",
        product_description: "Flagship killer with top specs",
        product_model: "OnePlus 9",
        product_price: 729,
        product_type: "mobile",
        product_comments: [],
        product_amount: 45,
    },
    {
        _id: ObjectId("66698a9d9a8450d7e55ea465"),
        product_image: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4R213?ver=4eb0&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true",
        product_name: "Microsoft Surface Laptop 4",
        product_description: "Sleek and stylish laptop",
        product_model: "Surface Laptop 4",
        product_price: 999,
        product_type: "laptop",
        product_comments: [],
        product_amount: 28,
    },
    {
        _id: ObjectId("66698a9d9a8450d7e55ea466"),
        product_image: "https://ae01.alicdn.com/kf/Sd30858232f4d476eb52392dd06ef8232F.png",
        product_name: "Sony Xperia 5 III",
        product_description: "Compact flagship with excellent display",
        product_model: "Xperia 5 III",
        product_price: 899,
        product_type: "mobile",
        product_comments: [],
        product_amount: 22,
    },
    {
        _id: ObjectId("66698a9d9a8450d7e55ea467"),
        product_image: "https://thumb.pccomponentes.com/w-530-530/articles/1066/10660888/5869-lenovo-thinkpad-x1-carbon-gen-10-intel-core-i7-1260p-16gb-512gb-ssd-14-caracteristicas.jpg",
        product_name: "Lenovo ThinkPad X1 Carbon",
        product_description: "Business laptop with premium build",
        product_model: "ThinkPad X1 Carbon",
        product_price: 1399,
        product_type: "laptop",
        product_comments: [],
        product_amount: 18,
    },
]);

