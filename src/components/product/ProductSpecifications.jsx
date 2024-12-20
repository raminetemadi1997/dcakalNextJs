import React, { useRef, useState } from "react";
import ButtonCustom from "../constantElements/ButtonCustom";
import ImageCustom from "../constantElements/ImageCustom";
import useMediaQuery from "@mui/material/useMediaQuery";
//context

const ProductSpecifications = ({ attributes, attributeImage, alt }) => {

  const mobile = useMediaQuery("(max-width:540px)");
  const specificationScroll = useRef();
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className={`mb-10 scroll-mt-32 mt-12`}
      ref={specificationScroll}
      id="property"
    >
      <div className="flex justify-between items-center mb-2 border-b">
        <p className="font-bold mb-2">مشخصات محصول</p>
      </div>
      <div
        className={`py-2 w-full sm:grid sm:grid-cols-2 sm:grid-flow-row-dense sm:gap-4 flex flex-col-reverse place-items-center`}
      >
        <div
          className={`w-full h-fit grid grid-cols-1 sm:gap-4 gap-2 sm:mt-0 mt-5`}
        >
          {attributes
            .slice(0, showMore ? attributes.length : 3)
            .map((value) => {
              return (
                <div key={value.id} className="grid sm:grid-cols-4 grid-cols-1 gap-2">
                  <div className="sm:text-base text-xs">{value.attribute_parent_name}</div>
                  <div className="grid  gap-2 sm:col-span-3">
                    {value.childrens.map((child) => (
                      <dl
                        key={child.id}
                        className="grid grid-cols-2 sm:gap-4 gap-2"
                      >
                        <dt className="bg-stone-300 p-2 rounded-r-xl sm:text-sm text-xs">
                          {child.attribute_name}
                        </dt>
                        <dd className="bg-stone-200 p-2 rounded-l-xl sm:text-sm text-xs">
                          {child.attribute_value}
                        </dd>
                      </dl>
                    ))}
                  </div>
                </div>
              );
            })}
          {attributes.length > 3 && (
            <ButtonCustom
              text={`مشاهده ${showMore ? "کمتر" : "بیشتر"}`}
              variant="text"
              onClick={() => setShowMore(!showMore)}
            />
          )}
        </div>
        {!mobile && (
          <ImageCustom
            data={attributeImage}
            alt={alt}
            title={alt}
            // props
            loading={"lazy"}
            height={210}
            width={210}
            fullWidth={false}
          />
        )}
      </div>
    </div>
  );
};

export default ProductSpecifications;
