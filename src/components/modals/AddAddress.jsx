import React, { useState, useRef, useEffect, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import ButtonCustom from "@/components/constantElements/ButtonCustom";
import TextFieldCustom from "@/components/constantElements/TextFieldCustom";
import AutocompleteCustom from "../constantElements/AutocompleteCustom";
import axios from "@/lib/axios";
import CheckboxCustom from "../constantElements/CheckboxCustom";
import TextareaCustom from "../constantElements/TextareaCustom";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { SnakebarContext } from "@/context/snakebar";
import styles from "@/assets/css/category/MainCategory.module.css"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 540,
  "@media (max-width: 540px)": {
    width: 350,
  },
  bgcolor: "background.paper",
  border: "1px solid #e5e7eb",
  boxShadow: 24,
  p: 1,
  borderRadius: ".75rem",
};

const AddAddress = ({
  openModal,
  setOpen,
  provinces,
  onClick,
  editData,
  onChangeHanler,
  type,
  userData = null,
  ...props
}) => {


  
  //snakebar context
  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);

  //user auth
  const [cities, setCities] = useState([]);
  const [area, setArea] = useState([]);
  const [delivered, setDelivered] = useState(false);
  const [textArea, setTextArea] = useState(null);
  const [editAddress, setEditAddress] = useState(false);

  const [state, setState] = useState({
    firstName: null,
    lastName: null,
    province_id: null,
    city_id: null,
    area_id: null,
    postal_code: null,
    no: null,
    unit: null,
    mobile: null,
    phone: null,
    self_recipient: delivered ? 1 : 0,
  });


  

  useEffect(() => {
    if (userData) {
      if (delivered) {
        setState((prev) => ({
          ...prev,
          firstName: userData.data.first_name,
          lastName: userData.data.last_name,
          mobile:`0${userData.data.mobile}`,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          firstName: null,
          lastName: null,
          mobile: null,
        }));
      }

      if (editData) {
        setTextArea(editData.address);
        setState((prev) => ({
          ...prev,
          mobile: editData.mobile,
          postal_code: editData.postal_code,
          no: editData.no,
          unit: editData.unit,
          firstName: editData.recipient_name.split(" ")[0],
          lastName: editData.recipient_name.split(" ")[1],
          phone: editData.phone,
          province: editData.province,
          city: editData.city,
          area: editData.area,
          province_id: editData.province_id,
          city_id: editData.city_id,
          area_id: editData.area_id,
        }));
      }
    }
  }, [userData, delivered, editData]);


  

  const getCityHandler = (provinceSelect) => {
    if (provinceSelect) {
      axios.get(`api/city/${provinceSelect.id}`).then((response) => {
        setCities(response.data.data);
        setState((prev) => ({
          ...prev,
          province_id: provinceSelect.id,
        }));
      });
    } else {
      setCities([]);
      setState((prev) => ({
        ...prev,
        province_id: null,
        city_id: null,
        area_id: null,
      }));
    }
  };

  const getAreaHandler = (areaSelect) => {
    if (areaSelect) {
      if (areaSelect.has_area == 1) {
        axios.get(`api/area/${areaSelect.id}`).then((response) => {
          setArea(response.data.data);
          setState((prev) => ({
            ...prev,
            city_id: areaSelect.id,
          }));
        });
      } else {
        setState((prev) => ({
          ...prev,
          city_id: areaSelect.id,
        }));
      }
    } else {
      setArea([]);
      setState((prev) => ({
        ...prev,
        city_id: null,
        area_id: null,
      }));
    }
  };

  const submitForm = async (event) => {
    axios.get("/sanctum/csrf-cookie");
    event.preventDefault();
    if (!editData) {
      axios
        .post("api/add-address", {
          first_name: state.firstName,
          last_name: state.lastName,
          province: state.province_id,
          city: state.city_id,
          area: state.area_id,
          postal_code: state.postal_code,
          address: textArea,
          no: state.no,
          unit: state.unit,
          mobile: state.mobile,
          phone: state.phone,
        })
        .then((response) => {
          onChangeHanler(response.config.data);
          setOpenAlarm(true);
          setMessage("آدرس شما با موفقیت ایجاد شد");
          setModes("success");
          setDuration(3000);
        })
        .catch((error) => {
          setOpenAlarm(true);
          setMessage(error.response.data.message);
          setModes("error");
          setDuration(3000);
        });
    } else {
      axios
        .post(
          type == "dashboard"
            ? `api/dashboard/update-address/${editData.id}`
            : `api/update-address/${editData.id}`,
          {
            first_name: state.firstName,
            last_name: state.lastName,
            recipient_first_name: state.firstName,
            recipient_last_name: state.lastName,
            province: editAddress ? state.province_id : editData.province_id,
            city: editAddress ? state.city_id : editData.city_id,
            area: editAddress ? state.area_id : editData.area_id,
            postal_code: state.postal_code,
            address: textArea,
            no: state.no,
            unit: state.unit,
            mobile: state.mobile,
            phone: state.phone,
            self_recipient: state.self_recipient,
          }
        )
        .then((response) => {
          onChangeHanler(response.config.data);
          setOpenAlarm(true);
          setMessage("آدرس شما با موفقیت ویرایش شد");
          setModes("info");
          setDuration(3000);
        })
        .catch((error) => {});
    }
  };

  const cancelEditHalnder = (event) => {
    event.preventDefault();
    setEditAddress(false);
  };

  const editHalnder = (event) => {
    event.preventDefault();
    setEditAddress(true);
  };

  return (
    userData && (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        // onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        {...props}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <form onSubmit={submitForm}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom="1px solid #e5e7eb"
                paddingBottom=".75rem"
                mb={2}
                component="div"
              >
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="p"
                  sx={{
                    fontSize: 14,
                  }}
                >
                  آدرس جدید خود را ثبت کنید
                </Typography>
                <IconButton onClick={onClick}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <div className={`${styles.items} h-[450px] overflow-y-auto pl-2`}>
                <div className="grid grid-cols-2 gap-4 mb-4 border-b pb-4">
                  <CheckboxCustom
                    className="col-span-2"
                    label="تحویل گیرنده خودم هستم"
                    onChange={() => setDelivered(!delivered)}
                    checked={delivered}
                  />
                  {!delivered && (
                    <>
                      <TextFieldCustom
                        size="small"
                        label="نام تحویل گیرنده"
                        value={state.firstName}
                        required={true}
                        onChange={(event) =>
                          setState((prev) => ({
                            ...prev,
                            firstName: event.target.value,
                          }))
                        }
                        // value={name ? name : ""}
                        //   focused={phoneNumber && true}
                      />
                      <TextFieldCustom
                        size="small"
                        label="نام خانوادگی تحویل گیرنده"
                        value={state.lastName}
                        required={true}
                        onChange={(event) =>
                          setState((prev) => ({
                            ...prev,
                            lastName: event.target.value,
                          }))
                        }
                      />

                      <TextFieldCustom
                        size="small"
                        label="شماره همراه"
                        type="number"
                        required={true}
                        value={state.mobile}
                        onChange={(event) =>
                          setState((prev) => ({
                            ...prev,
                            mobile: event.target.value,
                          }))
                        }
                      />
                    </>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 border-b pb-4">
                  {!editData ? (
                    <>
                      <AutocompleteCustom
                        label="استان ها"
                        selects={provinces}
                        value="19"
                        onChange={(event, provinceSelect) =>
                          getCityHandler(provinceSelect)
                        }
                      />
                      {cities.length > 0 && (
                        <AutocompleteCustom
                          label="شهر ها"
                          selects={cities}
                          onChange={(event, areaSelect) =>
                            getAreaHandler(areaSelect)
                          }
                        />
                      )}
                      {area.length > 0 && (
                        <AutocompleteCustom
                          label="مناطق"
                          selects={area}
                          onChange={(event, areaSelect) =>
                            setState((prev) => ({
                              ...prev,
                              area_id: areaSelect ? areaSelect.id : null,
                            }))
                          }
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {!editAddress ? (
                        <>
                          <TextFieldCustom
                            size="small"
                            label="استان"
                            value={state.province}
                            disabled={true}
                          />
                          <TextFieldCustom
                            size="small"
                            label="شهر"
                            value={state.city}
                            disabled={true}
                          />
                          {state.area && (
                            <TextFieldCustom
                              size="small"
                              label="منطقه"
                              value={state.area}
                              disabled={true}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          <AutocompleteCustom
                            label="استان ها"
                            selects={provinces}
                            value="19"
                            onChange={(event, provinceSelect) =>
                              getCityHandler(provinceSelect)
                            }
                          />
                          {cities.length > 0 && (
                            <AutocompleteCustom
                              label="شهر ها"
                              selects={cities}
                              onChange={(event, areaSelect) =>
                                getAreaHandler(areaSelect)
                              }
                            />
                          )}
                          {area.length > 0 && (
                            <AutocompleteCustom
                              label="مناطق"
                              selects={area}
                              onChange={(event, areaSelect) =>
                                setState((prev) => ({
                                  ...prev,
                                  area_id: areaSelect ? areaSelect.id : null,
                                }))
                              }
                            />
                          )}
                        </>
                      )}
                      {!editAddress ? (
                        <ButtonCustom
                          variant="contained"
                          text="ویرایش و تغییر"
                          onClick={editHalnder}
                        />
                      ) : (
                        <ButtonCustom
                          variant="contained"
                          text="انصراف"
                          color="#d32f2f"
                          onClick={cancelEditHalnder}
                        />
                      )}
                    </>
                  )}
                </div>

                <TextareaCustom
                  fullWidth
                  size="small"
                  label="آدرس تحویل گیرنده"
                  required={true}
                  onChange={(event) => setTextArea(event.target.value)}
                  value={textArea}
                />

                <div className="grid grid-cols-2 gap-4 mb-4 border-b pb-4">
                  <TextFieldCustom
                    size="small"
                    label="پلاک"
                    type="number"
                    required={true}
                    value={state.no}
                    onChange={(event) => {
                      setState((prev) => ({
                        ...prev,
                        no: event.target.value,
                      }));
                    }}
                  />
                  <TextFieldCustom
                    size="small"
                    label="واحد"
                    type="number"
                    required={true}
                    value={state.unit}
                    onChange={(event) => {
                      setState((prev) => ({
                        ...prev,
                        unit: event.target.value,
                      }));
                    }}
                  />
                  <TextFieldCustom
                    size="small"
                    label="تلفن ثابت"
                    value={state.phone}
                    type="number"
                    onChange={(event) => {
                      setState((prev) => ({
                        ...prev,
                        phone: event.target.value,
                      }));
                    }}
                  />
                  <TextFieldCustom
                    size="small"
                    label="کدپستی"
                    type="number"
                    required={true}
                    value={state.postal_code}
                    onChange={(event) => {
                      setState((prev) => ({
                        ...prev,
                        postal_code: event.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              <ButtonCustom
                variant="contained"
                className='mt-5'
                text={!editData ? "ثبت آدرس" : "ویرایش آدرس"}
                fullWidth
              />
            </form>
          </Box>
        </Fade>
      </Modal>
    )
  );
};

export default AddAddress;
