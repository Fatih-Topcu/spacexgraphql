import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import LeftLogo from "../media/LeftArrow.png";
import "../styles/styles.css";
import Gallery from "react-grid-gallery";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const LaunchPage = (props) => {
  let id = props.match.params.id;

  if (isNaN(id)) {
    props.history.push(`/404`);
  }

  const LAUNCH = gql`
    {
      launch(id: ${id}) {
        mission_name
        links {
          flickr_images
          article_link
          video_link
          wikipedia
        }
        launch_date_utc
        id
        details
        launch_year
        launch_success
        rocket {
          rocket_name
        }
        launch_site {
          site_name
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(LAUNCH);

  if (loading || data == null)
    return (
      <div style={{ textAlign: "center" }}>
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={2000}
        />
      </div>
    );

  if (error) {
    return <pre>Error</pre>;
  }

  const launchData = data.launch;

  if (launchData == null && !loading) {
    props.history.push(`/404`);
  }

  let images = [];

  if (launchData != null) {
    launchData.links.flickr_images.forEach((el) => {
      images.push({
        src: el,
        thumbnail: el,
      });
    });
  }

  return (
    <>
      {launchData ? (
        <>
          <div>
            <Link to="/">
              <img className="back-button" src={LeftLogo} alt="Go Back" />
            </Link>
            <span className="mission-name">{launchData.mission_name}</span>
          </div>
          <br />
          <div className="mission-date">Date: {launchData.launch_date_utc}</div>
          <br />
          <a href={launchData.links.video_link}>Watch Here</a> -{" "}
          <a href={launchData.links.wikipedia}>Wikipedia Link</a>
          <br />
          <br />
          <div style={{ fontWeight: "bold" }}>LAUNCH DETAILS</div>
          <div style={{ marginBottom: "1rem" }}>{launchData.details}</div>
          <div style={{ fontWeight: "bold", marginBottom: "1rem" }}>
            Rocket : {launchData.rocket.rocket_name} / Launch Site :{" "}
            {launchData.launch_site.site_name}{" "}
          </div>
          <Gallery images={images} />
        </>
      ) : null}
    </>
  );
};

export default LaunchPage;
