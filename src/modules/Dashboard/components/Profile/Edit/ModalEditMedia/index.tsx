import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import DragDrop from "@/components/DragToUpload";
import CloseIcon from "@mui/icons-material/Close";
import "./modaleditmedia.scss";

interface ModalEditMediaProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (cover: File, picture: File) => void;
}

const ModalEditMedia: React.FC<ModalEditMediaProps> = ({
  open,
  handleClose,
  onSubmit,
}) => {
  const [cover, setCover] = useState<File[]>([]);
  const [picture, setPicture] = useState<File[]>([]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description">
      <div className="modal-box">
        <div className="title-history">
          <h1>Edit Media</h1>
          <button type="button" onClick={() => handleClose()}>
            <CloseIcon />
          </button>
        </div>
        <div className="cover-box-edit">
          <span>Cover</span>

          {cover[0] ? (
            <div className="image-drop">
              <button className="remove-button" onClick={() => setCover([])}>
                <CloseIcon />
              </button>
              <img
                src={
                  typeof cover[0] === "object"
                    ? URL.createObjectURL(cover[0])
                    : cover[0]
                }
                width={200}
                height={200}
                className="cover-img"
              />
            </div>
          ) : (
            <DragDrop images={cover} setImages={setCover} maxFiles={1} />
          )}
        </div>
        <div className="cover-box-edit">
          <span>Profile picture</span>
          {picture[0] ? (
            <div className="image-drop picture ">
              <button className="remove-button" onClick={() => setPicture([])}>
                <CloseIcon />
              </button>
              <img
                src={
                  typeof picture[0] === "object"
                    ? URL.createObjectURL(picture[0])
                    : picture[0]
                }
                width={200}
                height={200}
                className="picture-img"
              />
            </div>
          ) : (
            <DragDrop images={picture} setImages={setPicture} maxFiles={1} />
          )}
        </div>
        <div className="submit-buttons">
          <button
            type="button"
            onClick={() => {
              onSubmit(cover[0], picture[0]);
              setCover([]);
              setPicture([]);
              handleClose();
            }}
            className="save-button">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditMedia;
