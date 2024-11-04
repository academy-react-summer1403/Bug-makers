import React, { useState } from 'react'
import {Modal, ModalContent,  CardHeader, CardBody, CardFooter, Divider, Image , ModalHeader,Card  , ModalBody, ModalFooter, Button, useDisclosure , Tab ,Tabs, Input} from "@nextui-org/react";
import { CiSearch } from 'react-icons/ci';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getCourseListWithPagination } from '../../../Core/Services/Api/CoursePage/getCourseListWithPagination';
import SearchBox from '../SearchBox/SearchBox';
import { getSearch, getSearchBlog } from '../../../Core/Services/Api/CoursePage/search';
import { useSelector } from 'react-redux';
const SearchModal = () => {
      const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [queryValue, setQueryValue] = useState(''); 
  const [queryValueBlog, setQueryValueBlog] = useState(''); 

      const { isLoading, error, data } = useQuery(
        ['getCourses', queryValue], 
        () => getSearch(queryValue), 
        {
          keepPreviousData: true, 
        }
      );

      const handleSearch = (e) => {
        setQueryValue(e.target.value); 
      };


      const { data : blog } = useQuery(
        ['getBloglist', queryValueBlog], 
        () => getSearchBlog(queryValueBlog), 
        {
          keepPreviousData: true, 
        }
      );

      
      const handleSearchBlog = (e) => {
        setQueryValueBlog(e.target.value); 
      };
      const dark = useSelector((state) => state.darkMood);
  return (
    <>
      <Button
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        size="sm"
        className="cursor-pointer max-[710px]:w-[30px] max-[710px]:h-[30px] max-[625px]:left-[80px] max-[465px]:left-[40px] max-[394px]:w-7 max-[394px]:h-7 /* end responsive */ search border rounded-[15px] w-[45px] h-[30px] absolute left-[210px]  shadow-custom-shadow"
        onPress={onOpen}
      >
        <CiSearch className="max-[710px]:w-4 max-[710px]:h-4 /*end responsive*/ m-auto w-5 h-5 mt-1 searchIcon" />
      </Button>
      <Modal
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        className="fixed top-10"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1  mr-4">
                جستجو
              </ModalHeader>
              <ModalBody>
                <div className="flex  w-full flex-col">
                  <Tabs aria-label="Options">
                    <Tab key="blog" title="مقالات">
                      <Card
                        style={{
                          background: dark.bgLow,
                          color: dark.textHigh,
                        }}
                      >
                        <CardBody >
                          <CardHeader>
                            <Input
                              type="text"
                              label="دنبال چی میگردی"
                              className="w-full outline-none"
                              onChange={handleSearchBlog}
                            />
                          </CardHeader>
                        </CardBody>
                        {blog?.news.map((item) => {
                          return (
                            <Card
                              style={{
                                background: dark.bgLow,
                                color: dark.textHigh,
                              }}
                              className="max-w-[400px]"
                              key={item.id}
                            >
                              <CardHeader className="flex gap-3">
                                <Image
                                  height={40}
                                  radius="sm"
                                  src={item.currentImageAddressTumb}
                                  width={40}
                                />
                                <div className="flex flex-col">
                                  <p className="text-md">{item.title}</p>
                                </div>
                              </CardHeader>
                              <Divider />
                              <CardBody>
                                <p>{item.miniDescribe}</p>
                              </CardBody>
                              <Divider />
                              <CardFooter>
                                <Link
                                  to={`BlogDetail/` + item.id}
                                  onClick={() => isOpen(false)}
                                  className="text-blue-600"
                                >
                                  مشاهده جزییات این مقاله
                                </Link>
                              </CardFooter>
                            </Card>
                          );
                        })}
                      </Card>
                    </Tab>
                    <Tab key="course" title="دوره ها">
                      <Card
                        style={{
                          background: dark.bgLow,
                          color: dark.textHigh,
                        }}
                      >
                        <CardHeader>
                          <Input
                            type="text"
                            label="دنبال چی میگردی"
                            className="w-full outline-none"
                            onChange={handleSearch}
                          />
                        </CardHeader>
                        <CardBody
                          style={{
                            background: dark.bgLow,
                            color: dark.textHigh,
                          }}
                        >
                          {data?.courseFilterDtos.map((item) => {
                            return (
                              <Card
                                className="max-w-[400px]"
                                key={item.courseId}
                              >
                                <CardHeader className="flex gap-3">
                                  <Image
                                    height={40}
                                    radius="sm"
                                    src={item.tumbImageAddress}
                                    width={40}
                                  />
                                  <div className="flex flex-col">
                                    <p className="text-md">{item.title}</p>
                                  </div>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                  <p>{item.describe}</p>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                  <Link
                                    to={`CourseDetail/` + item.courseId}
                                    onClick={() => isOpen(false)}
                                    className="text-blue-600"
                                  >
                                    مشاهده جزییات این دوره
                                  </Link>
                                </CardFooter>
                              </Card>
                            );
                          })}
                        </CardBody>
                      </Card>
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SearchModal