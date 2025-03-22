import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    user: { 
        type: String,
        default:"Admin"
    },
    userImg: { 
        type: String,
        default: null 
    },
    postImg: { 
        type: String, 
        default: null 
    },
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true
    },
  },
  { timestamps: true }
);

const NewsPost = mongoose.model("News", newsSchema);
export default NewsPost;
