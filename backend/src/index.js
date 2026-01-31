import server from "./server/server.js";
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
  console.log(`Server is running on port: http://localhost:${PORT}`);
})