db = db.getSiblingDB('shop'); // Selecciona la base de datos 'shop'

db.createCollection('users');

db.users.insertMany([
    {
        _id: ObjectId("66674fbd1f7941338681646f"),        
        email: "emai2",
        username: "userna2",
        password: "$2a$10$N2K9j9t4Mlj8SQ41AlhC3OwqjNsCymfWEzagDmlKHbzQWD/CfT/fq",
        role: "user",
      },
      {
        _id: ObjectId("6667517d1f79413386816475"),
        email: "user1@email",
        username: "username1",
        password: "$2a$10$IkNZ3uVUl68cwGMMGvPKvuBm7iOhotPfawZhGBm9VG0Q/z/6rJ/kK",
        role: "user",
      },
      {
        _id: ObjectId("666821a93067ed0ea1f3b17d"),
        email: "us@email",
        username: "user",
        password: "$2a$10$68zbgD4CUwvimbV6C9JMfu5193OkAQoik/Aho3M69DW4l8mQ9DJTu",
        role: "user",
        
      },
      {
        _id:ObjectId("66685d96838346f2fb769cf0"),
        email: "asd",
        username: "asd",
        password: "$2a$10$mCSTez3w1C0q8uoyOIm4EOOEQ3wLUe60HF/mSlHkQH.xnvUONjayu",
        role: "admin",
        
      }]
);