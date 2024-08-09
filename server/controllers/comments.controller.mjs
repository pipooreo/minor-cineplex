import connectionPool from "../utils/db.mjs";

export async function getCommentsAll(req, res, next) {
  try {
    const results = await connectionPool.query(
      `
        select
          users.name,
          comments.comment,
          comments.rating
        from
          comments
        inner join users on comments.user_id = users.id`
    );
    res.status(200).json({ data: results.rows });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get the comments because database connection",
    });
  }
}

export async function getCommentsById(req, res, next) {
  try {
    const commentId = req.query.commentId;
    const results = await connectionPool.query(
      `select * from comments where id = $1`,
      [commentId]
    );
    if (results.rowCount == 0) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }
    return res.status(200).json({
      data: results.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get the comments because database connection",
    });
  }
}

export async function getCommentsByMoviesName(req, res, next) {
  try {
    const movieName = req.query.movieName;
    const results = await connectionPool.query(
      `
        select
          comments.id as comment_id,
          movies.title as moviesname,
          users.name as name,
          users.image as image,
          to_char(to_date(comments.created_at, 'YYYY-MM-DD'), 'DD Mon YYYY') as post_date,
          comments.comment,
          comments.rating
        from
          comments
        inner join movies on movies.id = comments.movie_id
        inner join users on users.id = comments.user_id
        where movies.title ilike $1
        ORDER BY comments.created_at DESC
        `,
      [`%${movieName}%`]
    );
    if (results.rowCount == 0) {
      return res.status(404).json({
        message: "There are no movie to display a comment",
      });
    }
    return res.status(200).json({
      data: results.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get the comment because database connection",
    });
  }
}

export async function getCommentByUser(req, res) {
  // console.log(req.params);
  const { userId } = req.params;
  try {
    const result = await connectionPool.query(
      `select * from comments where user_id = $1`,
      [userId]
    );
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    return res.status(500).json({
      message:
        "Server could not create the comment because database connection",
    });
  }
}

export async function getCommentByMovie(req, res) {
  const { userId, movieId } = req.params;
  try {
    const result = await connectionPool.query(
      `SELECT 
          u.name,
            u.image,
            c.created_at,
            c.comment,
            c.rating,
            m.title
          from
            users u
            left join comments c on c.user_id = u.id
            left join movies m on c.movie_id = m.id WHERE user_id = $1 AND movie_id = $2`,
      [userId, movieId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not fetch the comment due to a database error",
    });
  }
}

export async function createComment(req, res) {
  // console.log(req.body);
  const { user_id, movie_id, date, comment, rating } = req.body;
  try {
    await connectionPool.query(
      `insert into comments (user_id, movie_id, created_at, comment, rating) values ($1,$2,$3,$4,$5)`,
      [user_id, movie_id, date, comment, rating]
    );
    return res
      .status(201)
      .json({ message: "User created comment successfully" });
  } catch (error) {
    return res.status(500).json({
      message:
        "Server could not create the comment because database connection",
    });
  }
}

export async function updateComment(req, res) {
  // console.log(req.body);
  const { user_id, movie_id, date, comment, rating } = req.body;
  try {
    await connectionPool.query(
      `update comments set created_at = $1, comment = $2, rating = $3 where user_id = $4 and movie_id = $5`,
      [date, comment, rating, user_id, movie_id]
    );
    return res
      .status(200)
      .json({ message: "User Updated comment successfully" });
  } catch (error) {
    return res.status(500).json({
      message:
        "Server could not update the comment because database connection",
    });
  }
}

export async function deleteComment(req, res) {
  // console.log(req.body);
  const { commentId } = req.params;
  try {
    await connectionPool.query(`delete from comments where id = $1`, [
      commentId,
    ]);
    return res
      .status(200)
      .json({ message: "User deleted comment successfully" });
  } catch (error) {
    return res.status(500).json({
      message:
        "Server could not delete the comment because database connection",
    });
  }
}
