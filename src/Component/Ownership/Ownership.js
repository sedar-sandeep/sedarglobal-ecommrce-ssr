import { LazyLoadImage } from 'react-lazy-load-image-component';
import React from 'react';

export default function StepsToOwnership(props) {
  const steps = props?.CHILD || [];

  return (
    <section className="container py-5">
      <h2 className="text-center mb-5">{props?.title}</h2>
      <div className="row align-items-start">
        {/* Left Side: Image */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <LazyLoadImage
            src={props?.image_path}
            alt={props?.image_path}
            width={400}
            height={500}
            className="img-fluid rounded"
          />
        </div>

        {/* Right Side: Steps */}
        <div className="col-md-6">
          {steps.map((value, index) => (
            <div key={index} className="d-flex mb-3 mt-4 align-items-start">
              {/* Hexagon Number */}
              <div className="hexagon-container me-3">
                <div className="hexagon-border">
                  <div className="hexagon">
                    <span>{index + 1}</span>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="step-title">{value.title}</h6>
                <div
                  className="franchise-step-description"
                  dangerouslySetInnerHTML={{ __html: value.description }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </section>
  );
}
