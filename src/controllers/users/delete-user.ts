import { pool } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";

/**
 * Deletes the authenticated user's own account.
 *
 * Returns 400 if the user ID is invalid.
 * Returns 403 if the path ID does not match `req.user.id`.
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id);

  if (!userId) {
    return res.status(400).json({
      error: "User ID is required",
    });
  }

  if (userId !== req.user.id) {
    return res.status(403).json({
      error: "Not allowed. Users can only delete their own user",
    });
  }

  await pool.execute(`DELETE FROM users WHERE id = ?`, [userId]);

  res.status(200).json({
    message: "User deleted successfully",
    id: userId,
  });
});
