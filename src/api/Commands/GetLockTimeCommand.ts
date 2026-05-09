'use strict';

import { CommandType } from "../../constant/CommandType";
import { Command } from "../Command";

export class GetLockTimeCommand extends Command {
  static COMMAND_TYPE: CommandType = CommandType.COMM_GET_LOCK_TIME;
  private lockTimestamp?: number;

  protected processData(): void {
    if (this.commandData && this.commandData.length >= 6) {
      const year = this.commandData[0] + 2000;
      const month = this.commandData[1] - 1; // JS Date months are 0-indexed
      const day = this.commandData[2];
      const hour = this.commandData[3];
      const minute = this.commandData[4];
      const second = this.commandData[5];
      
      const date = new Date(year, month, day, hour, minute, second);
      this.lockTimestamp = date.getTime();
    }
  }

  getLockTimestamp(): number | undefined {
    return this.lockTimestamp;
  }

  build(): Buffer {
    return Buffer.alloc(0);
  }
}
