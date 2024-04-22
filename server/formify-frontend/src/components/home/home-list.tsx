import React from "react";
import { Form } from "../../hooks/useForm";
import { Link } from "react-router-dom";

type HomeListProps = {
  formData: Form | undefined;
};

const HomeList = ({ formData }: HomeListProps) => {
  return (
    <>
      {formData?.map((form, index) => (
        <React.Fragment key={index}>
          <div className="form-item">
            <div className="form-item-top">
              <h4>{form.id}.</h4>
              <h4>{form.slug}</h4>
            </div>
            <div className="form-item-bottom">
              <h4>{form.name} :</h4>
              <h4>{form.description}</h4>
            </div>
            <Link to={`/form-detail/${form.slug}`}>
              <button className="show-more-button">Show More</button>
            </Link>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default HomeList;
