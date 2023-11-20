import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { faqData } from "./faqData";

const FAQComponent = () => {
  return (
    <div className="container">
      <div className="row">
        {faqData.map((faq) => (
          <div key={faq.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={faq.imageUrl} className="card-img-top" alt="FAQ" />
              <div className="card-body">
                <h5 className="card-title">{faq.question}</h5>
                <p className="card-text">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQComponent;
