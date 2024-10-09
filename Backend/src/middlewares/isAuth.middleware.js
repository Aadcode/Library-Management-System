export default isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    console.log("User is Not loggedIN");
  }
  next();
};
