exports.createOne = (Model, additionalValues) => async (req, res, next) => {
  try {
    // Combine additional values with req.body
    const mergedData = { ...req.body, ...additionalValues };

    const doc = await Model.create(mergedData);

    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Function to retrieve a single document
exports.getOne = (Model, ...populateOptions) => async (req, res, next) => {
  try {
    let query = Model.findById(req.params.id);

    if (populateOptions.length > 0) {
      for (const option of populateOptions) {
        let populateQuery = option;

        if (typeof option === "object" && option.fields) {
          populateQuery = {
            path: option.path,
            select: option.fields.join(" "),
          };
        }

        query = query.populate(populateQuery);
      }
    }

    const doc = await query;

    if (!doc) {
      throw new AppError("No document found with this ID", 404);
    }

    res.status(200).json({
      results: 1,
      data: doc,
    });
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};
// Generic function to get all documents
exports.getAll =
  (Model, ...populateOptions) =>
  async (req, res, next) => {
    try {
      let filter = {};

      // Filter
      const queryObj = { ...req.query };
      const excludedFields = ["page", "sort", "limit", "fields"];
      excludedFields.forEach((el) => delete queryObj[el]);
      filter = queryObj;

      // Sorting
      let sort = "";
      if (req.query.sort) {
        sort = req.query.sort.split(",").join(" ");
      }

      // Field Limiting
      let fields = "";
      if (req.query.fields) {
        fields = req.query.fields.split(",").join(" ");
      }

      // Pagination
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 100;
      const skip = (page - 1) * limit;

      // Execute the query
      let query = Model.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(fields);

      if (populateOptions.length > 0) {
        for (const option of populateOptions) {
          query = query.populate(option);
        }
      }

      const doc = await query;

      // Send response
      res.status(200).json({
        results: doc.length,
        data: doc,
      });
      return doc
    } catch (err) {
      next(err);
    }
  };
// Generic function to update one document
exports.updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      throw new AppError("no document found in this ID", 404);
    }
    res.status(200).json({
      status: "success",
      message: "updated",
      data: {
        data: doc,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Generic function to delete one document
exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      throw new AppError(`No document found in this ID`, 404);
    }
    res.status(204).json({
      message: "deleted",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
