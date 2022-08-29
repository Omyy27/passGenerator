import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
const CardGenerator = () => {
  const [range, setRange] = useState(0);

  return (
    <>
      <div className="card">
        <div className="card-body d-flex flex-column flex-wrap">
          <div className="d-flex flex-row flex-wrap align-items-center justify-content-between col-12">
            <span className="text-white">Character length</span>
            <h4 className="pass-length">{range}</h4>
          </div>
          <div className="col-12">
            <Form.Range
            //  bsPrefix="rangeForm"
              min="0"
              max="24"
              defaultValue={0}
              onChange={(e) => setRange(e.target.value || 0)}
            />
          </div>
          <div className="col-12 text-white">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="uppercase"
                
              />
              <label className="form-check-label" htmlFor="uppercase">
                Include Uppercase Letters
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="lowercase"
                
              />
              <label className="form-check-label" htmlFor="lowercase">
                Include Lowercase Letters
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="numbers"
                
              />
              <label className="form-check-label" htmlFor="numbers">
                Include Numbers
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="symbols"
                
              />
              <label className="form-check-label" htmlFor="symbols">
                Include Symbols
              </label>
            </div>
          </div>
          <div className="col-12 px-3 d-flex flex-row flex-wrap justify-content-between align-items-center content-strength my-3">
            <span className="text-muted fw-bold">STRENGTH</span>
            <div></div>
          </div>
          <button type="button" class="btn btn-success btn-block rounded-0">GENERATE →</button>
        </div>
      </div>
    </>
  );
};

export default CardGenerator;
