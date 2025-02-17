import { createClient } from "redis";

const client = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_DATABASE,
    port: 16463,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

if (!client.isOpen) {
  client.connect();
}
client.set("foo", "bar");
const result = client.get("foo");
console.log(result); // >>> bar

export default client;
