import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
        // status code 201 indicates that the request has succeeded and has led to the creation of a resource
        res.status(201).json(post);
  } catch (err) {
        // status code 409 indicates that the request could not be processed because of conflict in the request
        res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
      const post = await Post.find();
      res.status(200).json(post);
    } catch (err) {
        // status code 404 indicates that the server cannot find the requested resource
        res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
    try {
      const { userId } = req.params;
      const post = await Post.find({ userId });
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

/* UPDATE */
/* UPDATE */
export const likePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const post = await Post.findById(id);
      const isLiked = post.likes.get(userId);// to find whethere the user has liked the post or not

      if (isLiked) {  // if liked then delete the user
        post.likes.delete(userId);
    } else { // if not then we are gonna set it
        post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate( // and finally isLiked we are gonna update 
    id,                                          // the Post by finding it first and adding new likes
    { likes: post.likes },
    { new: true }
  );

  res.status(200).json(updatedPost);
} catch (err) {
  res.status(404).json({ message: err.message });
}
};
