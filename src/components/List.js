import React from "react";
import Card from "./Item";

const List = ({ arrayGroupe }) => {
  return (
    <div>
      <div className="list-header">All Indeces</div>

      {Object.entries(arrayGroupe).map((item, index) => (
        <React.Fragment key={index}>
          <div className="list-title">{item[0]}</div>
          <div className="list-card">
            {item[1].map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default List;
