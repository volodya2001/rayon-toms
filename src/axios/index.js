import axios from "axios";

export default axios.create({
    baseURL: "https://standup-mongoose.onrender.com/api",
})