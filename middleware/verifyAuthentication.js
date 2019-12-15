
const verifyAuthentication = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) { return response.send(401).send("No auth header"); }

  const [authType, authToken] = authHeader.split(" ");

  if (!authType || authType !== "AUTHENTICATION_KEY" || !authToken) {
    return res.status(400).send("Invalid auth header");
  }

  try {
    if (authToken !== process.env.AUTHENTICATION_KEY) {
      return response.status(401).send("Authentication failed"); //TODO correct status?
    }
    next();
  } catch (error) {

  }
};

module.exports = verifyAuthentication;
