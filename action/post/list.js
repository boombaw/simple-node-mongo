const express = require('express');
const list = express.Router();
// const verifyToken = require("../../middlewares/verify-token");
// 
// import model
const Post = require("../../domain/models/post");

var httpResponse = require("../../http/response");

// calculating offset by page and limit
var getPagination = require("../../domain/helper/pagination");

list.get("/", async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 10;
    const { offset } = getPagination(page, limit);
    var sorting = 1;

    if (req.query.sort == "desc") sorting = -1;

    var options = { offset, limit, sort: { created_at: sorting } };

    try {
      await Post.paginate({}, options)
        .then((data) => {
          httpResponse.code = 200;
          httpResponse.message = "Succes";
          httpResponse.data = data.docs;
          httpResponse.pagination = {
            total: data.totalDocs,
            totalPages: data.totalPages,
            page: data.page,
            nextPage: data.nextPage,
            prevPage: data.prevPage,
            pagingCounter: data.pagingCounter,
          };

          return res.status(httpResponse.code).send(httpResponse);
        })
        .catch((err) => {
          return res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving post.",
          });
        });
    } catch (err) {
      httpResponse.code = 200;
      httpResponse.error = err.message;

      return res.status(httpResponse.code).json(httpResponse);
    }
  }
);

module.exports = list;