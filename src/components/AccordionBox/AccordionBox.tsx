"use client";
import React, { useState } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { useTranslations } from "next-intl";
const AccordionBox: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [openItem2, setOpenItem2] = useState<number | null>(null);
  const t = useTranslations('HomePage');
  const handleToggle = (key: number) => {
    setOpenItem((prevOpenItem) => (prevOpenItem === key ? null : key));
  };
  const handleToggle2 = (key: number) => {
    setOpenItem2((prevOpenItem) => (prevOpenItem === key ? null : key));
  };
  return (
    <div className="flex items-start gap-10">
      <Accordion className="flex flex-wrap p-0">
        {t.raw("accordionBox.arrayBox").map((item: any, index: number) => {
          if (index + 1 > 4) return
          return <AccordionItem
            className={`${index + 1 === t.raw("accordionBox.arrayBox").length ? "" : "border-b"} border-b-d-60 w-full py-3`}
            key={item.num}
            aria-label={item.name}
            textValue={item.name}
            title={<span className="text-white text-sm md:text-base">{item.name}</span>}
            indicator={() =>
              openItem === item.num ? (
                <i className="p-3 rounded-full bg-d-80 flex items-center justify-center">
                  <FaMinus className="text-w-100" size={15} />
                </i>
              ) : (
                <i className="p-3 rounded-full bg-d-80 flex items-center justify-center">
                  <FaPlus className="text-w-100" size={15} />
                </i>
              )
            }
            onPress={() => handleToggle(item.num)}
          >
            <p className="text-gray-400 text-xs md:text-base">{item.text}</p>
          </AccordionItem>
        })}
      </Accordion>
      <Accordion className="hidden md:flex flex-wrap p-0">
        {t.raw("accordionBox.arrayBox").map((item: any, index: number) => {
          if (index + 1 < 5) return
          return <AccordionItem
            className={`${index + 1 === t.raw("accordionBox.arrayBox").length ? "" : "border-b"} border-b-d-60 w-full py-3`}
            key={item.num}
            aria-label={item.name}
            textValue={item.name}
            title={<span className="text-white">{item.name}</span>}
            indicator={() =>
              openItem2 === item.num ? (
                <i className="p-3 rounded-full bg-d-80 flex items-center justify-center">
                  <FaMinus className="text-w-100" size={15} />
                </i>
              ) : (
                <i className="p-3 rounded-full bg-d-80 flex items-center justify-center">
                  <FaPlus className="text-w-100" size={15} />
                </i>
              )
            }
            onClick={() => handleToggle2(item.num)}
          >
            <p className="text-gray-400">{item.text}</p>
          </AccordionItem>
        })}
      </Accordion>
    </div>
  );
};

export default AccordionBox;