import React from "react";

function BetTypeForm({ options }) {
  const handleClick = (e) => {
    console.log(e.target.value);
  };
  return (
    <div>
      {Array.isArray(options) && (
        <form>
          {options.map((option) => {
            return (
              <>
                <label htmlFor={option}>{option}</label>
                <input
                  type="checkbox"
                  id={option}
                  name={option}
                  value={option}
                  onClick={handleClick}
                />
              </>
            );
          })}
        </form>
      )}
    </div>
  );
}

export default BetTypeForm;
