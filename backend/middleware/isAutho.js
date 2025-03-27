const isAutho = (/*allowedRoles*/) => {
  return (req, res, next) => {
    if (req.admin /*&& allowedRoles.includes(req.user.role) && req.user.id == req.params.id*/) {
      next();
    } else {
      res
        .status(403)
        .json({ msg: "Access forbidden - Insufficient privileges" });
    }
  };
};

module.exports = isAutho;