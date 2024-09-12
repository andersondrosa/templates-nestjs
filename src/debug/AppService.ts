import { Injectable } from "@nestjs/common";
import * as debug from "debug";

@Injectable()
export class AppService {
  private readonly logger = debug("app:service");

  getHello(): string {
    this.logger("Chamando o método getHello");
    return "Hello World!";
  }
}
