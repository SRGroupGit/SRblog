"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import parse from "html-react-parser";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function Page() {
  const params = useParams();
  const [content, setContent] = useState();
  const [OtherData, setOtherData] = useState({
    title: "",
    hero_image: "",
    publish_date: "",
    id: "",
    author: "",
  });
  const [loading, setLoading] = useState(true);
  const link = "https://admin.sreddygroup.com";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = "https://admin.sreddygroup.com/api/collections/blogs";
      const response = await axios.get(
        `${url}/records?filter=(slug='${params.slug}')`
      );
      setContent(response.data.items[0].article);
      setOtherData(response.data.items[0]);
      console.log(OtherData);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <div className=" w-full flex items-center justify-center aspect-[4/5] rounded-lg bg-gray-100 dark:bg-neutral-900 dark:border-neutral-800 border-gray-200 border ">
            <Icon
              className=" animate-spin"
              icon="icon-park-outline:loading-four"
              width="48"
              height="48"
            />
          </div>
        </div>
      ) : (
        <section className=" w-full  flex flex-col  justify-center">
          <div className=" w-full  overflow-hidden rounded-lg   max-w-6xl m-auto">
            <Image
              width={1920}
              height={1080}
              className=" object-cover object-center aspect-video"
              src={`${link}/api/files/blogs/${OtherData.id}/${OtherData.hero_image}`}
              alt={OtherData.title}
            />
          </div>
          <div className=" flex w-full  m-auto mt-2   max-w-6xl  gap-1 flex-col text-black/70 dark:text-white/70 text-xs">
            <span className=" ">By {OtherData.author}</span>
            {
              <span className=" text-[#00537F] dark:text-[#E49C2F] ">
                {new Date(OtherData.publish_date).toLocaleDateString()}
              </span>
            }
          </div>
          <div
            className="prose dark:prose-invert
    prose-h1:font-bold prose-h1:text-3xl w-full
    prose-a:text-blue-600 prose-p:text-justify prose-headings:my-4   prose-a:m-0  prose-p:m-0 leading-6 prose-img:rounded-xl
       max-w-5xl mx-auto p-3"
          >
            {parse(`${content}`)}
          </div>
        </section>
      )}
    </>
  );
}
