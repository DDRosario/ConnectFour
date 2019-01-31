import * as express from 'express';
import * as parser from 'body-parser';
import { socketServer } from './socketServer';

class App {
  public app: express.Application;
  private socketServer: socketServer;

  constructor() {
    this.app = express();
    this.config();
    this.socketServer = new socketServer();
    this.serveStatic();
  }
  //Apply middleware
  private config(): void {
    this.app.use(parser.json());
    this.app.use(parser.urlencoded({ extended: true }));
  }
  //Serve static files
  private serveStatic(): void {
    this.app.use(express.static(__dirname + '/../../static'));
  }
  //Router
}

export const app = new App().app;
