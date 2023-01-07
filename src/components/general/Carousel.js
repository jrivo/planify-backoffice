import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useState } from "react";

const Carousel = ({ items }) => {
  const [position, setPosition] = useState(0);
  return (
    <div
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
        position: "relative",
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          marginLeft: "40px",
          marginRight: "40px",
          paddingTop: "10px",
          paddingBottom: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "fit-content",
            marginRight: "20px",
            transform: "translateX(" + position + "px)",
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                // height: "300px",
                width: "250px",
                marginRight: "20px",
                marginLeft: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => {
                if (item.action) {
                  item.action();
                }
              }}
            >
              <img
                src={
                  item.image
                    ? item.image
                    : "https://via.placeholder.com/300x200"
                }
                alt={item.title}
                style={{
                  height: "200px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  padding: "10px 20px 20px 15px",
                }}
              >
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    margin: 0,
                    padding: 0,
                    color: "rgba(0, 0, 0, 0.87)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    fontWeight: "400",
                    color: "rgba(0, 0, 0, 0.6)",
                    fontSize: "14px",
                  }}
                >
                  {item.subtitle1}
                </p>
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    fontWeight: "400",
                    color: "rgba(0, 0, 0, 0.6)",
                    fontSize: "14px",
                  }}
                >
                  {item.subtitle2}
                </p>
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 0.6)",
                    fontSize: "14px",
                  }}
                >
                  {item.footerText}
                </p>
              </div>
            </div>
          ))}
        </div>

        <KeyboardArrowLeftIcon
          onClick={() => {
            if (position < 0) {
              setPosition(position + 290);
            }
          }}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            fontSize: "38px",
            cursor: "pointer",
          }}
        />
        <ChevronRightIcon
          onClick={() => {
            if (position >= (-290 * Math.floor(items.length - 2)) / 2)
              setPosition(position - 290);
          }}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
            fontSize: "38px",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

const styles = {};

export default Carousel;
