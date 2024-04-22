import { Link, useParams } from "react-router-dom";
import useFormDetail from "../../hooks/useFormDetail";
import Navbar from "../navbar";
import "./detail.css";
import React from "react";

const FormDetail = () => {
  const { slug } = useParams();
  const formDetailData = useFormDetail(slug ? slug : "");
  const parsedDomain =
    formDetailData && JSON.parse(formDetailData?.allowed_domains);
  return (
    <>
      <Navbar />
      <div className="container-detail">
        <h1>
          {formDetailData?.id} - {formDetailData?.slug}
        </h1>
        <div className="form-detail-info">
          <h4>{formDetailData?.name} :</h4>
          <h4>{formDetailData?.description}</h4>
        </div>
        <div className="form-detail-info">
          <h4>Allowed Domain :</h4>
          <h4> {parsedDomain}</h4>
        </div>
        <div className="form-detail-info">
          <h4>Limit One Response :</h4>
          <h4>{formDetailData?.limit_one_response === 1 ? "true" : "false"}</h4>
        </div>

        <div className="question-info">
          <h2>Question :</h2>
          <Link to={`/form-detail/`}>
            <button className="add-question-button">Add More</button>
          </Link>
        </div>
        <div className="form-detail-info">
          {formDetailData?.questions.map((question, index) => (
            <React.Fragment key={index}>
              <div className="detail-item">
                <div className="detail-item-info">
                  <h4>Id :</h4>
                  <h4>{question.id}.</h4>
                </div>
                <div className="detail-item-info">
                  <h4>Name :</h4>
                  <h4>{question.name}</h4>
                </div>
                <div className="detail-item-info">
                  <h4>Choice Type :</h4>
                  <h4>{question.choice_type}</h4>
                </div>
                <div className="detail-item-info">
                  <h4>Choices :</h4>
                  <h4 className="">
                    {JSON.parse(question.choices).map(
                      (choice: string, index: number) => (
                        <React.Fragment key={index}>{choice} </React.Fragment>
                      )
                    )}
                  </h4>
                </div>
                <div className="detail-item-info">
                  <h4>Is Required :</h4>
                  <h4>{question.is_required === 1 ? "true" : "false"}</h4>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default FormDetail;
