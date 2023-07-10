const Product = require('../models/Product')
const fs = require('fs')
const path = require('path')

const Producer = require('../Producer')
const producer = new Producer()

module.exports = {
    fetchProducts: async(req, res) => {
        try {
            const data = await Product.find();
            // console.log(data)
            res.json(data)
        } catch(err) {
            res.status(400).send('Unable to fetch products, please try refreshing the request')
        }
    },
    addProduct: async(req, res) => {
        const exists = await Product.findOne({title: req.body.title});
        if(exists) {
            return res.status(400).send('Product title already exists, please try something else')
        }
        const file = req.files.files;
        const filename = '_' + new Date().getTime().toString() + file.name

        const uploadPath = path.join(__dirname, '../uploads/', filename)
        // console.log(uploadPath)

        // Upload File
        try {
            file.mv(uploadPath, async(err) => {
                if (err) {
                  console.error('Error uploading file:', err);
                  return res.status(500).json({ message: 'Failed to upload file' });
                }
            
                const data = await Product.create({...req.body, image: filename});

                // // broadcast to users
                // producer.sendMessage('Product', {method: 'create', data})

                res.json(data)
            });
        } catch(err) {
            console.log("err",err)
            res.status(500).send('Unable to add product');
        }
    },
    editProduct: async(req, res) => {
        try {
            await Product.findByIdAndUpdate(req.body._id, req.body)
            res.send('Successfully updated product')
        } catch(err) {
            console.log("err",err)
            res.status(500).send('Error updating product data');
        }
    },

    updateProductImage: async(req, res) => {
        try {
            const file = req.files.files;

            const uploadPath = path.join(__dirname, '../uploads/', req.body.filename)

            file.mv(uploadPath, async(err) => {
                if (err) {
                  console.error('Error updating file:', err);
                  return res.status(500).json({ message: 'Failed to update image file' });
                }
            
                res.send('Successfully updated image file')
            });

        } catch(err) {
            console.log("err",err)
            res.status(500).send('Error updating product image');
        }
    },

    deleteProduct: async(req, res) => {
        try {
            console.log(req.body)
            // Delete file first
            const filePath = path.join(__dirname, '../uploads/', req.body.image);
            fs.unlink(filePath, async(err) => {
                if(err) res.status(500).send('Unable to proceed with deletion, image failed to delete');
    
                // Delete product from DB
                await Product.findByIdAndDelete(req.body._id);

                // Broadcast
                // producer.sendMessage('Product', {method: 'remove', data: req.body._id})

                res.send('Successfully deleted product data')
            })
        } catch(err) {
            console.log("err",err)
            res.status(500).send('Error deleting product data');
        }
    }


}