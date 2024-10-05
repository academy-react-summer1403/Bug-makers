import React from "react";
import HorizontalBlog from "./BlogsComponent/horizontalBlog/horizontalBlog";
import VerticalBlog from "./BlogsComponent/verticalBlog/verticalBlog";
import MinimalBlog from "./BlogsComponent/MinimalBlog/MinimalBlog";
import BlogDownLeft from "./BlogDown.jsx/BlogDownLeft/BlogDownLeft";
import BlogDownCenter from "./BlogDown.jsx/BlogDownCenter/BlogDownCenter";

const BlogPage = ()=>{
    return(
        <div className="w-full h-full">
            {/* <HorizontalBlog/> */}
            {/* <VerticalBlog/> */}
            {/* <MinimalBlog/> */}
        {/* <BlogDownLeft/>  */}
            <BlogDownCenter/>
        </div>
    )
}
export default BlogPage;