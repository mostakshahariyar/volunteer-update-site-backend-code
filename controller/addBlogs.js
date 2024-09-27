import { Blog } from "../model/blog.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import cloudinary from "cloudinary";

export const addBlogs = async (req, res) => {
  const { blogName, date, description } = req.body;
  const avatar = req.file.path;
  try {
    console.log(blogName, date, description, req.file);
    if (!blogName || !date || !description || !avatar) {
      throw new ApiError(400, "All fields are required");
    }
    const newBlog = new Blog({ blogName, date, description, avatar });
    await newBlog.save();
    res
      .status(201)
      .json(new ApiResponse(201, newBlog, "Blog add successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(new ApiResponse(200, blogs, "Blogs fetched"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete blogs
export const deleteBlog = async (req, res) => {
  const { imageURL, id } = req.query;
  const imageArr = imageURL.split("/");
  const image = imageArr[imageArr.length - 1].split(".");
  const imageName = image[0];
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new ApiError(404, "Blog not found");
    } else {
      cloudinary.v2.api
        .delete_resources([`avatar/${imageName}`], {
          type: "upload",
          resource_type: "image",
        })
        .then(console.log);
      await Blog.findByIdAndDelete(id);
      res
        .status(200)
        .json(
          new ApiResponse(200, blog, `${blog?.blogName} deleted successfully`)
        );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, blog, "Blog fetched successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const { id, blogName, date, description } = req.body;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }
    (blog.blogName = blogName),
      (blog.date = date),
      (blog.description = description);

    await blog.save();
    res
      .status(200)
      .json(
        new ApiResponse(200, blog, `${blog?.blogName} updated successfully`)
      );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
