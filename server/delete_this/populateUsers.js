const User = require('../models/User');
const Product = require('../models/Product');
const { ObjectId } = require('mongodb');

const users = [
  {username: 'user1', email: 'shahbazalam92399@gmail.com', password: 'password1', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain', role: 'buyer' },
  {username: 'user2', email: 'shahbazalam92399@gmail.com', password: 'password2', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain', role: 'buyer' },
  // {username: 'user3', email: 'shahbazalam92399@gmail.com', password: 'password3', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain', role: 'buyer' },
  // {username: 'user4', email: 'shahbazalam92399@gmail.com', password: 'password4', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain', role: 'buyer' },
  {username: 'user5', email: 'shahbazalam92399@gmail.com', password: 'password5', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain', role: 'seller' },
];

const products = [
  {
    name: 'keyboard',
    description: 'Overclocked RGB Mechanical Gaming Keyboard 16.8 Million Color LED Backlight',
    price: 500,
    image: 'https://images-na.ssl-images-amazon.com/images/I/71my4oT-ZrL.jpg',
    seller: null 
  },
  {
    name: 'mouse',
    description: 'Overclocked RGB Gaming Mouse Inward module',
    price: 200,
    image: 'https://thermaltake.azureedge.net/pub/media/wysiwyg/key3/img/L20rgbmouse/pic3m.jpg',
    seller: null 
  },
  {
    name: 'CPU',
    description: 'Overclocked RGB Lian Li O11 Dynamic XL Mega SLI Build',
    price: 10000,
    image: 'https://preview.redd.it/csykfw911xy31.jpg?auto=webp&s=a7f2ddcb935f43a93efbef0474ddc394e1fe6747',
    seller: null 
  },
  {
    name: 'Monitor',
    description: 'Overclocked RGB Razer\'s Raptor Gaming Monitor 144hz WQHD HDR FreeSync',
    price: 1000,
    image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain',
    seller: null 
  },
  {
    name: 'Mouse-pad',
    description: 'A simple keyboard',
    price: 9500,
    image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain',
    seller: null 
  },
];

exports.populateDB = async () => {
  try {
    await User.deleteMany({});
    const insertedUsers = await User.insertMany(users);

    // Find the user with the role 'seller'
    const seller = insertedUsers.find(user => user.role === 'seller');

    if (!seller) {
      throw new Error('Seller not found');
    }

    // Update products with the seller's ObjectId
    const updatedProducts = products.map(product => ({
      ...product,
      seller: seller._id
    }));

    await Product.deleteMany({});
    await Product.insertMany(updatedProducts);
    console.log('Database populated with sample users and products');
  } catch (error) {
    console.error('Error populating database', error);
  }
};
