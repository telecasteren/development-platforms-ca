import { pool } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { sendUserResponse } from "../../utils/send-user-response.js";
import type { User } from "../../models/user.js";

/**
 * Updates fields on the authenticated user's own account.
 *
 * Only `email` is currently supported.
 * Returns 403 if the path ID does not match `req.user.id`.
 * Returns 400 if no supported fields are provided.
 */
export const updateUser = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id);

  if (userId !== req.user.id) {
    return res.status(403).json({
      error: "Not allowed. Users can only update their own data",
    });
  }

  const fields = [];
  const values = [];

  if (req.body.email) {
    fields.push("email = ?");
    values.push(req.body.email);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  values.push(userId);

  await pool.execute(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );

  const [rows] = await pool.execute(
    "SELECT id, email FROM users WHERE id = ?",
    [userId],
  );
  const users = rows as User[];
  const updatedUser = users[0];

  sendUserResponse(res, updatedUser, "User updated successfully");
});
