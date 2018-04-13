import React from "react";
import accounting from "accounting";

export default function ChangeBlock({ count }) {
  return (
    <h3>
      {accounting.formatNumber(count)}{" "}
      <small className="text-muted">representatives changed</small>
    </h3>
  );
}
