import Ajv, { JTDSchemaType } from "ajv/dist/jtd";
const ajv = new Ajv();

export interface Book {
  title: string;
  author: string;
  isbn: string;
}

export interface Review {
  book_id: number;
  reviewer_name: string;
  content: string;
  rating: number;
}

const book_schema: JTDSchemaType<Book> = {
  properties: {
    title: { type: "string" },
    author: { type: "string" },
    isbn: { type: "string" },
  },
};

const review_schema: JTDSchemaType<Review> = {
  properties: {
    book_id: { type: "int32" },
    reviewer_name: { type: "string" },
    content: { type: "string" },
    rating: { type: "int32" },
  },
};

// validate_book is a type guard for User - type is inferred from schema type
export const validate_book = ajv.compile(book_schema);
// export const validate_review = ajv.compile(review_schema);
