import connectionPool from "../utils/db.mjs";

export async function getCoupons(req, res, next) {
  const { coupon_code } = req.query; // Use req.query for GET request

  //   console.log("Received query:", req.query); // Log the query parameters for debugging

  try {
    const result = await connectionPool.query(
      `SELECT id, coupon_code AS coupon_name, type, discount_value, usage_limit, expiration_date AS exp
       FROM coupons
       WHERE coupon_code = $1`,
      [coupon_code]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json(result.rows[0]); // Respond with the coupon details
  } catch (error) {
    console.error("Error fetching coupon:", error); // Improved logging
    res.status(500).json({ message: "Internal server error" });
  }
}

// ลบ
