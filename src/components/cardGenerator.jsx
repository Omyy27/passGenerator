import React, { useState } from "react";
import Form from "react-bootstrap/Form";
const CardGenerator = () => {
  const [range, setRange] = useState(4);
  const [checkeds, setCheckeds] = useState([1,2,3,4]);
  const [strg, setStrg] = useState([])


  const cases = [
    {
      id: 1,
      name: "uppercase letters",
      func: getRandomUpper,
    },
    {
      id: 2,
      name: "lowercase letters",
      func: getRandomLower,
    },
    {
      id: 3,
      name: "numbers",
      func: getRandomNumber,
    },
    {
      id: 4,
      name: "symbols",
      func: getRandomSymbol,
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

  const getPass = (arr, length) => {
    let content = [];
    const Lis = arr.map(el => {
      // eslint-disable-next-line
       const arFn = cases.filter(function (f) {
         if (f.id === el) {
           return f.func;
         }
       });
       return arFn;
     });
    //  console.log(Lis);
    for (let i = 0; i < (length/2); i++) {
      // const arFn = arr.map(t => )
      const item = getterFun(Lis);
      content.push(item)
    }
    setStrg(content)
    return content;
  }

  function getterFun(arrFuncy) {
    let forStr = [];
    arrFuncy.forEach(el => {
      const psItem = el[0].func();
      forStr.push(psItem);
    });
    console.log(forStr);
    return forStr.join('');
  }
  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = "!@#$%*&(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  return (
    <>
    <div className="mb-3">
        <input
          type="text"
          className="form-control text-white"
          id="inputpass"
          readOnly
          placeholder="P4$5W0rD!"
          value={strg.join('')}
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
              //  bsPrefix="rangeForm"
              className="slider"
              min="4"
              max="24"
              defaultValue={4}
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
                  // id="uppercase"
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
            <span className="text-muted fw-bold">STRENGTH</span>
            <div>
              <h5 className="text-white fw-bold m-0">BASIC 🥵</h5>
            </div>
          </div>
          <button type="button" onClick={()=>getPass(checkeds, range)} className="btn btn-success btn-block rounded-0">
            GENERATE →
          </button>
        </div>
      </div>
    </>
  );
};

export default CardGenerator;
