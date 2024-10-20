"use client";
import React, { useState, useContext, useEffect  } from "react";
import styles from "@/assets/css/cart/Cart.module.css";
import dynamic from "next/dynamic";
import Card from "@/components/Card";
import CartSidebar from "@/components/cart/CartSidebar";
import axios from "@/lib/axios";
import EmptyCart from "../../../../public/images/EmptyCart.png";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { MainModalContext } from "@/context/modal/mainModal";
import { usePathname } from "next/navigation";
import { SnakebarContext } from "@/context/snakebar";
import PuffLoader from "react-spinners/PuffLoader";
import Image from "next/image";
import Tab from "@mui/material/Tab";
import { SettingApi } from "@/context/api/Setting";

const Tabs = dynamic(() => import("@mui/material/Tabs"), {
  ssr: false,
  loading: () => (
    <div className="h-[48px] w-full bg-gray-300 animate-pulse dark:bg-gray-700"></div>
  ),
});
const ArrowBackIcon = dynamic(() => import("@mui/icons-material/ArrowBack"), {
  ssr: false,
  loading: () => (
    <div className="h-[24px] w-[24px] bg-gray-300 animate-pulse dark:bg-gray-700"></div>
  ),
});

export default function Page() {
  const { dataUser } = useContext(SettingApi);
  const [reset, setReset] = useState(null);
  const [value, setValue] = useState(0);
  const [data, setData] = useState();
  const slug = "api" + usePathname();
  const [changeHandle, setHhangeHandle] = useState("");
  const { setOpen, setDescription, setTitle, accept, setPosition, position } =
    useContext(MainModalContext);

  const overRide = () => ({
    display: "block",
    margin: "0 auto",
  });

  const { setOpenAlarm, setModes, setMessage, setDuration } =
    useContext(SnakebarContext);
  // api Data
  useEffect(() => {
    const getData = async () => {
      axios
        .get(slug)
        .then((response) => {
          if (value == 0) {
            setData(response.data.data.cart_items);
          } else {
            setData(response.data.data.next_buy);
          }
        })
        .catch((error) => {
          setOpenAlarm(true);
          setModes("error");
          setMessage("ارتباط با سرور برقرار نشد");
        });
    };
    getData();
  }, [
    slug,
    changeHandle,
    accept,
    setMessage,
    setOpenAlarm,
    setModes,
    value,
    reset,
  ]);
  // api Data

  const [cards, setCards] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [nextBuy, setNextBuy] = useState([]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteHandler = () => {
    setOpen(true);
    setDescription("آیا از حذف کل کالاهای انتحاب شده مطمئن هستید؟");
    setTitle("حذف از لیست خرید");
    setPosition("all products");
  };

  let transferCount = 0;

  const transformHandler = () => {
    axios
      .get("api/transfer-all-items-to-next-buy")
      .then((response) => {
        transferCount++;
        setReset(transferCount);
        setOpenAlarm(true);
        setMessage("همه محصولات به خرید بعدی افزوده شد");
        setDuration(3000);
        setModes("success");
      })
      .catch((error) => {
        setOpenAlarm(true);
        setMessage(error.response.data.message);
        setDuration(3000);
        setModes("error");
      });
  };

  const resetHandler = (data) => {
    setReset(data);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {dataUser && (
          <ListItem disablePadding onClick={transformHandler}>
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText
                primary={value === 0 ? `انتقال همه کالاها به خرید بعدی` : null}
              />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem disablePadding onClick={deleteHandler}>
          <ListItemButton>
            <ListItemIcon>
              <RemoveIcon color="error" />
            </ListItemIcon>
            <ListItemText sx={{ color: "#d32f2f" }} primary={"حذف"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    data && (
      <>
        <section className={styles.content}>
          {data ? (
            <>
              <div>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    "& .MuiTab-root.Mui-selected": {
                      color: "var(--theme-color)",
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "var(--theme-color)",
                    },
                  }}
                >
                  <Tab label="سبد خرید" {...a11yProps(0)} />
                  {dataUser && <Tab label="خرید بعدی" {...a11yProps(1)} />}
                </Tabs>
              </div>
              <div className="sm:p-4 p-2">
                {/* counter head */}
                <div className="mb-4 flex items-center justify-between">
                  <p className="sm:text-sm text-xs">
                    {value === 0
                      ? `${
                          data.data.length > 0 ? data.data.length : 0
                        } کالا در سبد خرید شما`
                      : `${
                          data.data.length > 0 ? data.data.length : 0
                        } کالا در سبد خرید شما`}
                  </p>
                  {(value == 0 && cards && cards.length < 1) ||
                  (value == 1 && nextBuy.length < 1) ? null : (
                    <div className="lg:flex hidden items-center">
                    
                      {value == 0 && dataUser ? (
                        <Button
                          sx={{
                            "@media (max-width: 540px)": {
                              fontSize: ".75rem",
                            },
                          }}
                          className="flex items-center sm:mr-4 mr-2"
                          onClick={transformHandler}
                        >
                          <p className="text-theme ml-2">
                            انتقال همه کالاها به خرید بعدی
                          </p>
                          <ArrowBackIcon
                            sx={{
                              color: "var(--theme-color)",
                              "@media (max-width: 540px)": {
                                fontSize: ".875rem",
                              },
                            }}
                          />
                        </Button>
                      ) : null}
                    </div>
                  )}
                  <div className="lg:hidden block">
                    {["bottom"].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <IconButton onClick={toggleDrawer(anchor, true)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Drawer
                          anchor={anchor}
                          open={openDrawer}
                          onClose={toggleDrawer(anchor, false)}
                          sx={{
                            "& .MuiPaper-elevation": {
                              borderTopLeftRadius: ".5rem",
                              borderTopRightRadius: ".5rem",
                            },
                          }}
                        >
                          {list(anchor)}
                        </Drawer>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                {/* counter head */}

                {/* body */}
                {value === 0 ? (
                  <ul className={styles.card_container}>
                    {data.data &&
                      data.data.map((product) => {
                        return (
                          <li key={product.id}>
                            <Card
                              data={product}
                              list={true}
                              type="cart"
                              reset={resetHandler}
                            />
                          </li>
                        );
                      })}
                  </ul>
                ) : (
                  <ul className={styles.card_container}>
                    {data.data &&
                      data.data.map((product) => {
                        
                        return (
                          <li key={product.id}>
                            <Card
                              data={product}
                              list={true}
                              type="cart"
                              position="next-buy"
                              reset={resetHandler}
                            />
                          </li>
                        );
                      })}
                  </ul>
                )}
                {/* body */}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <PuffLoader
                color={"rgb(255 121 0 / 49%)"}
                loading={true}
                cssOverride={overRide}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          {data.data.length < 1 && (
            <div className="w-full h-auto mt-10 flex justify-center flex-col items-center">
              <Image src={EmptyCart} alt="empy cart" width={150} height={150} />
              <p className="mt-2">
                {value == 0
                  ? "سبد خرید شما خالی است"
                  : "خرید بعدی شما خالی است"}
              </p>
            </div>
          )}
        </section>
        <CartSidebar data={data} reset={reset} type="cart" pageValue={value} />
      </>
    )
  );
}
