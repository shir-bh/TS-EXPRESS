import raw from "../../middleware/route-async-wrapper";
import express, { Request, Response } from "express";
import * as service from "./places.service";
import { Place, validate_place } from "../type_validation/type_validation";
const router = express.Router();

router.use(express.json());

// CREATES A NEW PLACE
router.post(
  "/:agent_id",
  raw(
    async (req: Request, res: Response): Promise<void> => {
      const valid = validate_place(req.body);
      if (!valid && validate_place.errors) throw validate_place.errors[0];
      const rows = await service.create_row(req.body, req.params.agent_id);
      const ok = { status: 200, message: `Place added successfully` };
      const fail = { status: 404, message: `Error in creating place ` };
      const { status, message } = rows ? ok : fail;
      res.status(status).json({ message, result: rows });
    }
  )
);
export default router;
