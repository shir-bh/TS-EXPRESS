import raw from "../../middleware/route-async-wrapper";
import express, { Request, Response } from "express";
import * as service from "./agent.service";
import { Agent, validate_agent } from "../type_validation/type_validation";
const router = express.Router();

router.use(express.json());

// CREATES A NEW AGENT
router.post(
  "/",
  raw(
    async (req: Request, res: Response): Promise<void> => {
      const valid = validate_agent(req.body);
      if (!valid && validate_agent.errors) throw validate_agent.errors[0];
      const rows = await service.create_agent(req.body);
      const ok = { status: 200, message: `Agent added successfully` };
      const fail = { status: 404, message: `Error in creating agent ` };
      const { status, message } = rows ? ok : fail;
      res.status(status).json({ message, result: rows });
    }
  )
);

//GET ALL AGENTS
router.get(
  "/",
  raw(
    async (req: Request, res: Response): Promise<void> => {
      const rows = await service.get_all_agents();
      res.status(200).json(rows);
    }
  )
);

// GET ALL AGENTS AND PLACES
router.get(
  "/agents_places",
  raw(
    async (req: Request, res: Response): Promise<void> => {
      const rows = await service.get_all_agents_places();
      res.status(200).json(rows);
    }
  )
);

// GETS A SINGLE AGENT
router.get(
  "/:id",
  raw(
    async (req: Request, res: Response): Promise<void> => {
      const user = await service.get_one_agent(req.params.id);
      if (!user) {
        res
          .status(404)
          .json({ message: `No agent found. with id of ${req.params.id}` });
        return;
      }
      res.status(200).json(user);
    }
  )
);
export default router;
