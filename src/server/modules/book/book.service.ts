import { connection as db } from "../../db/mysql-connection";
import { OkPacket, RowDataPacket } from "mysql2/promise";
import { Book } from "./book_type_validation";

export const get_all_rows = async (): Promise<Book[]> => {
  const sql = `SELECT * FROM books ORDER BY id DESC`;
  const results = await db.query(sql);
  const rows = results[0] as any[];
  return rows as Book[];
};

export const create_row: Function = async (
  book: Book
): Promise<[number, { message: string; result: OkPacket }]> => {
  const sql = `INSERT INTO books SET ?`;
  // const results = await db.query(`    INSERT INTO table_name (title, author, published_date, isbn)
  // VALUES (${book.title},${book.author},${book.published_date},${book.isbn});`);
  const results = await db.query(sql, book);
  const result: OkPacket = results[0] as OkPacket;
  const ok = { status: 200, message: `new book was added` };
  const fail = { status: 404, message: `Error in adding book` };
  const { status, message } = result.affectedRows ? ok : fail;
  return [status, { message, result }];
};

export const get_one_row = async (id: string) => {
  const sql = `SELECT * FROM books WHERE id = '${id}'`;
  const results = (await db.query(sql)) as any[];
  //   console.log(results[0][0]);
  if (!results[0][0]) return null;
  return results[0][0];
};

export const get_pagination = async (page: string, items: string) => {
  const sql = `
      SELECT * FROM books 
      LIMIT ${parseInt(items)} 
      OFFSET ${parseInt(page) * parseInt(items)}`;
  const [rows] = await db.query(sql);
  return rows as Book[];
};

export const update_one_row = async (
  id: string,
  book: Book
): Promise<[number, { message: string; result: OkPacket }]> => {
  const updates = Object.entries(book).map(([key]) => `${key}=?`);
  const sqlUpdate = `UPDATE books SET ${updates} WHERE id='${id}'`;
  const resultsUpdate = await db.query(sqlUpdate, Object.values(book));
  const result: OkPacket = resultsUpdate[0] as OkPacket;
  const ok = { status: 200, message: `User ${id} updated successfully` };
  const fail = { status: 404, message: `Error in updating user ${id}` };
  const { status, message } = result.affectedRows ? ok : fail;
  return [status, { message, result }];
};

export const delete_row = async (
  id: string
): Promise<[number, { message: string; result: OkPacket }]> => {
  const results = await db.query(`DELETE FROM books WHERE id=${Number(id)}`);
  const result: OkPacket = results[0] as OkPacket;
  const ok = {
    status: 200,
    message: `User id: ${id} - deleted successfully`,
  };
  const fail = { status: 404, message: `User id: ${id} - Not Found` };
  const { status, message } = result.affectedRows ? ok : fail;
  return [status, { message, result }];
};

export const get_number_of_views = async (id: string): Promise<number> => {
  const sql = `SELECT count(*) FROM books INNER JOIN reviews ON books.id=reviews.book_id WHERE books.id=${id};`;
  const result: RowDataPacket = (await db.query(sql)) as RowDataPacket;
  return result[0][0]["count(*)"];
};
