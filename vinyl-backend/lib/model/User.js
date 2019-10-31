const UserModel = mongoose.model("book", {
    title: String,
    price: Number,
    author: String,
    category: String
});