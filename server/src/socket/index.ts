import { createServer } from "http";
import { Server } from "socket.io";
import socketIO from "socket.io";

var key: any = process.env.allsportsapi;
class SocketIO {
  public Realtime(app: any, port: any) {
    const httpServer = createServer(app);

    const io = new Server(httpServer, {
      cors: {
        origin: "*" || process.env.URL_FRONT_END,
        // origin: process.env.URL_FRONT_END,
        methods: ["GET", "POST"],
      },
    });
    let setInter: any = [];
    let setInterListcoin: any = [];
    let setInterBo: any = [];
    let setInterBoTime: any = [];
    let setInterCandleTick: any = [];
    let setInterPrivate: any = [];

    io.on("connection", async (socket: socketIO.Socket) => {
      io.on("disconnect", () => {
        console.log("socket disconnected : " + socket.id);
      });
    });

    // ** Connect server **

    httpServer.listen(port, () => console.log(`Connect port ${port}`));
  }
}

export default new SocketIO();