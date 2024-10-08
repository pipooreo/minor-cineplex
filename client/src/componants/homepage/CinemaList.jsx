import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";

function CinemaList() {
  const [province, setProvince] = useState([]);
  const navigate = useNavigate();
  const getDataProvince = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/city`
      );
      setProvince(response.data.data);
    } catch (error) {
      console.log("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    getDataProvince();
  }, []);

  return (
    <section className="bg-BG px-[5px] lg:px-[120px] py-[80px] flex justify-center">
      <div className="flex flex-col gap-[40px] max-[375px]:w-[345px]">
        <div className="text-[white] text-[36px] font-[700]">All cinemas</div>
        {province && province.length > 0 ? (
          province.map((city) => (
            <div
              key={city.id}
              className="text-[#ffffff] flex flex-col gap-[24px]"
            >
              <div className="text-[24px]">{city.city_name}</div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
                {city.cinema.map((cinema, index) => (
                  <div
                    key={index}
                    className="p-[16px] border-[#565F7E] border-[1px] flex items-center  gap-[16px]"
                  >
                    <div>
                      <i className="fa-solid fa-location-dot w-[52px] h-[52px] border-[#565F7E] border-[1px] rounded-[50%] bg-[#474e6e] flex justify-center items-center"></i>
                    </div>
                    <button
                      className="flex flex-col items-start text-left"
                      onClick={() => {
                        navigate(`/cinema/${cinema.cinema_id}`);
                      }}
                    >
                      <div className="text-[24px] text-[#ffffff]">
                        {cinema.name}
                      </div>
                      <div className="text-[16px] text-[#8B93B0]">
                        {cinema.address}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="sweet-loading flex justify-center items-center">
            <ClockLoader color="#4f7cee" />
          </div>
        )}
      </div>
    </section>
  );
}

export default CinemaList;
