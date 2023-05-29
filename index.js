const express = require("express")
const app = express()
const cors = require("cors")
const path = require('path');
const multer = require('multer');
const con = require("./db")
const authRoutes = require("./routes/auth")
const ordersRoutes = require("./routes/orders")
const humanRoutes = require("./routes/humanResources")

const port = 4000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.static('public'));

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage,
});

app.post('/upload', upload.single('file'), (req, res) => {
    // console.log(req.file);
    const fileUrl = `http://localhost:4000/files/${req.file.filename}`;
    res.send(fileUrl);
});

app.get('/files/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.sendFile(filePath);
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/human", humanRoutes);

app.listen(port, () => { console.log(`app running on ${port}`) })