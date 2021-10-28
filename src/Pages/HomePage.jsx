import React from "react";
import Gallery from "react-grid-gallery";
import "../styles/styles.css";
import { useQuery, gql } from "@apollo/client";

const LAUNCHES = gql`
  {
    launchesPast(limit: 100) {
      mission_name
      links {
        flickr_images
        article_link
        video_link
        wikipedia
      }
      id
      launch_site {
        site_name
      }
      launch_date_utc
      ships {
        name
        image
      }
      launch_success
      launch_year
    }
  }
`;

const HomePage = () => {
  const exampleArray = [
    {
      src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
      thumbnail:
        "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
      thumbnailWidth: 271,
      thumbnailHeight: 320,
      tags: [{ value: "Nature", title: "Nature | Flowers" }],
      caption: "Orange Macro (Tom Eversley - isorepublic.com)",
    },
    {
      src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
      thumbnail:
        "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 190,
      tags: [
        { value: "Architecture", title: "Architecture | Outdoors" },
        { value: "Industrial", title: "Industrial" },
      ],
      caption: "286H (gratisography.com)",
    },
    {
      src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
      thumbnail:
        "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 148,
      tags: [
        { value: "People", title: "People" },
        { value: "Architecture", title: "Architecture | Outdoors" },
        { value: "Industrial", title: "Industrial" },
      ],
      caption: "315H (gratisography.com)",
    },
    {
      src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
      thumbnail:
        "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 213,
      caption: "201H (gratisography.com)",
    },
    {
      src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
      thumbnailWidth: 248,
      thumbnailHeight: 320,
      caption: "Big Ben (Tom Eversley - isorepublic.com)",
    },
    {
      src: "https://c1.staticflickr.com/9/8785/28687743710_870813dfde_h.jpg",
      thumbnail:
        "https://c1.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 113,
      tags: [
        { value: "People", title: "People" },
        { value: "Industrial", title: "Industrial" },
      ],
      caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)",
    },
    {
      src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
      thumbnail:
        "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_n.jpg",
      thumbnailWidth: 313,
      thumbnailHeight: 320,
      caption: "Wood Glass (Tom Eversley - isorepublic.com)",
    },
    {
      src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
      thumbnail:
        "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 213,
      tags: [{ value: "Nature", title: "Nature | Flowers" }],
      caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)",
    },
  ];

  const { data, loading, error } = useQuery(LAUNCHES);

  if (loading) return "Loading..";
  if (error) return <pre>Error</pre>;

  let imageData = [];

  data.launchesPast.forEach((element) => {
    if (element.links.flickr_images.length > 0) {
      imageData.push({
        thumbnail: element.links.flickr_images[0],
        id: element.id,
      });
    }
  });

  console.log(imageData);
  return (
    <>
      <div className="home-header page-header"> SPACEX LAUNCHES</div>

      <Gallery
        images={imageData}
        onClickThumbnail={(e) => {
          console.log(imageData[e].id);
        }}
      />
    </>
  );
};

export default HomePage;
