const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const bcrypt = require('bcrypt');
const Stripe = require('stripe')
const bodyparser = require("body-parser");
const db = require("./src/Config/index")
const User = require("./src/Model/user");
const Cart = require("./src/Model/cart")
// const generateRefreshToken = require("./src/Config/refreshtoken")
const authenticateJWT = require("./src/Config/authenticateJWT")
const validateMongoDbId = require("./src/utils/validateMongoDbId")
const productModel = require("./src/Model/product");
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;
db.connect();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

//sign up
app.post("/signup", async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email })

    // Kiểm tra xem email đã tồn tại trong db hay chưa

    if (isExisting) {
      return res.status(409).send({ message: "Email id is already register", alert: false });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({ ...req.body, password: hashedPassword })
    const { password, ...others } = newUser._doc
    const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: '5h' })

    return res.status(201).json({ others, token, message: "Successfully sign up", alert: true })

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

//api login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        message: "Email is not available, please sign up",
        alert: false
      });
    }

    // So sánh mật khẩu đã mã hóa từ client và từ db
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({
        message: "Invalide password, please try again",
        alert: false
      });
    }
    // Tạo token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ user, token, message: "Login is successfully", alert: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// đăng xuất
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).send({ message: 'Logout success.' });
});

//save product in data 
//api

app.get("/product", async (req, res) => {
  try {
    const data = await productModel.find()
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.post("/uploadProduct", async (req, res) => {
  try {
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.status(201).json(datasave);
    res.send({ message: "Upload successfully" })
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
})

app.get("/product/edit/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

app.put('/uploadProduct/:id', async (req, res) => {
  let product = req.body;

  const editProd = new productModel(product);
  try {
    await productModel.updateOne({ _id: req.params.id }, editProd);
    res.status(201).json(editProd);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
})





// add to cart
app.post("/add-cart", authenticateJWT, async (req, res) => {
  const { productID, quantity } = req.body;

  try {
    // Kiểm tra sự tồn tại của sản phẩm và người dùng
    const product = await productModel.findById(productID).exec();
    const user = await User.findById(req.user.username).exec();

    if (!product || !user) {
      return res.status(404).json({ message: 'Product or user not found' });
    }

    // Tạo cart item mới
    const cartItem = new Cart({
      userID: user._id,
      productID: product._id,
      quantity,
      price: product.price,
    });

    // Lưu cart item vào MongoDB
    await cartItem.save();

    res.json({ message: 'Product added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

/*****payment getWay */
console.log(process.env.STRIPE_SECRET_KEY)


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session", async (req, res) => {

  try {
    const params = {
      submit_type: 'pay',
      mode: "payment",
      payment_method_types: ['card'],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1NAfx8Jg8K0pW5qPgZKSIzfn" }],

      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              // images : [item.image]
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty
        }
      }),

      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,

    }


    const session = await stripe.checkout.sessions.create(params)
    console.log("Session", session)
    res.status(200).json(session.id)
  }
  catch (err) {
    res.status(err.statusCode || 500).json(err.message)
  }

})


//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));
