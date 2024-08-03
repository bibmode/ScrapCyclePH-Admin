import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import { supabase } from "/utils/supabase/client"; // Update the import path as necessary

const BookingSidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLiner, setSelectedLiner] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  useEffect(() => {
    fetchDropdownOptions();
  }, []);

  const fetchDropdownOptions = async () => {
    try {
      console.log("Fetching dropdown options...");
      const { data, error } = await supabase.rpc("get_liner_dropdown");

      if (error) {
        console.error("Error fetching dropdown options:", error.message);
        return;
      }
      console.log("Fetched dropdown options:", data);
      setDropdownOptions(data);
    } catch (error) {
      console.error("Unexpected error in fetchDropdownOptions:", error);
    }
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedLiner(`${option.full_name} (${option.business_name})`);
    setDropdownOpen(false);
  };

  const bookings = [
    {
      full_name: "tgg",
      avatar_url:
        "https://lh3.googleusercontent.com/a/ACg8ocIzlBLdCU6LRviIFTUVH82b0phg3ZR33PaiC-hDRBMYchNnfQ=s96-c",
      phone_number: "09223325852",
      status: "false",
      address_name: "Diego Silang Pob. (Brgy 6) Butuan City   Caraga",
      waste_type: "Household Waste",
      large_recyclables: "false",
      estimated_weight: "12",
      item_types: ["battery", "e-waste", "metal", "plastic"],
      items: [
        {
          item: "copper",
          unit: "kg",
          price: "250.00",
          quantity: "500",
        },
        {
          item: "11 plates  (car battery)",
          unit: "piece",
          price: "300.00",
          quantity: "100",
        },
        {
          item: "refrigerator (single door)",
          unit: "piece",
          price: "150.00",
          quantity: "120",
        },
        {
          item: "kola plastic",
          unit: "kg",
          price: "0.75",
          quantity: "1",
        },
      ],
    },
    {
      full_name: "Sungha Jung",
      avatar_url:
        "https://lh3.googleusercontent.com/a/ACg8ocL11Ke0VkI4VH8EvBAN0l-9O9QHjSZ90OpYUgbzUO2FhgirF4c1=s96-c",
      phone_number: "12212112122",
      status: "false",
      address_name: "Butuan City Butuan City   Caraga",
      waste_type: "Household Waste",
      large_recyclables: "false",
      estimated_weight: "15",
      item_types: [],
      items: [],
    },
  ];

  return (
    <div className="booking-sidebar my-5">
      <ul>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <li key={index}>
              <div className="rounded-lg container m-0 p-0">
                <div className="flex my-5">
                  <div className="ml-3 pl-3 pr-4">
                    <Image
                      src={booking.avatar_url || "/default-avatar.png"}
                      alt={booking.full_name}
                      width={68}
                      height={68}
                      layout="fixed"
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="justify-center items-center my-auto">
                    <h3 className="text-black font-semibold text-[21px]">
                      {booking.full_name}
                    </h3>
                    <p className="text-sm text-gray-500 w-full">
                      Phone: {booking.phone_number}
                    </p>
                  </div>
                </div>

                <div className="flex relative mb-4 justify-center items-center">
                  <button
                    className="flex w-1/2 text-center items-center justify-center border rounded-2xl py-2 px-4 mb-4 bg-gray-50 text-black hover:bg-gray-100"
                    onClick={handleDropdownClick}
                  >
                    <span className="mr-2">
                      {selectedLiner || "Select Liner"}
                    </span>
                    <FaChevronDown className="w-4 h-4" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute w-1/2 bg-white border rounded-lg shadow-lg mt-1 z-10">
                      <ul>
                        {dropdownOptions.map((option) => (
                          <li
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                          >
                            {option.full_name} ({option.business_name})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div
                  className={`my-2 p-3 w-full grid grid-cols-2 pr-16 mb-5 ${
                    booking.status === "true" ? "bg-green-50" : "bg-yellow-50"
                  }`}
                >
                  <div className="font-semibold text-black text-right mr-3">
                    STATUS
                  </div>
                  <p
                    className={`${
                      booking.status === "true"
                        ? "text-green-500"
                        : "text-orange-500"
                    } text-[13px] grid w-fit px-8 font-semibold text-left rounded-full ${
                      booking.status === "true"
                        ? "bg-green-100"
                        : "bg-orange-100"
                    } w--fit justify-left items-center`}
                  >
                    {booking.status === "true" ? "Completed" : "Incomplete"}
                  </p>
                </div>

                <p className="font-semibold m-3 text-black">
                  {booking.address_name}
                </p>

                <div className="text-sm grid grid-cols-2 border-b w-full pb-3 m-2">
                  <p className="font-bold m-3 text-black">
                    Waste Type: <br />
                    <div className="text-gray-500 font-normal mt-1">
                      {booking.waste_type}
                    </div>
                  </p>
                  <p className="font-bold m-3 text-black">
                    Large Recyclables: <br />
                    <div className="font-normal text-gray-500 mt-1">
                      {booking.large_recyclables === "true" ? "Yes" : "No"}
                    </div>
                  </p>
                  <p className="font-bold m-3 text-black">
                    Item Types: <br />
                    <div className="font-normal text-gray-500 mt-1">
                      {booking.item_types.join(", ")}
                    </div>
                  </p>

                  <p className="font-bold m-3 text-black">
                    Estimated Weight: <br />
                    <div className="font-normal text-gray-500 mt-1">
                      {booking.estimated_weight} kg
                    </div>
                  </p>
                </div>

                <ul className="mt-5">
                  {booking.items.length > 0 ? (
                    booking.items.map((item, idx) => (
                      <li key={idx}>
                        <div className="px-5 w-full text-black grid grid-cols-6 items-center justify-between">
                          <div className="col-span-1 w-1/6 text-gray-500 font-semibold">
                            {idx + 1}
                          </div>
                          <div className="col-span-4">
                            <span className="font-semibold">{item.item}:</span>
                            <br />{" "}
                            <span className="text-gray-">
                              {item.quantity} {item.unit} @ ₱
                              {parseFloat(item.price).toLocaleString()}/
                              {item.unit}
                            </span>
                          </div>
                          <div className="font-semibold">
                            ₱ {(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                        <br />
                      </li>
                    ))
                  ) : (
                    <li className="px-5 flex w-full text-gray-500">
                      No items available
                    </li>
                  )}
                </ul>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center">No bookings for today.</li>
        )}
      </ul>
    </div>
  );
};

export default BookingSidebar;
