"use client";

import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { updateMe, fetchMe } from "../redux/userSlice";
import MinniFemale from "../../public/assets/minimi2.png";
import MinniMale from "../../public/assets/minimi1.png";
// import UploadImage from "../components/Modal/UploadImage";
// import UploadProfileImage from "../components/Modal/UploadProfileImage";
import NoticeModal from "../Modal/NoticeModal/noticeModal";
import Image from "next/image";
import ConfirmNotice from "../Modal/confirmNotice";
import { useFormState } from "react-dom";
import { editProfile } from "@/app/(main)/user/account/actions";
import { tostifyError, tostifySuccess } from "../TostifyAlert/TostifyAlert";
import TextInput from "../textInput";

const ProfileForm = ({ me }: { me: any }) => {
  const [state, dispatch] = useFormState(editProfile, null);

  // const dispatch = useDispatch();
  // const { me, image, success, error } = useSelector((state) => state.user);
  // const userTempDomain = me?.email.substring(0, me?.email.indexOf('@'));
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);

  const [openProfileImgModal, setOpenProfileImgModal] = useState(false);

  // const location = useLocation();
  // const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: me?.username,
    point: me?.point,
    domain:
      me?.domain ||
      me?.email?.substring(0, me?.email.indexOf("@")) + me?._id.slice(-5),
    minime_img: me?.minime_img,
    birth: me?.birth?.substring(0, me?.birth.indexOf("T")),
    gender: me?.gender,
    phone_number: me?.phone_number,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  console.log("statestate", state);
  useEffect(() => {
    if (state !== null && state?.status === "success") {
      tostifySuccess("Edited Successfully!");
    } else if (state !== null && state?.status === "fail") {
      tostifyError(state.general_error);
    }
    console.log("statestate", state);
  }, [state]);

  const handleUserInfoChange = (e: any) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // dispatch(updateMe({ userData: userInfo })).then(() => {
    //   if (!error) {
    //     // window.location.reload('');
    //     navigate("/account");
    //   }
    // });
    setIsEditing(false);
  };

  // useEffect(() => {
  //   if (success) {
  //     dispatch(fetchMe());
  //   }
  // }, [success, location.pathname, dispatch, me]);

  const handlePasswordChange = (e: any) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleAccountDelete = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmitPasswordChange = (e: any) => {
    e.preventDefault();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setOpenProfileImgModal(false);
  };

  const handleProfileImage = () => {
    setOpenProfileImgModal(true);
  };

  return (
    <div className="w-full h-full px-10 2xl:px-40 min-h-[80vh]">
      <div className="flex flex-col items-center w-full h-full pb-12 md:py-12 ">
        <form
          // onSubmit={handleSubmit}
          action={dispatch}
          className="md:rounded-lg p-8 md:shadow-xl w-full px-10 md:w-[550px]"
        >
          <h1 className="mb-6 text-3xl font-semibold text-center">
            My Account
          </h1>
          <div className="grid items-center grid-cols-1 md:grid-cols-2 md:gap-8">
            <div>
              <Image
                width={100}
                height={100}
                src={
                  !me?.minime_img
                    ? me?.gender === "male"
                      ? MinniMale
                      : MinniFemale
                    : me?.minime_img
                }
                alt="Minime"
                className="w-[15rem] h-[15rem] object-contain cursor-pointer  flex justify-center items-center mx-auto my-4"
                onClick={() => handleProfileImage()}
              />
              <div className="block text-[0.7rem] mb-4">
                <div>Username</div>
                <TextInput
                  type="text"
                  id="username"
                  name="username"
                  value={me?.username}
                  className="w-full mt-1 rounded-md px-3 py-2 text-[1rem]"
                  readOnly
                  disabled
                />
              </div>
              <div className="block text-[0.7rem] mb-4">
                <div>Email</div>
                <TextInput
                  type="email"
                  id="email"
                  name="email"
                  value={me?.email}
                  className="w-full mt-1 rounded-md px-3 py-2 text-[1rem]"
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div>
              <div className="block text-[0.7rem] mb-4">
                <div>Gender</div>
                <TextInput
                  type="gender"
                  id="gender"
                  name="gender"
                  value={userInfo.gender || me?.gender}
                  onChange={handleUserInfoChange}
                  className={`w-full text-[1rem] rounded-md mt-1 px-3 py-2 border  focus:border-[#2185ff] focus:outline-none ${
                    isEditing ? "border-[#bbb] outline-[#bbb]" : "border-white"
                  }`}
                  // style={{ borderColor: isEditing && '#ddd' }}
                  disabled={!isEditing}
                  error={state?.fieldErrors?.gender}
                />
              </div>
              <div className="block text-[0.7rem] mb-4">
                <div>Phone number</div>
                <TextInput
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={userInfo.phone_number || me?.phone_number}
                  onChange={handleUserInfoChange}
                  className={`w-full text-[1rem] rounded-md mt-1 px-3 py-2 border  focus:border-[#2185ff] focus:outline-none ${
                    isEditing ? "border-[#bbb] outline-[#bbb]" : "border-white"
                  }`}
                  // style={{ borderColor: isEditing && '#ddd' }}
                  disabled={!isEditing}
                  error={state?.fieldErrors?.phone_number}
                />
              </div>
              <div className="block text-[0.7rem] mb-4">
                <div>Birth</div>
                <TextInput
                  type="date"
                  id="birth"
                  name="birth"
                  value={
                    userInfo.birth ||
                    me?.birth?.substring(0, me?.birth.indexOf("T"))
                  }
                  onChange={handleUserInfoChange}
                  className={`w-full text-[1rem] rounded-md mt-1 px-3 py-2 border  focus:border-[#2185ff] focus:outline-none ${
                    isEditing ? "border-[#bbb] outline-[#bbb]" : "border-white"
                  }`}
                  disabled={!isEditing}
                  error={state?.fieldErrors?.birth}
                />
              </div>
              <div className="block text-[0.7rem] mb-4">
                <div>Minihome Domain</div>
                <TextInput
                  type="domain"
                  id="domain"
                  name="domain"
                  value={userInfo.domain || me?.domain}
                  onChange={handleUserInfoChange}
                  // style={{ borderColor: isEditing && '#ddd' }}
                  className={`w-full text-[1rem] rounded-md mt-1 px-3 py-2 border  focus:border-[#2185ff] focus:outline-none ${
                    isEditing ? "border-[#bbb] outline-[#bbb]" : "border-white"
                  }`}
                  disabled={!isEditing}
                  error={state?.fieldErrors?.domain}
                />
              </div>

              <div className="flex flex-col">
                <button
                  type="button"
                  className={`bg-black text-white text-sm py-2 px-4 rounded-md mb-4 ${
                    isEditing && "hidden"
                  }`}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  Edit Profile
                </button>

                {isEditing && (
                  <div className="flex w-full gap-6">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="w-full px-4 py-2 mb-4 text-sm bg-white border rounded-md "
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 mb-4 text-sm text-white bg-black rounded-md"
                    >
                      Save Changes
                    </button>
                  </div>
                )}

                <div
                  className="bg-[#ddd] hover:bg-[#bbb] text-sm text-center py-2 px-4 rounded-md mb-4 cursor-pointer"
                  onClick={handleAccountDelete}
                >
                  Delete Account
                </div>
              </div>
            </div>
          </div>
        </form>
        {modalOpen && (
          <NoticeModal setModalOpen={setModalOpen}>
            <ConfirmNotice
              setModalOpen={setModalOpen}
              title="Delete Account"
              text="Are you sure you want to delete this account?"
            />
          </NoticeModal>
        )}

        {/* {openProfileImgModal && (
          <NoticeModal setModalOpen={setOpenProfileImgModal}>
            <UploadProfileImage
              closeModal={() => setOpenProfileImgModal()}
              openProfileImgModal={UploadProfileImage}
              me={me}
            />
          </NoticeModal>
        )} */}
      </div>
    </div>
  );
};

export default ProfileForm;
