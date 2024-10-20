import React, { useState, useEffect, useContext } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Progress from "../special-box/Progress";
import RatingStarts from "./RatingStarts";
import ReviewModal from "../modals/ReviewModal";
import { Button } from "@mui/material";
import Image from "next/image";
import axios from "@/lib/axios";
import TabCustom from "../constantElements/TabCustom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import IconButton from "@mui/material/IconButton";
import styles from "@/assets/css/Review.module.css";
import ButtonCustom from "@/components/constantElements/ButtonCustom";
import Skeleton from "@mui/material/Skeleton";
import { SnakebarContext } from "@/context/snakebar";
//context
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Review = ({ slug, ratingData, allCommentsCallBack }) => {
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);
  const mobile = useMediaQuery("(max-width:540px)");
  const [isClient, setIsClient] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [imageShow, setImageShow] = useState({
    data: [],
  });
  const [finalRate, setFinalRate] = useState();
  const [answers, setAnswers] = useState();
  const [allComments, setAllComments] = useState();
  const [ranges, setRanges] = useState();
  const [isExpanded, setIsExpanded] = useState([]);
  const [loading, setLoading] = useState(false);

  function toggleExpand(id) {
    setIsExpanded([...isExpanded, id]);
  }

  useEffect(() => {
    ratingData && ratingData(finalRate);
    allCommentsCallBack && allCommentsCallBack(allComments);
  }, [finalRate, ratingData, allComments, allCommentsCallBack]);

  useEffect(() => {
    axios.get(`api/product-actions/comment/${slug}`).then((response) => {
      setIsClient(true);
      setFinalRate(response.data.data.final_rate);
      setAnswers(response.data.data.comments);
      setAllComments(response.data.data.comment_count);
      setRanges(response.data.data.rates);
    });
  }, [slug, trigger]);

  const data = (value) => {
    setReviewData([...reviewData, value]);
  };

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        style={{
          display: `${answers && answers.length > 0 ? "block" : "none"}`,
        }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box
            sx={{
              p: 3,
              "@media(max-width:540px)": {
                p: 0,
              },
            }}
          >
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const uploadData = (data) => {
    if (data !== undefined) {
      setImageShow({ ...imageShow, data });
    }
  };

  function likeHandler(id) {
    axios
      .get(`api/product-actions/comment-like/${id}`)
      .then(() => {
        setTrigger((prevTrigger) => !prevTrigger);
        setOpenAlarm(true);
        setModes("success");
        setMessage("نظر پسندیده شد");
        setDuration(2000);
      })
      .finally(() => {});
  }

  function deslikeHandler(id) {
    axios.get(`api/product-actions/comment-dislike/${id}`).then(() => {
      setTrigger((prevTrigger) => !prevTrigger);
      setOpenAlarm(true);
      setModes("error");
      setMessage("نظر پسندیده نشد");
      setDuration(2000);
    });
  }

  return (
    <div className="mb-12 scroll-mt-32" id="review">
      {mobile ? (
        <TabCustom
          bold={true}
          value={[`نقد و بررسی`]}
          type="review"
          dataState={data}
          imageData={uploadData}
          slug={slug}
          className="flex items-center justify-between"
        />
      ) : (
        <TabCustom bold={true} value={[`نقد و بررسی`]} />
      )}
      <div
        className={`content sm:grid sm:grid-cols-4 flex flex-col-reverse pt-3`}
      >
        <div className="sm:col-span-1 sm:mt-0 mt-5">
          <div className="mb-10">
            <RatingStarts
              type="review"
              ratings={finalRate && finalRate}
              allComments={allComments}
            />
          </div>
          {ranges && (
            <div className="mb-10">
              <p className="text-sm mb-4">جزییات امتیاز دهی</p>

              <div
                className={`linear-progress grid grid-cols-1 gap-6 place-items-start`}
              >
                <Progress
                  range={48}
                  type="Linear"
                  rangesKey={ranges && Object.keys(ranges)}
                  rangesValue={ranges && Object.values(ranges)}
                />
              </div>
            </div>
          )}

          <div className="sm:block flex items-center justify-between">
            <p className="text-sm mb-4">درباره این کالا نظری دارید؟</p>
            {!mobile && (
              <ReviewModal
                dataState={data}
                imageData={uploadData}
                slug={slug}
              />
            )}
          </div>
        </div>
        <div className="sm:col-span-3">
          {isClient ? (
            <>
              {answers && answers.length > 0 ? (
                <div>
                  <div className="sm:px-8">
                    <div
                      className={`w-full h-auto border-b px-3 ${
                        imageShow.data.length > 0 ? "block" : "hidden"
                      }`}
                    >
                      <h2 className="mb-2">تصاویر خریداران</h2>
                      <ul className={`w-full flex`}>
                        {imageShow.data.map((i) => {
                          return (
                            <>
                              <li className="mb-2 ml-2">
                                <Image
                                  src={i}
                                  alt="customer photos"
                                  width={60}
                                  height={75}
                                  className="bg-stone-500 rounded-lg"
                                  style={{ width: "60px", height: "85px" }}
                                />
                              </li>
                            </>
                          );
                        })}
                      </ul>

                      <Button
                        sx={{
                          fontSize: "12px",
                          color: "var(--theme-color)",
                          my: 1,
                        }}
                      >
                        مشاهده بیشتر
                      </Button>
                    </div>
                    <ul className="w-full flex flex-col gap-4">
                      {answers &&
                        answers.map((question) => (
                          <li
                            key={question.id}
                            className="border-b last:border-b-0 pb-2 flex flex-col gap-4"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <AccountCircleIcon
                                  fontSize="large"
                                  sx={{
                                    color: "#b5b5b5",
                                  }}
                                />
                                <div className="text-sm">
                                  {question.user_name}
                                </div>
                              </div>
                              <div className="text-xs text-[#A0A6B0]">
                                {question.published}
                              </div>
                            </div>

                            <div
                              dangerouslySetInnerHTML={{
                                __html: question.body,
                              }}
                              className={`text-[#4F4F4F] text-sm ${
                                isExpanded.indexOf(question.id) == -1
                                  ? styles.truncate
                                  : styles.expanded
                              }`}
                            />

                            {!mobile
                              ? question.body.length > 450 &&
                                (isExpanded.indexOf(question.id) == -1 ? (
                                  <ButtonCustom
                                    text="ادامه"
                                    size="small"
                                    variant="text"
                                    chevron={true}
                                    onClick={() => toggleExpand(question.id)}
                                  />
                                ) : null)
                              : question.body.length > 250 &&
                                (isExpanded.indexOf(question.id) == -1 ? (
                                  <ButtonCustom
                                    text="ادامه"
                                    size="small"
                                    variant="text"
                                    chevron={true}
                                    onClick={() => toggleExpand(question.id)}
                                  />
                                ) : null)}

                            {question.answers.map((answer) => (
                              <div
                                key={answer.id}
                                className="flex flex-col gap-2"
                              >
                                <div className="text-xs text-[#A0A6B0]">
                                  پاسخ : &nbsp;
                                  {answer.user_name}
                                </div>
                                <div
                                  className={`text-[#4F4F4F] text-sm ${
                                    isExpanded.indexOf(answer.id) == -1
                                      ? styles.truncate
                                      : styles.expanded
                                  }`}
                                >
                                  {answer.body}
                                </div>
                                {answer.body.length > 450 &&
                                  (isExpanded.indexOf(answer.id) == -1 ? (
                                    <ButtonCustom
                                      text="ادامه"
                                      size="small"
                                      variant="text"
                                      chevron={true}
                                      onClick={() => toggleExpand(answer.id)}
                                    />
                                  ) : null)}
                              </div>
                            ))}

                            <div className="flex justify-end gap-8">
                              <div className="flex items-center gap-1">
                                <div>{question.like}</div>
                                <IconButton
                                  size="small"
                                  onClick={() => likeHandler(question.id)}
                                >
                                  <ThumbUpOffAltIcon fontSize="small" />
                                </IconButton>
                              </div>
                              <div className="flex items-center gap-1">
                                <div>{question.dislike}</div>
                                <IconButton
                                  size="small"
                                  onClick={() => deslikeHandler(question.id)}
                                >
                                  <ThumbDownOffAltIcon fontSize="small" />
                                </IconButton>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div
                  className={`empty flex items-center justify-center h-20 rounded-xl border`}
                >
                  <p className="text-red-500">هیچ نظری ثبت نشده است!!!</p>
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
  );
};

export default Review;
