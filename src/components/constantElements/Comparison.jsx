"use client";
import React, { useState } from "react";
import styles from "@/assets/css/main/Main.module.css";
import { styled } from "@mui/material/styles";
import ButtonCustom from "@/components/constantElements/ButtonCustom";
import ImageCustom from "@/components/constantElements/ImageCustom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Card from "../Card";
import { useRouter, usePathname } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Comparison({ data = null }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const router = useRouter();
  const pathName = usePathname();

  const Content = styled("div")({
    display: "grid",
    gridTemplateColumns: "1fr",
    "& span": {
      fontSize: ".875rem",
      fontWeight: "bold",
    },
  });

  const ParagraphContainer = styled("div")({
    display: "grid",
    gridTemplateColumns:
      data.products.length < 4
        ? `repeat(${data.products.length + 1},1fr)`
        : `repeat(${data.products.length},1fr)`,
    "& > p": {
      textAlign: "justify",
      padding: 12,
      fontSize: "1rem",
      borderRight: data.products.length > 1 && "1px solid var(--border-color)",
    },
  });

  const HeadContainer = styled("div")({
    display: "grid",
    placeItems: "center",
    width: "100%",
    borderBottom: " 1px solid var(--border-color)",
    position: "sticky",
    backgroundColor: "#fff",
    top: "-25%",
    gridTemplateColumns:
      data.products.length < 4
        ? `repeat(${data.products.length + 1},1fr)`
        : `repeat(${data.products.length},1fr)`,
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: ".5rem",
  };

  function compareHandler(event, id) {
    event.preventDefault();
    router.push(`${pathName}/dcap-${id}`);
  }
  function deleteHandler(id) {
    const currentPath = `/dcap-${id}`;
    const replaceUtl = pathName.replace(currentPath, "");
    router.push(replaceUtl);
  }

  return (
    <>
      <main className={styles.compare}>
        <section>
          <div className={styles.table_container}>
            <HeadContainer className={styles.compare_head}>
              {data.products.map((image) => {
                return (
                  <div key={image.id}>
                    {data.products.length > 1 && (
                      <div className="w-full flex justify-end">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => deleteHandler(image.id)}
                        >
                          <CloseIcon fontSize="small" color="error" />
                        </IconButton>
                      </div>
                    )}

                    <ImageCustom
                      data={image.image}
                      alt={image.image_alt}
                      title={image.image_alt}
                    />

                    <div>{image.name}</div>

                    <div>{`${Number(image.price).toLocaleString()} تومان`}</div>
                  </div>
                );
              })}
              {data.products.length < 4 && (
                <ButtonCustom text="انتخاب کالا" onClick={handleOpen} />
              )}
            </HeadContainer>
            <div className={styles.compare_body}>
              <p>مشخصات کلی</p>
              <Content>
                <div className={styles.items}>
                  {data.attr.map((items) => (
                    <div key={items.id}>
                      <span>{items.name}</span>
                      <ParagraphContainer>
                        {items.values.map((e, i) => {
                          return <p key={i}>{e.value}</p>;
                        })}
                      </ParagraphContainer>
                    </div>
                  ))}
                </div>
              </Content>
            </div>
          </div>
        </section>
      </main>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* head */}
            <div className="pb-2 border-b mb-2 flex items-center justify-between">
              <div>انتخاب کالا برای مقایسه محصولات</div>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            {/* head */}

            {/* body */}
            <div>
              <input
                className="peer block w-full mb-2 rounded-md border border-gray-200 py-[9px] pr-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="جستجو..."
              />

              <div className="grid grid-cols-3 gap-2 h-[400px] overflow-y-auto">
                {data.category_products.data.map((cards) => {
                  if (!pathName.includes(cards.id)) {
                    return (
                      <Card
                        key={cards.id}
                        data={cards}
                        onClick={(event) => compareHandler(event, cards.id)}
                      />
                    );
                  }
                })}
              </div>
            </div>
            {/* body */}
          </Box>
        </Modal>
      </div>
    </>
  );
}
