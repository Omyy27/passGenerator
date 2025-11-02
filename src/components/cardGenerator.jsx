import { useEffect, useState } from "react";
import { generatePassword } from "../utils/passwordGenerator";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CardGenerator = () => {
  const [range, setRange] = useState(14);
  const [checkeds, setCheckeds] = useState([1, 2, 3, 4]);
  const [strg, setStrg] = useState([]);
  const [show, setShow] = useState(false);
  const [strength, setStrength] = useState('');

  const cases = [
    {
      id: 1,
      name: "uppercase letters",
    },
    {
      id: 2,
      name: "lowercase letters",
    },
    {
      id: 3,
      name: "numbers",
    },
    {
      id: 4,
      name: "symbols",
    },
  ];

  function handleChange(e) {
    if (e.target.checked === true) {
      setCheckeds([...checkeds, Number(e.target.value)]);
    } else {
      const selectedAcc = checkeds.filter((a) => {
        if (a === Number(e.target.value)) return false;
        return true;
      });
      setCheckeds([...selectedAcc]);
    }
  }

  useEffect(() => {
    const sumall = checkeds.map(item => item).reduce((prev, curr) => prev + curr, 0);
    if (sumall <= 5) {
      setStrength('Basic 🥵')
    } else if(sumall > 5 && sumall <= 8){
      setStrength('Medium ☹️')
    }else{
      setStrength('High 😎')
    }
  }, [checkeds])
  

  const getPass = () => {
    const pwd = generatePassword({
      length: parseInt(range),
      lowercase: checkeds.includes(2),
      uppercase: checkeds.includes(1),
      numbers: checkeds.includes(3),
      symbols: checkeds.includes(4),
    });
    setStrg(pwd);
  };

  function copyPageUrl(e) {
    if(e.currentTarget.value === '' || e.currentTarget.value === null) return;
    e.target.select();
    document.execCommand("copy");
    setShow(true);
  }

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>The password was copy to clipboard!</Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            X
          </Button>
        </div>
      </Alert>
      <div className="mb-3">
        <input
          type="text"
          className="form-control text-white"
          id="inputpass"
          readOnly
          placeholder="P4$5W0rD!"
          value={strg}
          onClick={(e) => {
            copyPageUrl(e);
          }}
        />
      </div>
      <div className="card">
        <div className="card-body d-flex flex-column flex-wrap">
          <div className="d-flex flex-row flex-wrap align-items-center justify-content-between col-12">
            <span className="text-white">Character length</span>
            <h4 className="pass-length">{range}</h4>
          </div>
          <div className="col-12">
            <Form.Range
              className="slider"
              min="4"
              max="24"
              defaultValue={range ?? 14}
              onChange={(e) => setRange(e.target.value || 0)}
            />
          </div>
          <div className="col-12 text-white">
            {cases.map((c) => (
              <div className="form-check" key={c.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={c.id}
                  checked={
                    checkeds.lastIndexOf(Number(c.id)) >= 0 ? true : false
                  }
                  onChange={(e) => handleChange(e)}
                />
                <label className="form-check-label">Include {c.name}</label>
              </div>
            ))}
          </div>
          <div className="col-12 px-3 d-flex flex-row flex-wrap justify-content-between align-items-center content-strength my-3">
            <span className="text-white fw-bold">STRENGTH</span>
            <div>
              <h5 className="text-white fw-bold m-0 text-uppercase">{strength}</h5>
            </div>
          </div>
          <button
            type="button"
            onClick={() => getPass(checkeds, range)}
            className="btn btn-success btn-block rounded-0"
            disabled={checkeds.length === 0}
          >
            GENERATE →
          </button>
        </div>
      </div>
    </>
  );
};

export default CardGenerator;
