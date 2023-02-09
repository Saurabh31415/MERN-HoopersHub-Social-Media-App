import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user); // status code 200 indicates the request has succeeded.
} catch (err) {
        // 404 status code indicates that the server cannot find the requested resource.
        res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // using promise bcoz we r gonna make multiple API calls
    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
    // foramtting in proper way for the front-end
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
      const { id, friendId } = req.params;
      const user = await User.findById(id);
      const friend = await User.findById(friendId);

        // if the friendId is included in the main user's friend's ID then we make sure they are removed
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
          } else {
            user.friends.push(friendId);
            friend.friends.push(id);
          }
          await user.save();
          await friend.save();    
        
        // foramtting in proper way for the front-end
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
          );
          const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
          );
      
          res.status(200).json(formattedFriends);
        } catch (err) {
          res.status(404).json({ message: err.message });
        }
      };
