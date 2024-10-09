import React from "react";

import BDetailLikeSvg from "../BDcommon/BDetailLikeSvg";
import { Formik,Form } from "formik";
import BComment from "./BComment";

const BDetailCenter =()=>{
    return(
        <div className=" w-[60%] h-[108vw]">
            <div className="bg-white w-full h-[3vw] px-[1vw] rounded-[0.52vw] shadow-[-0.26vw_0.26vw_0.26vw_0_rgba(0,0,0,0.1)] text-[#5E5E5E] flex justify-between items-center text-[1vw]">
                <span>دسته‌بندی</span>
                <div className="w-[18%] h-full flex justify-between items-center">
                    <span className="text-[0.62vw] font-[400] text-gray-500"> ۲۵ اردیبهشت ۱۴۰۳</span>
                    |
                    <span className="text-[0.62vw] font-[400] text-gray-500">۳ روز پیش</span>
                </div>
            </div>
            <div className="relative bg-white w-full h-[80%] p-[0.26vw] mt-[0.78vw] rounded-[0.94vw] shadow-[0_0.26vw_0.26vw_0_rgba(0,0,0,0.2)] text-right">
                <div className="w-full h-[15.63vw] rounded-[0.94vw]  bg-gradient-to-b from-[#C4CDD5] to-[#F2F2F2]"></div>
                <div className="size-[6vw] absolute top-[14vw] left-[1vw] flex items-center flex-col">
                    <div className=" size-[4vw] rounded-full bg-gradient-to-b from-[#F2F2F2] to-[#C4CDD5]"></div>
                    <span className="mt-[0.6vw] text-gray-800 text-[0.6vw]">نام نویسنده</span>
                </div>
                <span className="text-[#5E5E5E] text-[1.2vw] mr-[0.6vw] pt-[0.6vw] block">عنوان خبر</span>
                <div className="w-full pl-[1vw] h-[3%] flex justify-end items-center mt-[1.5vw]">
                    <BDetailLikeSvg/>
                </div>
                <div className="text-[#555] w-full p-[1vw] mt-[2vw]">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem ad nisi perspiciatis corrupti. Tenetur voluptate accusantium sed, ab rerum earum cupiditate alias molestias delectus saepe, quis veritatis nobis nulla impedit amet, eum excepturi repellat. Aperiam totam ea dolore repellendus molestias illum sunt autem, laborum, consectetur dolores excepturi quas eaque ducimus cumque enim odio officia beatae asperiores obcaecati debitis quis aliquid vel praesentium. Fuga nostrum, eum expedita explicabo error consequatur minima laborum commodi rerum autem quisquam quidem, deleniti id magni est iste voluptas dignissimos reiciendis corrupti, adipisci ut! Cumque velit officiis doloremque sequi quas veniam itaque harum unde nesciunt laboriosam sunt, incidunt magnam facilis tempore rerum maiores labore odio expedita quidem inventore voluptas consequuntur hic mollitia. Vitae harum provident pariatur. Ea facere iste voluptas excepturi ullam nemo inventore, corrupti quas ratione illum, atque cupiditate dignissimos doloribus eius doloremque officia magni aut alias impedit veniam deleniti. Accusantium ab qui debitis iusto eaque laborum perferendis, sed impedit maiores eum soluta repellendus aperiam quis animi enim cupiditate, cumque sapiente facilis eos! Asperiores atque optio dignissimos, totam labore, eius debitis, modi cumque eligendi voluptates quaerat voluptatum suscipit? Hic doloremque, minus quibusdam ea nobis omnis numquam, vel totam aperiam adipisci odit error quia repellendus quidem, sint laudantium aliquam quaerat tempora fugit consectetur. Officia porro, consequatur in illo explicabo aut modi blanditiis aperiam ea eius assumenda, maxime illum impedit? Placeat modi corrupti ut aut quasi at facere labore impedit optio magnam cupiditate quod perferendis enim, vel, explicabo nobis laborum nostrum eligendi reprehenderit accusantium! Distinctio assumenda architecto accusamus perferendis ex quos, repudiandae consectetur. Dicta labore fugit sapiente cum illum iusto, reiciendis est repellendus velit maiores! Dicta cum quas veniam nisi, illo autem id voluptatibus blanditiis fugiat unde aperiam magni repellat ex cupiditate facere vitae debitis quos explicabo fugit! Voluptas, explicabo. Illum nesciunt distinctio similique id, cum neque blanditiis ex et repellat deleniti ratione delectus totam eum odio quae esse ducimus magnam ipsa tenetur quos fugiat? Ducimus officia accusantium obcaecati, doloremque adipisci nobis quis unde quod quas expedita quae recusandae illo molestiae impedit quisquam et dolorem incidunt. Temporibus, possimus blanditiis. Non, saepe. Impedit officia reiciendis placeat molestias, necessitatibus quas rem eveniet fugit quis possimus eius iusto, totam deserunt ipsam magni. Repellat voluptas iusto exercitationem rem dolores mollitia laborum earum ipsa excepturi, nam optio placeat minima sit non, quaerat soluta reiciendis minus numquam veritatis saepe inventore modi incidunt commodi ut! Dolorum, non placeat doloribus suscipit tempore excepturi laboriosam similique atque.</p>
                </div>
                <div className="w-[11.7vw] px-[0.5vw] h-[1.82vw] rounded-[1.04vw] flex items-center justify-between">
                    <hr className="w-[6%] border-[0.1vw]"/>
                    <div className="text-gray-400 text-[0.73vw] text-center leading-[1.5vw] w-[9.79vw]  h-full rounded-[1.04vw] border-[#C4CDD5] border-[2px]">
                    شاید علاقمند باشید:
                    </div>
                </div>
                <ul className="w-1/5 mt-[0.5vw] mr-[2.08vw] h-[7vw] list-disc text-[#C4CDD5]">
                    <li className=" hover:text-gray-600 cursor-pointer">عنوان خبر</li>
                    <li className=" hover:text-gray-600 cursor-pointer">عنوان خبر</li>
                    <li className=" hover:text-gray-600 cursor-pointer">عنوان خبر</li>
                    <li className=" hover:text-gray-600 cursor-pointer">عنوان خبر</li>
                    <li className=" hover:text-gray-600 cursor-pointer">عنوان خبر</li>
                </ul>
                <div className="text-[0.8vw] gap-[1.5vw] text-gray-800 w-full h-[1.46vw] px-[1vw] flex justify-end">
                    <div className="flex justify-evenly h-full w-[7%] items-center">
                        <span>52</span>
                        <svg className="cursor-pointer"  width="1.51vw" height="1.3vw" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.5897 9.30813C25.4917 8.04276 23.8987 7.31611 22.2233 7.31646L17.607 7.31646L17.9959 4.95446C18.2802 3.23526 17.262 1.56728 15.6029 1.03453C13.9438 0.501792 12.1448 1.26517 11.3752 2.82855L9.16016 7.31646H6.02167C2.82756 7.32029 0.239177 9.9087 0.235352 13.1028V18.8892C0.239178 22.0834 2.82756 24.6718 6.02167 24.6756L21.4133 24.6756C24.2916 24.6638 26.7281 22.5477 27.1429 19.6993L27.9587 13.9129C28.1912 12.2521 27.6918 10.5722 26.5897 9.30813ZM2.54988 18.8892V13.1028C2.54988 11.1854 4.10425 9.63101 6.02167 9.63101H8.33619V22.361H6.02167C4.10425 22.361 2.54988 20.8067 2.54988 18.8892ZM25.6616 13.5877L24.8446 19.3741C24.5977 21.0818 23.1386 22.3519 21.4133 22.361H10.6507V9.32318C10.7598 9.22816 10.8501 9.11354 10.9169 8.98525L13.4501 3.85274C13.6429 3.50513 13.9907 3.27115 14.3853 3.22371C14.7799 3.17627 15.1733 3.32114 15.4429 3.61318C15.6731 3.88087 15.772 4.23727 15.7126 4.58529L15.1016 8.28857C15.0473 8.62346 15.1427 8.9653 15.3625 9.22369C15.5824 9.48207 15.9045 9.63097 16.2438 9.63101H22.2233C23.2293 9.63101 24.1853 10.0669 24.8447 10.8259C25.5039 11.5845 25.802 12.5921 25.6616 13.5877Z" fill="#7F7F7F"/>
                        </svg>

                    </div>
                
                    |
                    <div className="flex justify-evenly h-full w-[7%] items-center">
                        <span>52</span>
                        <svg className="cursor-pointer" width="1.51vw" height="1.3vw" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.2215 11.2368L27.4056 5.45041C26.9912 2.6042 24.558 0.488758 21.6818 0.474121H6.29022C3.09611 0.477947 0.507732 3.06636 0.503906 6.2605V12.0469C0.507732 15.241 3.09611 17.8294 6.29022 17.8332H9.42872L11.6437 22.3212C12.4134 23.8845 14.2123 24.6479 15.8714 24.1152C17.5305 23.5824 18.5488 21.9144 18.2644 20.1952L17.8756 17.8332H22.4919C24.1682 17.8332 25.7619 17.1065 26.8609 15.8411C27.9597 14.576 28.4562 12.8963 28.2215 11.2368ZM6.29022 2.78867H8.60475V15.5187H6.29022C4.37281 15.5187 2.81843 13.9643 2.81843 12.0469V6.2605C2.81843 4.34306 4.3728 2.78867 6.29022 2.78867ZM25.1119 14.3244C24.4526 15.083 23.4969 15.5186 22.4919 15.5187H16.5123C16.1724 15.5187 15.8498 15.668 15.6299 15.927C15.4101 16.1857 15.3151 16.5282 15.3701 16.8635L15.9811 20.5667C16.0406 20.9148 15.9417 21.2712 15.7115 21.5388C15.4411 21.8304 15.0471 21.9743 14.6524 21.9257C14.2577 21.8771 13.9103 21.6419 13.7187 21.2935L11.1854 16.1645C11.1186 16.0362 11.0283 15.9216 10.9193 15.8265V2.78867H21.6818C23.4094 2.79498 24.8717 4.06577 25.1189 5.7756L25.9359 11.562C26.0746 12.5587 25.774 13.5665 25.1119 14.3244Z" fill="#7F7F7F"/>
                        </svg>
                    </div>
                </div>
                <Formik>
                    <Form className="w-full h-[14vw] px-[2vw] mt-[1vw]">
                        <textarea required name="CommentArea" id="" placeholder="دیدگاه خود را وارد کنید" className="max-h-[14vw] min-h-[14vw] p-[0.5vw] bg-white border-[0.15vw] text-gray-600 border-[#C4CDD5] w-full h-[9.58vw] rounded-[0.57vw]"></textarea>
                        <button className="mt-[0.7vw] rounded-[0.42vw] bg-[#C4CDD5] cursor-pointer w-[6.61vw] h-[1.82vw] leading-[0.8vw]" type="submit">ثبت نظر</button>
                    </Form>
                </Formik>
            </div>

            <BComment/>
            

        </div>
    )
}
export default BDetailCenter