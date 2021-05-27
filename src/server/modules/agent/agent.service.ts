import { connection as db } from "../../db/mysql-connection";
import { OkPacket, RowDataPacket } from "mysql2/promise";
import { Agent } from "../type_validation/type_validation";

export const get_all_agents: Function = async (): Promise<Agent[]> => {
  const sql = `SELECT * FROM agent`;
  const results = await db.query(sql);
  const rows = results[0] as any[];
  return rows as Agent[];
};

export const get_all_agents_places: Function = async (): Promise<Agent[]> => {
  const sql = `SELECT * FROM agent LEFT JOIN places ON agent.id=places.agent_id`;
  const results = await db.query(sql);
  const rows = results[0] as any[];
  return rows as Agent[];
};

export const create_agent: Function = async (
  agent: Agent
): Promise<[number, { message: string; result: OkPacket }]> => {
  const sql = `INSERT INTO agent SET ?`;
  const results = await db.query(sql, agent);
  const result: OkPacket = results[0] as OkPacket;
  const ok = { status: 200, message: `new agent was added` };
  const fail = { status: 404, message: `Error in adding agent` };
  const { status, message } = result.affectedRows ? ok : fail;
  return [status, { message, result }];
};

export const get_one_agent: Function = async (id: string) => {
  const sql = `SELECT * FROM agent WHERE id = '${id}'`;
  const results = (await db.query(sql)) as any[];
  if (!results[0][0]) return null;
  return results[0][0];
};
