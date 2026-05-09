'use strict';

import { CommandType } from "../../constant/CommandType";
import { Command } from "../Command";

export class CalibrationTimeCommand extends Command {
  static COMMAND_TYPE: CommandType = CommandType.COMM_TIME_CALIBRATE;
  private time?: string | Date;

  protected processData(): void {
    // nothing to do here
  }

  build(): Buffer {
    const data = Buffer.alloc(6);

    // Use the provided time if it's a Date object, otherwise default to now
    const d = (this.time instanceof Date) ? this.time : new Date();

    data.writeUInt8(d.getFullYear() - 2000, 0); // Year (e.g., 26)
    data.writeUInt8(d.getMonth() + 1, 1);       // Month (JS months are 0-indexed)
    data.writeUInt8(d.getDate(), 2);            // Day
    data.writeUInt8(d.getHours(), 3);           // Hour
    data.writeUInt8(d.getMinutes(), 4);         // Minute
    data.writeUInt8(d.getSeconds(), 5);         // Second

    return data;
  }

}