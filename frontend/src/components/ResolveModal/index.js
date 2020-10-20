import React, { useState, useEffect } from "react";
import { Button, IconButton, Input } from "@material-ui/core";
import axios from "../../hoc/axios";
import { useUserStatus } from "../../hoc/UserContext/UserContext";
import { useLoading } from "../../hoc/LoadingContext/LoadingContext";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const DEFAULT_IMG =
  "https://www.kenyons.com/wp-content/uploads/2017/04/default-image.jpg";

const ResolveModal = (props) => {
  const [{ user }, dispatch] = useUserStatus();
  const [loading, setLoading] = useLoading();
  const [url, setUrl] = useState(DEFAULT_IMG);
  const [img, setImg] = useState();

  const handleUpload = (event) => {
    setUrl(URL.createObjectURL(event.target.files[0]));
    setImg(event.target.files[0]);
  };

  const handleResolve = async () => {
    if (user) {
      if (img) {
        props.onResolve();
        setLoading((prev) => !prev);
        let res;
        let imgUrl;

        const fd = new FormData();
        fd.append("image", img, img.name);

        axios
          .post("https://api.imgur.com/3/upload", fd, {
            headers: {
              Authorization: "Client-ID 8fc1c1863ad18a9",
            },
          })
          .then((res) => {
            imgUrl = res.data.data.link;
            axios
              .patch(
                `/api/request/resolve/${props.request._id}`,
                { img: imgUrl },
                {
                  headers: {
                    Authorization: user.token,
                  },
                }
              )
              .then(() => {
                setLoading((prev) => !prev);
                window.location.reload();
              })
              .catch((err) => {
                setLoading((prev) => !prev);
                alert(err);
              });
          })
          .catch((err) => {
            setLoading((prev) => !prev);
            alert(err);
          });
      } else {
        alert("Please upload an image");
      }
    } else {
      alert("You need to log in again to resolve");
    }
  };

  return (
    <div>
      <DialogTitle id="alert-dialog-title">
        You need to upload an image as proof to resolve this request
      </DialogTitle>
      <DialogContent>
        <img src={url} width={400} height={400} />
        <br />
        <Input
          inputProps={{ type: "file" }}
          onChange={(e) => handleUpload(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleResolve} color="primary" variant="contained">
          Upload
        </Button>
      </DialogActions>
    </div>
  );
};

export default ResolveModal;
