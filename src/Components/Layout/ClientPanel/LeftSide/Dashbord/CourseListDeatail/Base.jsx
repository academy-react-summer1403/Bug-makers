// pages/index.js

import CourseTable from "./Courses";
import Filters from "./Filters";
import Layout from "./Layout";


const Home=()=> {
  return (
    <Layout>
      <Filters />
      <CourseTable />
    </Layout>
  );
}
export default Home