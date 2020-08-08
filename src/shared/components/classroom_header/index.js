import React from "react";

import { Typography } from "@material-ui/core";

export default function ClassRoomHeader(props) {
  const styles = {
    header_image: {
      backgroundSize: "cover",
      height: 310
    }
  };

  let image_path = "/assets/images/backgrounds/header_classroom_default.png";
  if (props.image) {
    image_path = props.image;
  }
  let classroom_code_header_field = null;
  if (props.code) {
    classroom_code_header_field = (
      <Typography className="py-16" variant="h4" component="h4">
        Classroom code [ {props.code} ]
      </Typography>
    );
  }

  return (
    <>
      <div
        className={["text-white p-20 py-32 ", styles.header_image]}
        style={{
          backgroundImage: 'url("' + image_path + '")'
        }}
      >
        <Typography variant="h1" component="h2">
          {props.Title}
        </Typography>
        {classroom_code_header_field}
      </div>
    </>
  );
}
