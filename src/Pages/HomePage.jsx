import React from "react";
import Gallery from "react-grid-gallery";
import "../styles/styles.css";
import { useQuery, gql } from "@apollo/client";
import { withRouter } from "react-router-dom";

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

const HomePage = (props) => {
  const { data, loading, error } = useQuery(LAUNCHES);

  if (loading) return "Loading..";
  if (error) return <pre>Error</pre>;

  let imageData = [];

  data.launchesPast.forEach((element) => {
    if (element.links.flickr_images.length > 0) {
      imageData.push({
        src: element.links.flickr_images[0],
        thumbnail: element.links.flickr_images[0],
        id: element.id,
      });
    }
  });

  return (
    <>
      <div className="home-header page-header"> SPACEX LAUNCHES</div>

      <Gallery
        images={imageData}
        onClickThumbnail={(e) => {
          props.history.push(`/launch/${imageData[e].id}`);
        }}
      />
    </>
  );
};

export default withRouter(HomePage);
