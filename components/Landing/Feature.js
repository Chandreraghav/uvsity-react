import React from "react";
import { Container, Row, Col } from "reactstrap";
import { LANDING_PAGE_APP_FEATURES } from "../../constants/constants";
import FeatureStyle from "../../styles/Feature.module.css";
const FeatureBox = (props) => {
  return (
    <>
      {props.features.map((feature, key) => (
        <Row key={key}>
          <h1 className={`${FeatureStyle.feature__title} text-center`}>
            {feature.title}
          </h1>

          <Col md={5}>
            <div>
              <img
                src={feature.img}
                alt=""
                className="img-fluid d-block mx-auto lg:w-96 sm:w-72 md:w-72 w-72 object-contain content-center "
              />
            </div>
          </Col>
          <Col className="mt-5" md={{ size: 6, offset: 1 }}>
            <div className="mt-0 sm:mt-0 lg:mt-5 md:mt-5 mt-sm-0 mb-4">
              {feature.messages.map((msg, key) => (
                <p key={key} className="text-muted mb-3 f-20">
                  {msg.icon} {msg.text}
                </p>
              ))}

              <a href="#watchvideo">
                <button className={FeatureStyle.feature__button__sm}>
                  {" "}
                  {feature.video_icon}
                  {feature.watch_video}
                </button>
              </a>
            </div>
          </Col>
        </Row>
      ))}{" "}
    </>
  );
};
const Feature = () => {
  return (
    <section id='discover-more' className="section uvsity-section position-relative">
      <Container>
        <FeatureBox features={LANDING_PAGE_APP_FEATURES} />
      </Container>
    </section>
  );
};
export default Feature;
