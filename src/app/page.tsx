"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Home() {
  const [ListedPosts, setListedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const link = "https://admin.sreddygroup.com";

  useEffect(() => {
    axios
      .get(`${link}/api/collections/blogs/records`)
      .then((response) => {
        setListedPosts(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  interface PostData {
    id: string;
    title: string;
    author: string;
    short_discription: string;
    publish_date: string;
    tags: [string];
    hero_image: string;
    slug: string;
  }

  return (
    <>
      <section className=" flex flex-col gap-4 items-center justify-center pt-12">
        <span className=" text-xl font-medium">SR Group Blog</span>
        <h1 className=" text-5xl md:text-6xl  font-bold text-center">
          Writings from our team
        </h1>
        <p className=" italic opacity-80 text-center">
          Latest industry news, interviews and resources
        </p>
      </section>
      <section>
        {loading ? (
          <div className=" grid animate-pulse duration-900 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <div className=" w-full flex items-center justify-center aspect-[4/5] rounded-lg bg-gray-100 dark:bg-neutral-900 dark:border-neutral-800 border-gray-200 border ">
              <Icon
                className=" animate-spin"
                icon="icon-park-outline:loading-four"
                width="48"
                height="48"
              />
            </div>
            <div className=" w-full flex items-center justify-center  aspect-[4/5] rounded-lg bg-gray-100  dark:bg-neutral-900 dark:border-neutral-800 border-gray-200 border ">
              <Icon
                className=" animate-spin"
                icon="icon-park-outline:loading-four"
                width="48"
                height="48"
              />
            </div>
            <div className=" w-full flex items-center justify-center  aspect-[4/5] rounded-lg bg-gray-100  dark:bg-neutral-900 dark:border-neutral-800 border-gray-200 border ">
              <Icon
                className=" animate-spin"
                icon="icon-park-outline:loading-four"
                width="48"
                height="48"
              />
            </div>
          </div>
        ) : error ? (
          <div className=" text-center">Error: {error}</div>
        ) : (
          <div className=" grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {ListedPosts.slice(1).map((post: PostData) => (
              <div
                key={post.id}
                className=" aspect-[4/5] flex flex-col overflow-hidden rounded-lg bg-gray-100 dark:bg-neutral-900 dark:border-neutral-800 border-gray-200 justify-between border"
              >
                <div>
                  <Image
                    width={1280}
                    height={720}
                    className=" object-cover object-center aspect-video"
                    src={`${link}/api/files/blogs/${post.id}/${post.hero_image}`}
                    alt={post.title}
                  />
                  <div className=" p-3">
                    <h2 className=" text-2xl text-[#00537F] dark:text-[#E49C2F] font-semibold ">
                      {post.title}
                    </h2>

                    <div className=" flex gap-1 text-black/70 dark:text-white/70 text-xs">
                      <span className=" ">By {post.author}</span>on
                      {
                        <span className=" text-[#00537F] dark:text-[#E49C2F] ">
                          {new Date(post.publish_date).toLocaleDateString()}
                        </span>
                      }
                    </div>

                    <p className=" mt-2 text-sm font-light text-gray-700 dark:text-gray-200">
                      {post.short_discription}
                    </p>
                  </div>
                </div>

                <div className=" p-3">
                  <div className=" flex w-full gap-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className=" text-xs opacity-80 hover:opacity-100 cursor-pointer bg-[#00537F40] dark:bg-[#E49C2F40] text-[#00537F] dark:text-[#E49C2F] rounded-md px-3 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className=" flex w-full items-center rounded-md  bg-white border-neutral-200 border dark:border-neutral-800 dark:bg-black justify-between p-2 mt-4 text-[#00537F] hover:opacity-70 transition-all duration-700 dark:text-[#E49C2F]"
                  >
                    <span className=" w-full text-center"> Read more</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
