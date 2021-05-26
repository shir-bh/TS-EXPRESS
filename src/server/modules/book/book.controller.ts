/* 
  if there is an error thrown in the DB, asyncMiddleware
  will pass it to next() and express will handle the error */
import raw from "../../middleware/route-async-wrapper";
import express, { Request, Response } from "express";
import * as service from "./book.service";
import { Book, validate_book } from "./book_type_validation";
const router = express.Router();

// parse json req.body on post routes
router.use(express.json());

// CREATES A NEW USER
router.post(
  "/",
  raw(
    async (req: Request, res: Response): Promise<void> => {
      const valid = validate_book(req.body);
      if (!valid && validate_book.errors) throw validate_book.errors[0];
      const rows = await service.create_row(req.body);
      const ok = { status: 200, message: `User Updated successfully` };
      const fail = { status: 404, message: `Error in creating user ` };
      const { status, message } = rows ? ok : fail;
      res.status(status).json({ message, result: rows });
    }
  )
);

// GET ALL USERS
router.get(
  "/",
  raw(
    async (req: Request, res: Response): Promise<void> => {
      const rows = await service.get_all_rows();
      res.status(200).json(rows);
    }
  )
);

router.get(
  "/paginate/:page?/:items?",
  raw(
    async (req: Request, res: Response): Promise<void> => {
      let { page = "0", items = "3" } = req.params;
      const rows = await service.get_pagination(page, items);
      if (!rows) {
        res.status(404).json({ message: `No rows found.` });
        return;
      }
      res.status(200).json(rows);
    }
  )
);

// GETS A SINGLE USER
router.get(
  "/:id",
  raw(
    async (req: Request, res: Response): Promise<void> => {
      const user = await service.get_one_row(req.params.id);
      if (!user) {
        res
          .status(404)
          .json({ message: `No user found. with id of ${req.params.id}` });
        return;
      }
      res.status(200).json(user);
    }
  )
);
// UPDATES A SINGLE USER
router.put(
  "/:id",
  raw(
    async (req: Request, res: Response): Promise<void> => {
      const valid = validate_book(req.body);
      if (!valid && validate_book.errors) throw validate_book.errors[0];

      const [status, output] = await service.update_one_row(
        req.params.id,
        req.body as Book
      );
      res.status(status).json(output);
    }
  )
);

// DELETES A USER
router.delete(
  "/:id",
  raw(
    async (req: Request, res: Response): Promise<void> => {
      const [status, output] = await service.delete_row(req.params.id);
      res.status(status).json(output);
    }
  )
);

router.get(
  "/get_views/:id",
  raw(
    async (req: Request, res: Response): Promise<void> => {
      const result = await service.get_number_of_views(req.params.id);
      if (!result) {
        res
          .status(404)
          .json({ message: `No views found. for id of ${req.params.id}` });
        return;
      }
      res.status(200).json(result);
    }
  )
);

export default router;
