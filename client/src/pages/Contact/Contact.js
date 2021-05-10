/* eslint-disable */

import React from "react";
import PrimaryComponent from "../../components/PrimaryComponent/PrimaryComponent";
import BannerImage from "../../components/BannerImage/BannerImage";
import ContactForm from "../../components/ContactForm/ContactForm";
import { contactObjTwo } from "./ContactData";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount/ScrollToTopOnMount";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/NavTabs/NavTabs";


// Contact page, rendering core page components as well as contact form
function Contact(props) {
  return (
    <div>
      <ScrollToTopOnMount />
      <Nav />
      <BannerImage
        name="hero"
        banner="ContactBanner"
        alt="Contact banner"
        title="Questions?"
      />
      <PrimaryComponent {...contactObjTwo} />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Contact;
