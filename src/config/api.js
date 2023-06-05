const { default: axios } = require("axios");

const host = axios.create({
  baseURL: "https://fcm.googleapis.com/fcm/send",
});

host.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `key=${process.env.NEXT_PUBLIC_FIREBASE_SERVER_KEY}`,
    // "Content-Type": "application/json",
  };
  return config;
});

const api = {
  sendNotification: async (data) => {
    let res = await host.post("https://fcm.googleapis.com/fcm/send", data);
    return console.log(res.data);
  },
};

export default api;
