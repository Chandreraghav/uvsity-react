import React from "react";
import { Container, Row, Col } from "reactstrap";
import Banner from "../shared/Banner";
const Hero = () => {
  return (
    <section className="section position-relative">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="pr-lg-5">
              <Banner />
              <div className="sm:mt-28 mt-28 md:mt-36  lg:mt-36 ml-8">
                <a href="#" className="btn btn-warning">
                  Discover More <span className="ml-2right-icon">&#8594;</span>
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="mt-5 mt-lg-0">
              <img
                src={process.env.NEXT_PUBLIC_APP_HERO_IMAGE}
                alt="banner"
                className="img-fluid mx-auto d-block"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Hero;
