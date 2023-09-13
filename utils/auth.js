const withAuth = (req, res, next) => {

    if (!req.session.log_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
    
  
module.exports = withAuth;