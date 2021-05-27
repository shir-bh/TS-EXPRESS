import { connection as db } from "../../db/mysql-connection";
import { OkPacket, RowDataPacket } from "mysql2/promise";
import { Place } from "../type_validation/type_validation";

export const create_row: Function = async (
  place: Place,
  agent_id: string
): Promise<[number, { message: string; result: OkPacket }]> => {
  const place_to_add = { ...place, agent_id };
  const sql = `INSERT INTO places SET ?`;
  const results = await db.query(sql, place_to_add);
  const result: OkPacket = results[0] as OkPacket;
  const ok = { status: 200, message: `new agent was added` };
  const fail = { status: 404, message: `Error in adding agent` };
  const { status, message } = result.affectedRows ? ok : fail;
  return [status, { message, result }];
};
