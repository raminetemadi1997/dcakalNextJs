import React, { useState, useEffect } from "react";
import QuestionModal from "../modals/QuestionModal";
import axios from "@/lib/axios";
import TabCustom from "../constantElements/TabCustom";
import ButtonCustom from "@/components/constantElements/ButtonCustom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Skeleton from "@mui/material/Skeleton";
import styles from "@/assets/css/Question.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AnswerQuestion from "../modals/AnswerQuestion";

import "../../styles/styles.css";
import "swiper/css";

const Question = ({ slug }) => {
  const mobile = useMediaQuery("(max-width:540px)");
  const [question, setQuestion] = useState();
  const [isClient, setIsClient] = useState(false);
  const [changeView, setChangeView] = useState(false);

  useEffect(() => {
    axios.get(`api/product-actions/forum/${slug}`).then((response) => {
      setIsClient(true);
      setQuestion(response.data.data);
    });
  }, [slug]);

  return (
    <>
      <div className="mb-10 scroll-mt-32" id="question">
        {!mobile ? (
          <TabCustom bold={true} value={[`پرسش و پاسخ`]} />
        ) : changeView ? (
          <div className="pb-2 border-b flex gap-2 items-center">
            <IconButton size="small" onClick={() => setChangeView(false)}>
              <ArrowForwardIcon sx={{ color: "#A9A6A6" }} />
            </IconButton>
            <div className="text-sm text-[#A9A6A6]">
              {question.length} پرسش و پاسخ
            </div>
          </div>
        ) : (
          <TabCustom
            bold={true}
            value={[`پرسش و پاسخ`]}
            type="question"
            slug={slug}
            className="flex items-center justify-between"
          />
        )}

        <div
          className={`content sm:grid sm:grid-cols-4 pt-3 flex flex-col-reverse`}
        >
          {!mobile && (
            <div className="sm:col-span-1 sm:block flex items-center justify-between sm:mt-0 mt-5">
              <p className="text-sm sm:mb-4 mb-0">
                درباره این کالا پرسشی دارید؟
              </p>
              <QuestionModal slug={slug} />
            </div>
          )}
          <div className="sm:col-span-3">
            {isClient ? (
              <>
                {question.length > 0 ? (
                  <div>
                    <div className="mb-2">
                      {!mobile ? (
                        <ul className="w-full flex flex-col gap-4">
                          {question
                            ? question.slice(0 , changeView ? question.length : 2).map((question) => (
                                <li
                                  key={question.id}
                                  className="border-b last:border-b-0 pb-2 flex flex-row gap-4"
                                >
                                  <HelpOutlineIcon
                                    fontSize="large"
                                    sx={{
                                      color: "#b5b5b5",
                                    }}
                                  />
                                  <div className="flex flex-col gap-2">
                                    <div
                                      className={`sm:text-base text-sm text-justify ${styles.truncate}`}
                                    >
                                      {question.body}
                                    </div>
                                    {question.answers.map((answer) => (
                                      <div
                                        key={answer.id}
                                        className="flex flex-col gap-2"
                                      >
                                        <div className="text-xs text-[#A0A6B0]">
                                          پاسخ: {answer.user_name}
                                        </div>
                                        <div className="text-sm text-[#62666D] text-justify">
                                          {answer.body}
                                        </div>
                                      </div>
                                    ))}
                                    {question.answers.length > 0 ? (
                                      <AnswerQuestion text="ثبت پاسخ جدید" id={question.id} />
                                    ) : (
                                      <AnswerQuestion text="پاسخ جدید" id={question.id} />
                                    )}
                                  </div>
                                </li>
                              ))
                            : null}
                        </ul>
                      ) : changeView ? (
                        <>
                          <ul className="w-full flex flex-col gap-2">
                            {question.map((question) => (
                              <li
                                key={question.id}
                                className="border-b last:border-b-0 pb-2 flex flex-row gap-2"
                              >
                                <HelpOutlineIcon
                                  fontSize="large"
                                  sx={{
                                    color: "#b5b5b5",
                                  }}
                                />
                                <div className="flex flex-col gap-2">
                                  <div
                                    className={`sm:text-base text-sm text-justify ${styles.truncate}`}
                                  >
                                    {question.body}
                                  </div>
                                  {question.answers.map((answer) => (
                                    <div
                                      key={answer.id}
                                      className="flex flex-col gap-2"
                                    >
                                      <div className="text-xs text-[#A0A6B0]">
                                        پاسخ: {answer.user_name}
                                      </div>
                                      <div className="text-sm text-[#62666D] text-justify">
                                        {answer.body}
                                      </div>
                                    </div>
                                  ))}
                                  {question.answers.length > 0 ? (
                                    // <ButtonCustom
                                    //   text="ثبت پاسخ جدید"
                                    //   variant="text"
                                    //   fontSize="13px"
                                    //   chevron={true}
                                    // />
                                    <AnswerQuestion text="ثبت پاسخ جدید" id={question.id}/>
                                  ) : (
                                    // <ButtonCustom
                                    //   text="پاسخ جدید"
                                    //   variant="text"
                                    //   fontSize="13px"
                                    //   chevron={true}
                                    // />
                                    <AnswerQuestion text="ثبت پاسخ" id={question.id} />
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <Swiper
                          slidesPerView={1.3}
                          spaceBetween={15}
                          className={`mySwiper`}
                          
                        >
                          {question.map((question) => (
                            <SwiperSlide
                              key={question.id}
                              className={`border rounded-lg p-2 ${styles.slide}`}
                            >
                              <div className="flex flex-row gap-2">
                                <HelpOutlineIcon
                                  fontSize="large"
                                  sx={{
                                    color: "#b5b5b5",
                                  }}
                                />
                                <div className="flex flex-col gap-2">
                                  <div
                                    className={`sm:text-base text-sm ${styles.truncate} min-h-[60px] text-justify`}
                                  >
                                    {question.body}
                                  </div>
                                  {question.answers.map((answer) => (
                                    <div
                                      key={answer.id}
                                      className="flex flex-col gap-2"
                                    >
                                      <div className="text-xs text-[#A0A6B0]">
                                        پاسخ: {answer.user_name}
                                      </div>
                                      <div
                                        className={`text-sm text-[#62666D] ${styles.truncate} min-h-[60px] text-justify`}
                                      >
                                        {answer.body}
                                      </div>
                                    </div>
                                  ))}
                                  {question.answers.length > 0 ? (
                                    // <ButtonCustom
                                    //   text="ثبت پاسخ جدید"
                                    //   variant="text"
                                    //   fontSize="13px"
                                    //   chevron={true}
                                    // />
                                    <AnswerQuestion text="ثبت پاسخ جدید" id={question.id}/>
                                  ) : (
                                    // <ButtonCustom
                                    //   text="پاسخ جدید"
                                    //   variant="text"
                                    //   fontSize="13px"
                                    //   chevron={true}
                                    // />
                                    <AnswerQuestion text="ثبت پاسخ" id={question.id} />
                                  )}
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      )}
                    </div>
                    {mobile && changeView ? (
                      <div className="flex justify-end">
                        <QuestionModal slug={slug} />
                      </div>
                    ) : (
                      question.length > 2 &&
                      <ButtonCustom
                        text=" مشاهده همه سوالات"
                        variant="text"
                        justifyContent="end"
                        chevron={true}
                        onClick={() => setChangeView(true)}
                      />
                    )}
                  </div>
                ) : (
                  <div
                    className={`empty flex items-center justify-center h-20 rounded-xl border`}
                  >
                    <p className="text-red-500 sm:text-base text-sm">
                      هیچ پرسشی ثبت نشده است!!!
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="w-auto sm:h-96 h-[187px]">
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "100%" }}
                  className="sm:h-96 h-[187px]"
                  animation="wave"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
