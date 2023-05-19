import { NextSeo } from "next-seo";
import Head from "next/head";
import React from "react";

export default function Metadata(props) {
  let dataProps = {};
  let icon = "";
  if (props.user) {
    icon = props.user.data().photoURL;
    dataProps = {
      title: `${props.user.data().profile_title} | Yazz Linker`,
      description: "Share all your social media in one link!",
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/u/${
        props.user.data().username
      }`,
      openGraph: {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/u/${
          props.user.data().username
        }`,
        images: [
          {
            url: props.user.data().photoURL,
            width: 800,
            height: 600,
            alt: props.user.data().name,
          },
        ],
      },
    };
  }
  if (props.title) dataProps.title = props.title;
  if (props.description) dataProps.description = props.description;
  if (props.canonical) dataProps.canonical = props.canonical;
  if (props.openGraph) dataProps.openGraph = props.openGraph;
  if (props.icon) icon = props.icon;

  return (
    <>
      <NextSeo {...dataProps} />
      <Head>
        <link rel="icon" href={icon} />
      </Head>
    </>
  );
}
