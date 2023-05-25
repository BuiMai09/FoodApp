const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const bcrypt = require('bcrypt');
const Stripe = require('stripe')
const bodyparser = require("body-parser");
const db = require("./src/ConfigDB/index")
const User = require("./src/Model/user");
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
    // Mã hóa mật khẩu trước khi lưu vào db
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Tạo user mới và lưu vào db
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

    // Tìm kiếm user trong db theo username
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
    const token = jwt.sign({ id: user._id }, 'secret-key', { expiresIn: '1h' });

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

app.post("/product/edit/:id", async (req, res) => {
  const id = await productModel.findById(req.params._id)
  if (!id) {
    +
    res.status(404).send("message: No find product")
  } else {

  }
})

//
app.get("/product", async (req, res) => {
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
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
