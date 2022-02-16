// Boilerplate
import Express from "express";
import BP from "body-parser";
const Router = Express.Router();

// Helpers
import { wrapAsync } from "../helpers/routing.js";

// Middleware
import { authenticateUser } from "../helpers/tokens.js";

// Controller
import {
  getUser,
  updateUser,
  deleteUser,
  getProjects,
  getOrganizations,
  getUsersFromSearch,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
} from "../controllers/UsersController.js";

Router.use(BP.json());

Router.get(
  "/",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await getUser(req.query.userID)).status(200);
  })
);

Router.put(
  "/",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await updateUser(req.query.userID, req.body)).status(200);
  })
);

Router.delete(
  "/",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await deleteUser(req.query.userID)).status(200);
  })
);

Router.get(
  "/projects",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await getProjects(req.query.userID)).status(200);
  })
);

Router.get(
  "/organizations",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await getOrganizations(req.query.userID)).status(200);
  })
);

Router.get(
  "/search",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await getUsersFromSearch(req.query.searchTerm)).status(200);
  })
);

Router.post(
  "/friend-request",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res
      .send(await sendFriendRequest(req.body.user_id, req.body.friend_id))
      .status(200);
  })
);

Router.put(
  "/friend-request/accept",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res
      .send(await acceptFriendRequest(req.body.user_id, req.body.friend_id))
      .status(200);
  })
);

Router.put(
  "/friend-request/reject",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res
      .send(await rejectFriendRequest(req.body.user_id, req.body.friend_id))
      .status(200);
  })
);

Router.delete(
  "/friend",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res
      .send(await removeFriend(req.body.user_id, req.body.friend_id))
      .status(200);
  })
);

export default Router;
