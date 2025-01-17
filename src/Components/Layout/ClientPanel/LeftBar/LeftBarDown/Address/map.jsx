import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMutation, useQuery } from "react-query";
import instance from "../../../../../../Core/Services/interseptore/Interceptor";
import { useSelector } from "react-redux";
import { ProfileStep1 } from "../../../../../../Core/Services/Api/Client/Profile";
import '../../../../../../index.css'
import toast from "react-hot-toast";
function useProfileDetail() {
  return useQuery("userProfile", () => instance.get("/SharePanel/GetProfileInfo"));
}

function useProfileUpdate() {
  return useMutation((formData) => instance.put("/SharePanel/UpdateProfileInfo", formData));
}

function Map() {
  return (
    <div className="h-[100%] z-10 w-[80%] py-6">
      <MapContainer
        className="h-full rounded-2xl w-full"
        center={[36.569217971443656, 53.07061672210694]}
        zoom={10}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarkers />
      </MapContainer>
    </div>
  );
}

function LocationMarkers() {
  const profile = useProfileDetail();
  const update = useProfileUpdate();

  // Ensure that data is available before using it
  const data = profile.data?.data || {};
  const [markers, setMarkers] = useState(
    data.latitude && data.longitude ? [[data.latitude, data.longitude]] : [[0, 0]]
  );

  const CourseListItem = useSelector((state) => state.ClientInfoSlice.ClientInfo);
  const map = useMapEvents({
    async click(e) {
      setMarkers([[e.latlng.lat, e.latlng.lng]]);

      // alert(e.latlng.lng);
      // alert(e.latlng.lat);
      const date = "2004-07-17";
      const data = {
        firstName: `${CourseListItem.fName}`,
        lastName: `${CourseListItem.lName}`,
        about: `${CourseListItem.userAbout}`,
        nationalCode: `${CourseListItem.nationalCode}`,
        phone: `${CourseListItem.phoneNumber}`,
        birthDate: date,
        gender: CourseListItem.gender,
        email: `${CourseListItem.email}`,
        address: `${CourseListItem.homeAdderess}`,
        longitude: `${e.latlng.lng}`,
        latitude: `${e.latlng.lat}`,
        linkedin: CourseListItem.linkdinProfile,
        telegram: CourseListItem.telegramLink,
      };
      const setdata= async ()=>{
        const res = await ProfileStep1(data);
        res.success ==	true  ? toast.success("عملیات موفقیت امیز بود"):toast.error("دوباره تلاش کنید")
      }
      setdata()

      // update.mutate(fm);or
    },
    locationfound(e) {
      map.flyTo(e.latlng, 13);
    },
    load() {
      map.locate();
    },
  });

  useEffect(() => {
    map.locate();
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((e) => {
        map.flyTo([e.coords.latitude, e.coords.longitude]);
        console.log("map success");
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [map]);

  return (
    <>
      {markers.map((marker, index) => (
        <Marker  key={index} position={marker} />
      ))}
    </>
  );
}

export default Map;
