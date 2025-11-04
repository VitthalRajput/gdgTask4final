import app from "./app.js";

app.get("/", async function (res, req) {
    console.log("API is running...")
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
