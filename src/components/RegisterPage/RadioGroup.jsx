import React, { useState } from 'react';
import { useEffect } from 'react';
import style from './Register.module.css';

function RadioGroup({ item, idx, checkType, setCheckVal, checkVal }) {
  const [click, setClick] = useState(0);
  const [checkFlag, setCheckFlag] = useState({});

  const onChangeCheck = (e) => {
    const { id, value } = e.target;
    setClick(Number(value));

    let tmp = [];
    tmp = checkVal;

    tmp[id] = checkType[Number(value)-1].text;

    let flagObj = {};
    flagObj= checkFlag;
    flagObj[id] = new Array(3).fill(false).fill(true, value-1, value);

    setCheckVal(tmp);
    setCheckFlag(flagObj)
}

  return (
    <div style={{display: "inline-block", marginLeft: '16px'}}>
      {
        checkType.map((check, index) => (
          <>
            <label>
              <input
                id={idx}
                type='radio'
                name={item}
                value={check.value}
                onChange={onChangeCheck}
                checked={click === index + 1}
                style={{ display: "none" }}
                required
              />

              {click === index + 1 && checkFlag[idx][index]
                ? (<img src={check.img_on} style={{ height: '24px' }} />)
                : (<img src={check.img_off} style={{ height: '24px' }} />)}
            </label>
          </>
        ))
      }
    </div>
  );
}

export default RadioGroup;