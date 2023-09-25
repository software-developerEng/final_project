const mongoose = require('mongoose');
const User = require('../models/users.model')
const Organization = require('../models/organizations.model')
const Post = require('../models/post.model')
const Like = require('../models/likes.model')
const Comment = require('../models/comments.model')
const Follower = require('../models/followers.model')
const TimeSlot  = require('../models/dates.model');

const AvailableTimeSlot = require("../models/availableTimeSlot.model")
const Booking = require("../models/booking.model")

// ------------ POSTING 
const posting = async (req, res) => {
  try {
    const { caption } = req.body;
    const userId = req.user._id;

    if (!Array.isArray(req.files)) {
      return res.status(400).json({ message: "Invalid files data" });
    }

    const pictureFiles = req.files;

    const pictureUrls = pictureFiles.map((file) => file.path);

    const newPost = new Post({
      user_id: userId,
      userModel: "User",
      caption,
      pictures: pictureUrls,
    });

    await newPost.save();

    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};







// ------------ LIKING / UNLIKING 
const likingPost = async (req, res) => {
    try {
      const userId = req.user._id;
      const postId = req.params.postid;
  
      const post = await Post.findOne({ _id: postId });
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      const like = await Like.findOne({ user_id: userId, post_id: postId });
  
      if (like) {
        await Like.findByIdAndDelete(like._id);
  
        post.likes -= 1;
        await post.save();
  
        return res.status(200).json({ message: "Post unliked successfully", likeCount: post.likes });
      }
  
      const newLike = new Like({ user_id: userId, post_id: postId });
      await newLike.save();
  
      post.likes += 1;
      await post.save();
  
      return res.status(200).json({ message: "Post liked successfully", likeCount: post.likes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};


// ------------ COMMENTING
const comment = async (req,res)=> {
    try {
        const userId = req.user._id;
        const postId = req.params.postid;
    
        const post = await Post.findOne({ _id: postId });
    
        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }

        const newComment = new Comment({ user_id: userId, post_id: postId });
        await newComment.save();
    
        post.likes += 1;
        await post.save();
        
    } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
    }
}


// ------------ DELETING COMMENTING
const deletingComment = async (req, res) => {
    try {
        const userId = req.user._id;
        const postId = req.params.postid;

        const comment = await Comment.findOne({ post_id: postId, user_id: userId });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        await Comment.findByIdAndDelete(comment._id);

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// ------------ FOLLOW / UNFOLLOW USER
const followUnfollow = async (req, res) => {
  const user = req.user._id;
  const otherUserOrOrganizationId = req.body.user;

  try {
    let existingFollower = await Follower.findOne({ follower_id: user });

    if (!existingFollower) {
      existingFollower = new Follower({
        follower_id: user,
        followed_id: [otherUserOrOrganizationId],
      });
    } else {

      const followedIndex = existingFollower.followed_id.findIndex(
        (id) => id.equals(otherUserOrOrganizationId)
      );

      if (followedIndex !== -1) {
       
        existingFollower.followed_id.splice(followedIndex, 1);
      } else {
        existingFollower.followed_id.push(otherUserOrOrganizationId);
      }
    }

    await existingFollower.save();
    res.status(200).json({ message: 'Operation completed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// ------------ get followers / followings
const getFollows = async (req, res) => {

  try {
    const userId = req.user._id;
    let user;

    user = await User.findById(userId).select('-password');

    if (!user) {
      user = await Organization.findById(userId).select('-password');
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followers = await Follower.find({ followed_id: userId })
      .populate("follower_id", '-password')
      .exec();

    const followings = await Follower.find({ follower_id: userId })
      .populate("followed_id", '-password')
      .exec();

    res.status(200).json({ followers, followings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};





// ------------ GETTING USER PROFILE INFORMATION
const gettingProfileInfo = async (req, res) => {
    const userId = req.user._id;
    let user
    try {
         user = await User.findById(userId);

        if (!user) {
          user = await Organization.findById(userId);
    
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

      const {
          
            email,
            phone_number,
            username,
            first_name,
            last_name,
            skills,
            profile_pic,
            user_type,            
            bio,
            address,
            gender,
            age,
            points,
            createdAt
        } = user;
 
        res.status(200).json({
            email,
            phone_number,
            username,
            first_name,
            last_name,
            skills,
            profile_pic,
            user_type,
            bio,
            address, 
            gender,
            age,
            points,   
            createdAt,
            _id: userId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// ------------ ADD SKILLS
const addSkills = async (req, res) => {
    const userId = req.user._id;
    const { skills } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.skills = skills;

        await user.save();

        res.status(200).json({ message: "Skills added successfully", skills: user.skills });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// ------------ SEARCHING FOR AN ORG / USER 
const searchForUser = async (req, res) => {
  const query = req.params.query; 

  try {
    let users = [];
    let organizations = [];

  
    const projection = { password: 0 };

    users = await User.find(
      {
        $or: [
          { name: { $regex: '^' + query, $options: 'i' } },
          { username: { $regex: '^' + query, $options: 'i' } },
        ],
      },
      projection 
    );

    if (users.length === 0) {
      organizations = await Organization.find(
        {
          $or: [
            { name: { $regex: '^' + query, $options: 'i' } },
            { location: { $regex: '^' + query, $options: 'i' } },
          ],
        },
        projection 
      );
    }

    if (users.length === 0 && organizations.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      message: "Search Results",
      users,
      organizations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


 
  

  // book schedule
  const bookSchedule = async (req, res) => {
    try {
      const userId = req.user._id; 
      const { startTime, endTime } = req.body;
  
      const timeSlot = await TimeSlot.findOne({ startTime, endTime });
  
      if (!timeSlot) {
        return res.status(404).json({ message: 'Time slot not found' });
      }
  
      if (timeSlot.isReserved) {
        return res.status(400).json({ message: 'Time slot is already reserved' });
      }
  
      timeSlot.isReserved = true;
      timeSlot.reservedBy.push({ user: userId });
  
      await timeSlot.save();
  
      res.status(200).json({ message: 'Time slot reserved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



// get schedule
const getSchedule = async (req, res) => {
  try {
    const allTimeSlots = await TimeSlot.find();

    const reservedTimeSlots = allTimeSlots.filter((timeSlot) => timeSlot.isReserved);
    const availableTimeSlots = allTimeSlots.filter((timeSlot) => !timeSlot.isReserved);

    res.status(200).json({
      message: 'Schedule retrieved successfully',
      reservedTimeSlots,
      availableTimeSlots,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// get organizations
const getAllOrgs = async (req, res) => {
  const userId = req.user._id;

  try {
    const organizations = await Organization.find();

    if (!organizations || organizations.length === 0) {
      return res.status(404).json({ message: 'No organizations found' });
    }

    res.status(200).json({ message: 'Organizations found', organizations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrg = async (req, res) => {
  // const userId = req.user._id;
  // const orgId = req.body.orgId
  const orgId = req.params.orgId; 
  console.log({orgId});
  try {
    const organizations = await Organization.findById(orgId);

    if (!organizations || organizations.length === 0) {
      return res.status(404).json({ message: 'No organizations found' });
    }

    res.status(200).json({ message: 'Organizations found', organizations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// GET ALL POSTS
const getAllPosts = async (req, res) => {
  const userId = req.user._id;

  try {
    const followers = await Follower.findOne({ follower_id: userId });

    if (!followers) {
      return res.status(404).json({ message: 'User not found or not following anyone.' });
    }

    const followedUsers = followers.followed_id;

    const posts = await Post.find({ user_id: { $in: followedUsers } })
      .populate('likes')
      .populate({
        path: 'user_id',
        model: 'User', 
        select: 'username profile_pic', 
      });

    const postIds = posts.map(post => post._id);

    const comments = await Comment.find({ post_id: { $in: postIds } })
      .populate('user_id');

    const postsWithComments = posts.map(post => ({
      ...post.toObject(),
      comments: comments.filter(comment => comment.post_id.toString() === post._id.toString())
    }));

    res.status(200).json(postsWithComments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new available time slot for a specific organization
const postTimeSlotForOrganization = async (req, res) => {
  try {
    const organizationId = req.params.organizationId;
    const organization = await Organization.findById(organizationId);

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const timeSlotData = req.body;
    timeSlotData.organization = organizationId;
    
    const availableTimeSlot = new AvailableTimeSlot(timeSlotData);
    await availableTimeSlot.save();

    res.status(201).json(availableTimeSlot);
  } catch (err) {
    res.status(500).json({ error: 'Unable to create available time slot' });
  }
}
// Get the available time slot for a specific organization
const getTimeSlotForOrganization = async (req, res) => {
  try {
    const organizationId = req.params.organizationId;
    const organization = await Organization.findById(organizationId);

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    // const timeSlotData = req.body;
    const availableTimeSlot = await AvailableTimeSlot.find({ organization: organizationId });
    // timeSlotData.organization = organizationId;
    
    // const availableTimeSlot = new AvailableTimeSlot(timeSlotData);
    // await availableTimeSlot.save();

    res.status(201).json(availableTimeSlot);
  } catch (err) {
    res.status(500).json({ error: 'Unable to create available time slot' });
  }
}
// Get all appointments for a specific organization
const getAllAppointmentsForSpecificOrganization= async (req, res) => {
  try {
    const organizationId = req.params.organizationId;
    const appointments = await Booking.find({ organization: organizationId });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch appointments' });
  }
}

const createNewAppointment = async (req, res) => {
  try {
    const appointment = new Booking(req.body);
    console.log({appointment});
    await appointment.save();
    console.log("test");
    // Mark the corresponding time slot as unavailable
    await AvailableTimeSlot.findByIdAndUpdate(
      appointment.timeSlot,
      { isAvailable: false }
    );
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: 'Unable to create appointment' });
  }
}







// forgot password
module.exports = {
    posting,
    likingPost,
    comment,
    deletingComment,
    followUnfollow,
    gettingProfileInfo,
    addSkills,
    searchForUser,
    bookSchedule,
    getSchedule,
    getAllOrgs,
    getAllPosts,
  getFollows,
  postTimeSlotForOrganization,
  getTimeSlotForOrganization,
  getAllAppointmentsForSpecificOrganization,
  createNewAppointment,
  getOrg
}