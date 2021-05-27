import Ajv, { JTDSchemaType } from "ajv/dist/jtd";
const ajv = new Ajv();

export interface Place {
  place_name: string;
  hits: number;
}
enum Type {
  Human = "HUMAN",
  Android = "ANDROID",
  Sensor = "SENSOR",
  Machine = "MACHINE",
}
export interface Agent {
  name: string;
  type: Type;
  owner?: string;
  status: "pending" | "active" | "retired";
}

const agent_schema: JTDSchemaType<Agent> = {
  properties: {
    name: { type: "string" },
    type: { enum: [Type.Human, Type.Android, Type.Sensor, Type.Machine] },
    status: { enum: ["pending", "active", "retired"] },
  },
  optionalProperties: {
    owner: { type: "string" },
  },
};

const place_schema: JTDSchemaType<Place> = {
  properties: {
    place_name: { type: "string" },
    hits: { type: "int32" },
  },
};

export const validate_agent = ajv.compile(agent_schema);
export const validate_place = ajv.compile(place_schema);
