import "dotenv/config";
import swaggerJsdoc from "swagger-jsdoc";

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "News Bureau API",
      version: "1.0.0",
      description: "REST API for managing users and articles",
    },
    servers: [
      { url: `http://localhost:${PORT}` },
      { url: "http://localhost:3000" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string" },
          },
          required: ["error"],
        },
        UserPublic: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
            },
            created_at: { type: "string", format: "date-time" },
          },
          required: ["id", "email"],
        },
        UserAuthRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
        LoginSuccessResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Login successful" },
            user: { $ref: "#/components/schemas/UserPublic" },
            token: { type: "string" },
          },
          required: ["message", "user", "token"],
        },
        UserMutationSuccessResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
            user: { $ref: "#/components/schemas/UserPublic" },
          },
          required: ["message", "user"],
        },
        UserDeleteSuccessResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "User deleted successfully" },
            id: { type: "integer", example: 1 },
          },
          required: ["message", "id"],
        },
        UserUpdateRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
          },
        },
        Article: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string" },
            body: { type: "string" },
            category: { type: "string" },
            submitted_by: { type: "integer", example: 1 },
            created_at: { type: "string", format: "date-time" },
          },
          required: [
            "id",
            "title",
            "body",
            "category",
            "submitted_by",
            "created_at",
          ],
        },
        ArticleCreateRequest: {
          type: "object",
          required: ["title", "body", "category"],
          properties: {
            title: { type: "string" },
            body: { type: "string" },
            category: { type: "string" },
          },
        },
        ArticleUpdateRequest: {
          type: "object",
          properties: {
            title: { type: "string" },
            body: { type: "string" },
            category: { type: "string" },
          },
        },
        ArticleCreateSuccessResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Article created successfully",
            },
            articleId: { type: "integer", example: 1 },
          },
          required: ["message", "articleId"],
        },
        ArticleUpdateSuccessResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Article updated successfully",
            },
            articleId: { type: "integer", example: 1 },
          },
          required: ["message", "articleId"],
        },
        ArticleDeleteSuccessResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Article deleted successfully",
            },
            id: { type: "integer", example: 1 },
          },
          required: ["message", "id"],
        },
      },
      responses: {
        BadRequest: {
          description: "Invalid request",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        Unauthorized: {
          description: "Missing or invalid authentication",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        Forbidden: {
          description:
            "Authenticated user is not allowed to perform this action",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        NotFound: {
          description: "Requested resource was not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        Conflict: {
          description: "Resource already exists",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
